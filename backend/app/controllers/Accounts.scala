package controllers

import reactivemongo.bson.BSONObjectID

import scala.concurrent.Future

import models.{Account, AccountJsonFormat}
import org.slf4j.LoggerFactory
import play.api.libs.concurrent.Execution.Implicits.defaultContext
import play.api.libs.json._
import play.api.mvc._
import play.modules.reactivemongo.MongoController
import play.modules.reactivemongo.json.collection.JSONCollection
import reactivemongo.api.Cursor
import play.modules.reactivemongo.json.BSONFormats._

class Accounts extends Controller with MongoController {

  import Accounts._
  import AccountJsonFormat._

  def collection: JSONCollection = db.collection[ JSONCollection ]( "accounts" )

  def get( id: String ) = Action.async {
    val cursor: Cursor[ Account ] = collection.find( Json.obj( "_id" -> BSONObjectID( id ) ) ).sort( Json.obj( "created" -> -1 ) ).cursor[ Account ]
    cursor.collect[ List ]( ).map {
      accounts =>
        if ( accounts.isEmpty )
          NotFound
        else {
          Ok( Json.toJson( accounts.head ) )
        }
    }
  }

  def create = Action.async( parse.json ) {
    request =>
      request.body.validate[ Account ].map {
        account =>
          collection.insert( account ).map {
            lastError =>
              logger.debug( s"Successfully inserted with LastError: $lastError" )
              Created( s"Account created" )
          }
      }.getOrElse( Future.successful( BadRequest( "invalid json" ) ) )
  }

  def list = Action.async {
    val cursor: Cursor[ Account ] = collection.find( Json.obj( ) ).sort( Json.obj( "created" -> -1 ) ).cursor[ Account ]
    val futureAccountsList: Future[ List[ Account ] ] = cursor.collect[ List ]( )
    val futureAccountsJsonArray: Future[ JsArray ] = futureAccountsList.map {
      accounts =>
        Json.arr( accounts )
    }

    futureAccountsJsonArray.map {
      accounts =>
        Ok( accounts( 0 ) )
    }
  }

  def delete( id: String ) = Action.async {
    logger.debug( s"Entra a eliminar la cuenta ${id}" )
    val cursor: Cursor[ Account ] = collection.find( Json.obj( "_id" -> BSONObjectID( id ) ) ).sort( Json.obj( "created" -> -1 ) ).cursor[ Account ]
    cursor.collect[ List ]( ).map {
      accounts =>
        if ( accounts.isEmpty ) {
          logger.debug( s"No se encontro la cuenta" )
          NoContent
        }
        else {
          logger.debug( s"The account to be removed: ${id}" )
          collection.remove( accounts.head )
          NoContent
        }
    }
  }

  def update(id: String) = Action.async( parse.json ) {
    request =>
      request.body.validate[ Account ].map {
        account =>
          val newData = account.copy( _id = Some( BSONObjectID( id ) ) )
          collection.save( newData ).map {
            lastError =>
              logger.debug( s"Successfully updated with LastError: $lastError" )
              Created( s"Account updated" )
          }
      }.getOrElse( Future.successful( BadRequest( "invalid json" ) ) )
  }

  def options( url: String ) = Action {
    Ok( Json.obj( "results" -> "success" ) ).withHeaders(
      "Access-Control-Allow-Methods" -> "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers" -> "Content-Type, X-Requested-With, Accept, Authorization, User-Agent",
      "Access-Control-Max-Age" -> ( 60 * 60 * 24 ).toString
    )
  }

}

object Accounts {
  val logger = LoggerFactory.getLogger( classOf[ Accounts ] )
}
