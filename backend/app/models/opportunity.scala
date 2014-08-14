package models

import play.api.libs.json._
import reactivemongo.bson._
import play.modules.reactivemongo.json.BSONFormats._

case class Opportunity(_id: Option[BSONObjectID], userId: String, accountId: String, productId: String, name: String, quantity: Int, value: Double, state: String, order: OrderIncome, sale: Sale )
case class OrderIncome( date: String, month: String, year: String, probability: Int )
case class Sale( date: String, month: String, year: String, probability: Int )

object OpportunityJsonFormat {
  implicit val saleFormat = Json.format[Sale]
  implicit val orderIncomeFormat = Json.format[OrderIncome]
  implicit val opportunityFormat = Json.format[Opportunity]
}