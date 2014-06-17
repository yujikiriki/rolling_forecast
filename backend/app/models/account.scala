package models

import reactivemongo.bson.BSONObjectID

case class Account( _id: Option[BSONObjectID], nit: String, name: String, departament: String, city: String )

object AccountJsonFormat {
  import play.modules.reactivemongo.json.BSONFormats._
  import play.api.libs.json.Json

  implicit val accountFormat = Json.format[ Account ]
}
