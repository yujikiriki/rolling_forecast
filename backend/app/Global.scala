import play.api.GlobalSettings
import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global
import play.api.mvc.{WithFilters, Filter, RequestHeader, Result}
import play.api.Play
import play.api.Play.current

object Global extends WithFilters(Cors) with GlobalSettings

object Cors extends Filter {
  lazy val config = Play.configuration
  lazy private val allowedOrigins = config.getString("auth.cors.host").getOrElse("http://localhost:8000")
  def apply(f: (RequestHeader) => Future[Result])(rh: RequestHeader): Future[Result] = {
    val result = f(rh)
    val origin = rh.headers.get("Origin")
    val defaultAllowed = "http://localhost"
    val hostsAllowed = allowedOrigins.split(", ").toList
    val allowedOrigin = if (origin.isDefined && hostsAllowed.contains(origin.get)) origin.get else defaultAllowed
    result.map( _.withHeaders(
      "Access-Control-Allow-Origin" -> allowedOrigin,
      "Access-Control-Expose-Headers" -> "WWW-Authenticate, Server-Authorization"
    ))
  }
}