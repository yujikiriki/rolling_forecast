package models

import reactivemongo.bson.BSONObjectID

case class Opportunity(_id: Option[BSONObjectID], name: String, accountId: String, productId: String, quantity: Int, value: String, state: String)

object OpportunityJsonFormat {
  import play.api.libs.json.Json
  import play.modules.reactivemongo.json.BSONFormats._

  implicit val opportunityFormat = Json.format[Opportunity]
}