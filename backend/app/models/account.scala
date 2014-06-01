package models

case class Account( name: String, department: String, city: String )

object AccountJsonFormat {
  import play.api.libs.json.Json

  implicit val accountFormat = Json.format[ Account ]
}