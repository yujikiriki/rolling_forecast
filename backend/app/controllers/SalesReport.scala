package controllers

import play.api.libs.concurrent.Execution.Implicits.defaultContext
import play.api.libs.json._
import play.api.mvc._
import play.modules.reactivemongo.MongoController
import play.modules.reactivemongo.json.collection.JSONCollection
import reactivemongo.api.Cursor

class SalesReport extends Controller with MongoController {

  import SaleReportEntryJsonFormat._

  implicit val saleReportRowJsonFormat = Json.format[ SaleReportRow ]

  def opportunities: JSONCollection = db.collection[ JSONCollection ]( "opportunities" )

  def get( year: String ) = Action.async {
    val cursor: Cursor[ SaleReportEntry ] =
      opportunities
        .find(
          Json.obj( "sale.year" -> year ),
          Json.obj(
            "_id" -> 0,
            "value" -> 1,
            "sale.month" -> 1,
            "sale.probability" -> 1
          )
        )
        .sort( Json.obj( "sale.month" -> 1 ) )
        .cursor[ SaleReportEntry ]

    cursor.collect[ List ]( ).map {
      opps =>
        if ( opps.isEmpty )
          NotFound
        else {
          Ok( Json.toJson( toReportEntry( opps ) ) )
        }
    }
  }

  private def toReportEntry( entries: List[ SaleReportEntry ] ): List[ SaleReportRow ] = {
    val month: Map[ String, List[ SaleReportEntry ] ] = entries.groupBy( e => e.month )

    val list = month.map {
      x =>
        val hundred = month( x._1 )
          .filter( oire => oire.probability == 100.0 )
          .foldLeft( 0.0 )( _ + _.value )

        val fifty = month( x._1 )
          .filter( oire => oire.probability < 100.0 && oire.probability >= 50 )
          .foldLeft( 0.0 )( _ + _.value )

        val ten = month( x._1 )
          .filter( oire => oire.probability < 50 && oire.probability >= 10 )
          .foldLeft( 0.0 )( _ + _.value )

        SaleReportRow( x._1, hundred, fifty, ten )
    }
    list.toList
  }

  def options( url: String ) = Action {
    Ok( Json.obj( "results" -> "success" ) ).withHeaders(
      "Access-Control-Allow-Methods" -> "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers" -> "Content-Type, X-Requested-With, Accept, Authorization, User-Agent",
      "Access-Control-Max-Age" -> ( 60 * 60 * 24 ).toString
    )
  }

}

case class SaleReportRow( month: String, hundred: Double, fifty: Double, ten: Double )

case class SaleReportEntry( month: String, value: Double, probability: Double )

object SaleReportEntryJsonFormat {

  import play.api.libs.json._
  import play.api.libs.functional.syntax._

  implicit val OrderIncomeReportEntryReads: Reads[ SaleReportEntry ] =
    ( ( JsPath \ "sale" \ "month" ).read[ String ] and ( JsPath \ "value" ).read[ Double ] and ( JsPath \ "sale" \ "probability" ).read[ Double ] )( SaleReportEntry.apply _ )

  implicit val OrderIncomeReportEntryWrites: Writes[ SaleReportEntry ] =
    ( ( JsPath \ "sale" \ "month" ).write[ String ] and  ( JsPath \ "value" ).write[ Double ] and ( JsPath \ "sale" \ "probability" ).write[ Double ] )( unlift( SaleReportEntry.unapply ) )

}
