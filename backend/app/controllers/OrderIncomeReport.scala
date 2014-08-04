package controllers

import play.api.libs.concurrent.Execution.Implicits.defaultContext
import play.api.libs.json._
import play.api.mvc._
import play.modules.reactivemongo.MongoController
import play.modules.reactivemongo.json.collection.JSONCollection
import reactivemongo.api.Cursor

class OrderIncomeReport extends Controller with MongoController {

  import OrderIncomeReportEntryJsonFormat._

  implicit val reportEntryJsonFormat = Json.format[ ReportEntry ]

  def opportunities: JSONCollection = db.collection[ JSONCollection ]( "opportunities" )

  def get( year: String ) = Action.async {
    val cursor: Cursor[ OrderIncomeReportEntry ] =
      opportunities
        .find(
          Json.obj( "order.year" -> year ),
          Json.obj(
            "_id" -> 0,
            "value" -> 1,
            "order.month" -> 1,
            "order.probability" -> 1
          )
        )
        .sort( Json.obj( "created" -> -1 ) )
        .cursor[ OrderIncomeReportEntry ]

    cursor.collect[ List ]( ).map {
      opps =>
        if ( opps.isEmpty )
          NotFound
        else {
          Ok( Json.toJson( toReportEntry( opps ) ) )
        }
    }
  }

  private def toReportEntry( entries: List[ OrderIncomeReportEntry ] ): List[ ReportEntry ] = {
    val month: Map[ String, List[ OrderIncomeReportEntry ] ] = entries.groupBy( e => e.month )

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

        ReportEntry( x._1, hundred, fifty, ten )
    }
    list.toList
  }

}

case class ReportEntry( month: String, hundred: Double, fifty: Double, ten: Double )

case class OrderIncomeReportEntry( month: String, value: Double, probability: Double )

object OrderIncomeReportEntryJsonFormat {

  import play.api.libs.json._
  import play.api.libs.functional.syntax._

  implicit val reportEntryJsonFormat = Json.format[ ReportEntry ]

  implicit val OrderIncomeReportEntryReads: Reads[ OrderIncomeReportEntry ] =
    ( ( JsPath \ "order" \ "month" ).read[ String ] and ( JsPath \ "value" ).read[ Double ] and ( JsPath \ "order" \ "probability" ).read[ Double ] )( OrderIncomeReportEntry.apply _ )

  implicit val OrderIncomeReportEntryWrites: Writes[ OrderIncomeReportEntry ] =
    ( ( JsPath \ "order" \ "month" ).write[ String ] and  ( JsPath \ "value" ).write[ Double ] and ( JsPath \ "order" \ "probability" ).write[ Double ] )( unlift( OrderIncomeReportEntry.unapply ) )

}
