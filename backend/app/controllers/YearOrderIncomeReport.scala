package controllers

import play.api.libs.json.{JsObject, Json}
import play.api.mvc._
import play.modules.reactivemongo.MongoController
import play.api.libs.concurrent.Execution.Implicits.defaultContext
import play.modules.reactivemongo.json.collection.JSONCollection
import play.modules.reactivemongo.json.BSONFormats._
import reactivemongo.bson.BSONDocument
import reactivemongo.bson.BSONString
import reactivemongo.core.commands._
import scala.concurrent.Future

class YearOrderIncomeReport extends Controller with MongoController {
  def opportunities: JSONCollection = db.collection[ JSONCollection ]( "opportunities" )

  def get( ) = Action.async {
    query( ) map {
      r =>
        if ( r.isEmpty )
          NotFound
        else
          Ok( Json.toJson( r ) )
    }
  }

  private def query( ): Future[ List[ JsObject ] ] = {
    val group: Group = Group( BSONString( "$order.year" ) )( ("total", SumField( "value" )) )
    val pipeline: Seq[ PipelineOperator ] = Seq( group )
    val command: Future[ Stream[ BSONDocument ] ] = db.command( Aggregate( "opportunities", pipeline ) )
    command map {
      c =>
        c.toList map {
          d =>
            toJSON( d ).asInstanceOf[ JsObject ]
        }
    }
  }
}
