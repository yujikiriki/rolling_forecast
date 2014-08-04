package controllers

import play.api.libs.concurrent.Execution.Implicits.defaultContext
import play.api.libs.json._
import play.api.mvc._
import play.modules.reactivemongo.MongoController
import play.modules.reactivemongo.json.collection.JSONCollection
import reactivemongo.api.Cursor

class OrderIncomeReport extends Controller with MongoController {

  import OrderIncomeReportEntryJsonFormat._

  implicit val orderIncomeReportRowFormat = Json.format[ OrderIncomeReportRow ]

  def opportunities: JSONCollection = db.collection[ JSONCollection ]( "opportunities" )

  def get( year: String ) = Action.async {
    val cursor: Cursor[ SaleReportEntry ] =
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

  private def toReportEntry( entries: List[ SaleReportEntry ] ): List[ OrderIncomeReportRow ] = {
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

        OrderIncomeReportRow( x._1, hundred, fifty, ten )
    }
    list.toList
  }

}

case class OrderIncomeReportRow( month: String, hundred: Double, fifty: Double, ten: Double )

case class OrderIncomeReportEntry( month: String, value: Double, probability: Double )

object OrderIncomeReportEntryJsonFormat {

  import play.api.libs.json._
  import play.api.libs.functional.syntax._

  implicit val orderIncomeReportRowFormat = Json.format[ OrderIncomeReportRow ]

  implicit val OrderIncomeReportEntryReads: Reads[ SaleReportEntry ] =
    ( ( JsPath \ "order" \ "month" ).read[ String ] and ( JsPath \ "value" ).read[ Double ] and ( JsPath \ "order" \ "probability" ).read[ Double ] )( SaleReportEntry.apply _ )

  implicit val OrderIncomeReportEntryWrites: Writes[ SaleReportEntry ] =
    ( ( JsPath \ "order" \ "month" ).write[ String ] and  ( JsPath \ "value" ).write[ Double ] and ( JsPath \ "order" \ "probability" ).write[ Double ] )( unlift( SaleReportEntry.unapply ) )

}
