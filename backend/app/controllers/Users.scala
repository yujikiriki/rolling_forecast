package controllers

import models.{User, UserJsonFormat}
import org.slf4j.LoggerFactory
import play.api.libs.concurrent.Execution.Implicits.defaultContext
import play.api.libs.json._
import play.api.mvc._
import play.modules.reactivemongo.MongoController
import play.modules.reactivemongo.json.collection.JSONCollection
import reactivemongo.api.Cursor
import reactivemongo.bson.BSONObjectID
import scala.concurrent.Future
import play.modules.reactivemongo.json.BSONFormats._

class Users extends Controller with MongoController {

  import Users._
  import UserJsonFormat._

  def collection: JSONCollection = db.collection[ JSONCollection ]( "users" )

  def update(id: String) = Action.async( parse.json ) {
    request =>
      request.body.validate[ User ].map {
        user =>
          val newData = user.copy( _id = Some( BSONObjectID( id ) ) )
          collection.save( newData ).map {
            lastError =>
              logger.debug( s"Successfully updated with LastError: $lastError" )
              Created( s"User updated" )
          }
      }.getOrElse( Future.successful( BadRequest( "invalid json" ) ) )
  }

  def get( id: String ) = Action.async {
    val cursor: Cursor[ User ] = collection.find( Json.obj( "_id" -> BSONObjectID( id ) ) ).sort( Json.obj( "created" -> -1 ) ).cursor[ User ]
    cursor.collect[ List ]( ).map {
      users =>
        if ( users.isEmpty )
          NotFound
        else {
          Ok( Json.toJson( users.head ) )
        }
    }
  }

  def getByRole( role: String ) = Action.async {
    val cursor: Cursor[ User ] = collection.find( Json.obj( "role" -> role ) ).sort( Json.obj( "created" -> -1 ) ).cursor[ User ]
    cursor.collect[ List ]( ).map {
      users =>
        if ( users.isEmpty )
          NoContent
        else {
          Ok( Json.toJson( users ) )
        }
    }
  }

  def create = Action.async( parse.json ) {
    request =>
      request.body.validate[ User ].map {
        user =>
          collection.insert( user ).map {
            lastError =>
              logger.debug( s"Successfully inserted with LastError: $lastError" )
              Created( s"User created" )
          }
      }.getOrElse( Future.successful( BadRequest( "invalid json" ) ) )
  }

  def list = Action.async {
    val cursor: Cursor[ User ] = collection.find( Json.obj( ) ).sort( Json.obj( "created" -> -1 ) ).cursor[ User ]
    val futureUsersList: Future[ List[ User ] ] = cursor.collect[ List ]( )
    val futureUsersJsonArray: Future[ JsArray ] = futureUsersList.map {
      accounts =>
        Json.arr( accounts )
    }

    futureUsersJsonArray.map {
      accounts =>
        Ok( accounts( 0 ) )
    }
  }

  def delete( id: String ) = Action.async {
    logger.debug( s"User delete begins ${id}" )
    val cursor: Cursor[ User ] = collection.find( Json.obj( "_id" -> BSONObjectID( id ) ) ).sort( Json.obj( "created" -> -1 ) ).cursor[ User ]
    cursor.collect[ List ]( ).map {
      users =>
        if ( users.isEmpty ) {
          logger.debug( s"User with id ${id} not found" )
          NoContent
        }
        else {
          logger.debug( s"The user to be removed: ${id}" )
          collection.remove( users.head )
          NoContent
        }
    }
  }

  def options( url: String ) = Action {
    Ok( Json.obj( "results" -> "success" ) ).withHeaders(
      "Access-Control-Allow-Methods" -> "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers" -> "Content-Type, X-Requested-With, Accept, Authorization, User-Agent",
      "Access-Control-Max-Age" -> ( 60 * 60 * 24 ).toString
    )
  }

}

object Users {
  val logger = LoggerFactory.getLogger( classOf[ Users ] )
}
