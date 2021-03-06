package controllers

import reactivemongo.bson.BSONObjectID

import scala.concurrent.Future
import play.modules.reactivemongo.json.BSONFormats._

/* POR SI SE BORRA
import play.modules.reactivemongo.json.BSONFormats._
*/

import models.{Product, ProductJsonFormat}
import org.slf4j.LoggerFactory
import play.api.libs.concurrent.Execution.Implicits.defaultContext
import play.api.libs.json._
import play.api.mvc._
import play.modules.reactivemongo.MongoController
import play.modules.reactivemongo.json.collection.JSONCollection
import reactivemongo.api.Cursor

class Products extends Controller with MongoController {

  import Products._
  import ProductJsonFormat._

  def collection: JSONCollection = db.collection[ JSONCollection ]( "products" )

  def update(id: String) = Action.async( parse.json ) {
    request =>
      request.body.validate[ Product ].map {
        product =>
          val newData = product.copy( _id = Some( BSONObjectID( id ) ) )
          collection.save( newData ).map {
            lastError =>
              logger.debug( s"Successfully updated with LastError: $lastError" )
              Created( s"Account updated" )
          }
      }.getOrElse( Future.successful( BadRequest( "invalid json" ) ) )
  }

  def get( id: String ) = Action.async {
    val cursor: Cursor[ Product ] = collection
      .find( Json.obj( "_id" -> BSONObjectID( id ) ) )
      .sort( Json.obj( "created" -> -1 ) )
      .cursor[ Product ]

    cursor.collect[ List ]( ).map {
      products =>
        if ( products.isEmpty )
          NotFound
        else {
          Ok( Json.toJson( products.head ) )
        }
    }
  }

  def create = Action.async( parse.json ) {
    request =>
      request.body.validate[ Product ].map {
        opportunity =>
          collection.insert( opportunity ).map {
            lastError =>
              logger.debug( s"Successfully inserted with LastError: $lastError" )
              Created( s"Product created" )
          }
      }.getOrElse( Future.successful( BadRequest( "invalid json" ) ) )
  }

  def list = Action.async {
    val cursor: Cursor[ Product ] = collection.find( Json.obj( ) ).sort( Json.obj( "created" -> -1 ) ).cursor[ Product ]
    val futureProductsList: Future[ List[ Product ] ] = cursor.collect[ List ]( )
    val futureProductsJsonArray: Future[ JsArray ] = futureProductsList.map {
      products =>
        Json.arr( products )
    }

    futureProductsJsonArray.map {
      products =>
        Ok( products( 0 ) )
    }
  }

  def delete( id: String ) = Action.async {
    val cursor: Cursor[ Product ] = collection.find( Json.obj( "_id" -> BSONObjectID( id ) ) ).sort( Json.obj( "created" -> -1 ) ).cursor[ Product ]

    cursor.collect[ List ]( ).map {
      products =>
        if ( products.isEmpty )
          NoContent
        else {
          logger.debug( s"The product to be removed: ${id}" )
          collection.remove( products.head )
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

object Products {
  val logger = LoggerFactory.getLogger( classOf[ Products ] )
}
