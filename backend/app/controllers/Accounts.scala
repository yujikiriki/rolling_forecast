package controllers

import scala.concurrent.Future

import models.{Account, AccountJsonFormat}
import org.slf4j.LoggerFactory
import play.api.libs.concurrent.Execution.Implicits.defaultContext
import play.api.libs.json._
import play.api.mvc._
import play.modules.reactivemongo.MongoController
import play.modules.reactivemongo.json.collection.JSONCollection
import reactivemongo.api.Cursor

class Accounts extends Controller with MongoController {
  import Accounts._
  import AccountJsonFormat._

  def collection: JSONCollection = db.collection[ JSONCollection ]( "accounts" )

  def create = Action.async( parse.json ) {
    request =>
      request.body.validate[ Account ].map {
        account =>
          collection.insert(account).map {
            lastError =>
              logger.debug(s"Successfully inserted with LastError: $lastError")
              Created( s"Account created" )
          }
      }.getOrElse( Future.successful( BadRequest( "invalid json" ) ) )
  }

  def list = Action.async {
    val cursor: Cursor[Account] = collection.
      find( Json.obj() ).
      sort(Json.obj( "created" -> -1 ) ).
      cursor[ Account ]

    val futureUsersList: Future[ List[ Account ] ] = cursor.collect[ List ]()
    val futurePersonsJsonArray: Future[JsArray] = futureUsersList.map {
      users =>
        Json.arr( users )
    }

    futurePersonsJsonArray.map {
      users =>
        Ok(users(0))
    }
  }

  def options(url: String) = Action {
    Ok(Json.obj("results" -> "success")).withHeaders(
      "Access-Control-Allow-Methods" -> "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers" -> "Content-Type, X-Requested-With, Accept, Authorization, User-Agent",
      "Access-Control-Max-Age" -> (60 * 60 * 24).toString
    )
  }
}

object Accounts {
  val logger = LoggerFactory.getLogger(classOf[Accounts])
}
