package controllers

import models.{ProductJsonFormat, Product}
import play.api.libs.concurrent.Execution.Implicits.defaultContext
import play.api.libs.json._
import play.api.mvc._
import play.modules.reactivemongo.MongoController
import play.modules.reactivemongo.json.collection.JSONCollection
import reactivemongo.api.Cursor
import play.modules.reactivemongo.json.BSONFormats._

import scala.concurrent.Future

class OrderIncomeReport extends Controller with MongoController {

  import ProductJsonFormat._
  import OrderIncomeReportEntryJsonFormat._

  implicit val orderIncomeReportRowFormatter = Json.format[ OrderIncomeReportRow ]

  def opportunities: JSONCollection = db.collection[ JSONCollection ]( "opportunities" )

  def products: JSONCollection = db.collection[ JSONCollection ]( "products" )

  def get( year: String ) = Action.async {
    opportunitiesCursor( year ).collect[ List ]( ).map {
      opps =>
        if ( opps.isEmpty )
          NotFound
        else
          Ok( Json.toJson( toReportEntry( opps ) ) )
    }
  }

  def getWithBusinessLine( year: String, businessLine: String ) = Action.async {
    val oppcursor: Cursor[ OrderIncomeReportEntry ] = opportunitiesCursor( year )
    val result = for {
      ps <- getProductsOfBusinessLine( businessLine )
      os <- opportunitiesCursor( year ).collect[ List ]( )
    } yield ( ps.map( p => os.filter( o => o.productId == p._id.get.stringify ) ).flatten )
    result map ( list => if ( list.isEmpty ) NotFound else Ok( Json.toJson( toReportEntry( list ) ) ) )
  }

  def options( url: String ) = Action {
    Ok( Json.obj( "results" -> "success" ) ).withHeaders(
      "Access-Control-Allow-Methods" -> "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers" -> "Content-Type, X-Requested-With, Accept, Authorization, User-Agent",
      "Access-Control-Max-Age" -> ( 60 * 60 * 24 ).toString
    )
  }

  private def defineOrderIncomeRowBusinessLine( queryResult: Future[ (List[ OrderIncomeReportEntry ], List[ Product ]) ] ): Future[ List[ OrderIncomeReportEntry ] ] =
    queryResult map {
      qr =>
        val l = qr._1 map {
          oir => qr._2 map {
            p => if ( p._id.get.stringify == oir.productId ) Some( oir ) else None
          }
        }
        l.flatten.flatten
    }

  private def opportunitiesCursor( year: String ): Cursor[ OrderIncomeReportEntry ] =
    opportunities
      .find(
        Json.obj( "order.year" -> year ),
        Json.obj(
          "_id" -> 0,
          "value" -> 1,
          "order.month" -> 1,
          "order.probability" -> 1,
          "productId" -> 1,
          "state" -> 1
        )
      )
      .sort( Json.obj( "created" -> -1 ) )
      .cursor[ OrderIncomeReportEntry ]

  private def getProductsOfBusinessLine( businessLine: String ): Future[ List[ Product ] ] = {
    val cursor: Cursor[ Product ] = products
      .find( Json.obj( "businessLine" -> businessLine ) )
      .sort( Json.obj( "created" -> -1 ) )
      .cursor[ Product ]
    cursor.collect[ List ]( )
  }

  private def toReportEntry( entries: List[ OrderIncomeReportEntry ] ): List[ OrderIncomeReportRow ] = {
    val month: Map[ String, List[ OrderIncomeReportEntry ] ] = entries.groupBy( e => e.month )
    val list = month.map {
      x =>
        val nueva = month( x._1 )
          .filter( oire => oire.state == "Nueva" )
          .foldLeft( 0.0 )( _ + _.value )
        val enEvaluacion = month( x._1 )
          .filter( oire => oire.state == "En evaluación" )
          .foldLeft( 0.0 )( _ + _.value )
        val enNegociacion = month( x._1 )
          .filter( oire => oire.state == "En negociación" )
          .foldLeft( 0.0 )( _ + _.value )
        val cerrada = month( x._1 )
          .filter( oire => oire.state == "Cerrada" )
          .foldLeft( 0.0 )( _ + _.value )
        val ganada = month( x._1 )
          .filter( oire => oire.state == "Ganada" )
          .foldLeft( 0.0 )( _ + _.value )
        val perdida = month( x._1 )
          .filter( oire => oire.state == "Perdida" )
          .foldLeft( 0.0 )( _ + _.value )
        val abandonada = month( x._1 )
          .filter( oire => oire.state == "Abandonada" )
          .foldLeft( 0.0 )( _ + _.value )

        OrderIncomeReportRow(
          x._1,
          nueva,
          enEvaluacion,
          enNegociacion,
          cerrada,
          ganada,
          perdida,
          abandonada
        )
    }
    list.toList
  }
}

case class OrderIncomeReportRow( month: String,
                                 nueva: Double,
                                 enEvaluacion: Double,
                                 enNegociacion: Double,
                                 cerrada: Double,
                                 ganada: Double,
                                 perdida: Double,
                                 abandonada: Double )

case class OrderIncomeReportEntry( month: String,
                                   value: Double,
                                   probability: Double,
                                   productId: String,
                                   state: String )

object OrderIncomeReportEntryJsonFormat {

  import play.api.libs.json._
  import play.api.libs.functional.syntax._

  implicit val OrderIncomeReportEntryReads: Reads[ OrderIncomeReportEntry ] =
    ( ( JsPath \ "order" \ "month" ).read[ String ] and
      ( JsPath \ "value" ).read[ Double ] and
      ( JsPath \ "order" \ "probability" ).read[ Double ] and
      ( JsPath \ "productId" ).read[ String ] and
      ( JsPath \ "state" ).read[ String ] )( OrderIncomeReportEntry.apply _ )

  implicit val OrderIncomeReportEntryWrites: Writes[ OrderIncomeReportEntry ] =
    ( ( JsPath \ "order" \ "month" ).write[ String ] and
      ( JsPath \ "value" ).write[ Double ] and
      ( JsPath \ "order" \ "probability" ).write[ Double ] and
      ( JsPath \ "productId" ).write[ String ] and
      ( JsPath \ "state" ).write[ String ] )( unlift( OrderIncomeReportEntry.unapply ) )

}
