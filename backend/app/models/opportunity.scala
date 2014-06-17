package models

import reactivemongo.bson.BSONObjectID

case class Opportunity(_id: Option[BSONObjectID], name: String, accountId: String, productId: String, quantity: Int, value: String, state: String, order: OrderIncome)
case class OrderIncome(date: String, probability: Int)

object OpportunityJsonFormat {
  import play.api.libs.json.Json
  import play.modules.reactivemongo.json.BSONFormats._

  implicit val orderFormat = Json.format[OrderIncome]
  implicit val opportunityFormat = Json.format[Opportunity]
}