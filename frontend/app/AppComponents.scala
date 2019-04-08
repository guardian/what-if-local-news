import controllers._

import com.gu.localnews.common.services.index.{ElasticsearchClient, Index}
import com.typesafe.config.Config
import play.api.BuiltInComponentsFromContext
import play.api.ApplicationLoader.Context
import play.api.routing.Router
import router.Routes
import play.filters.HttpFiltersComponents

class AppComponents(context: Context, config: Config)
  extends BuiltInComponentsFromContext(context) with HttpFiltersComponents with AssetsComponents {

  // Dependencies
  val esClient = ElasticsearchClient(List("http://127.0.0.1:9200"))
  val index = new Index(esClient)

  // Initialise index
  index.setupCouncilContracts()
  val cc = controllerComponents

  override def router: Router = new Routes(
    httpErrorHandler,
    new HomeController(cc),
    new Search(cc),
    new Management(cc),
    assets
  )
}
