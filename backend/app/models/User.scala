package models

import reactivemongo.bson.BSONObjectID

case class User( _id: Option[BSONObjectID], name: String, password: String, role: String )

object UserJsonFormat {
  import play.modules.reactivemongo.json.BSONFormats._
  import play.api.libs.json.Json

  implicit val userFormat = Json.format[ User ]
}
