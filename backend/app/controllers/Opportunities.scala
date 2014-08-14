package controllers

import reactivemongo.bson.BSONObjectID

import scala.concurrent.Future

import models.{Opportunity, OpportunityJsonFormat}
import org.slf4j.LoggerFactory
import play.api.libs.concurrent.Execution.Implicits.defaultContext
import play.api.libs.json._
import play.api.mvc._
import play.modules.reactivemongo.MongoController
import play.modules.reactivemongo.json.collection.JSONCollection
import reactivemongo.api.Cursor
import play.modules.reactivemongo.json.BSONFormats._

class Opportunities extends Controller with MongoController {

  import Opportunities._
  import OpportunityJsonFormat._

  def collection: JSONCollection = db.collection[ JSONCollection ]( "opportunities" )

  def get( id: String ) = Action.async {
    val cursor: Cursor[ Opportunity ] = collection.find( Json.obj( "_id" -> BSONObjectID( id ) ) ).sort( Json.obj( "created" -> -1 ) ).cursor[ Opportunity ]
    cursor.collect[ List ]( ).map {
      opportunities =>
        if ( opportunities.isEmpty )
          NotFound
        else {
          Ok( Json.toJson( opportunities.head ) )
        }
    }
  }

  def create = Action.async( parse.json ) {
    request =>
      val f = request.body.validate[ Opportunity ].map {
        opportunity =>
          collection.insert( opportunity ).map {
            lastError =>
              logger.debug( s"Successfully inserted with LastError: $lastError" )
              Created( s"Opportunity created" )
          }
      }

      f.fold(
        fallaEnSerializacion => {
          Future.successful( BadRequest( s"Invalid json: ${fallaEnSerializacion}" ) )
        },
        respuesta => {
          respuesta
        }
      )
  }

  def list = Action.async {
    val cursor: Cursor[ Opportunity ] = collection.find( Json.obj( ) ).sort( Json.obj( "created" -> -1 ) ).cursor[ Opportunity ]
    val futureOpportunitysList: Future[ List[ Opportunity ] ] = cursor.collect[ List ]( )
    val futureOpportunitysJsonArray: Future[ JsArray ] = futureOpportunitysList.map {
      opportunities =>
        Json.arr( opportunities )
    }

    futureOpportunitysJsonArray.map {
      opportunities =>
        Ok( opportunities( 0 ) )
    }
  }

  def delete( id: String ) = Action.async {
    val cursor: Cursor[ Opportunity ] = collection.find( Json.obj( "_id" -> BSONObjectID( id ) ) ).sort( Json.obj( "created" -> -1 ) ).cursor[ Opportunity ]
    cursor.collect[ List ]( ).map {
      opportunities =>
        if ( opportunities.isEmpty )
          NoContent
        else {
          logger.debug( s"The opportunity to be removed: ${id}" )
          collection.remove( opportunities.head )
          NoContent
        }
    }
  }

}

object Opportunities {
  val logger = LoggerFactory.getLogger( classOf[ Opportunities ] )
}
