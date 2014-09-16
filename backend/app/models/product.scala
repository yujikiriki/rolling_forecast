package models

import reactivemongo.bson.BSONObjectID

case class Product( _id: Option[BSONObjectID], businessLine: String, name: String, description: String )

object ProductJsonFormat {
  import play.modules.reactivemongo.json.BSONFormats._
  import play.api.libs.json.Json

  implicit val productFormat = Json.format[ Product ]
}
