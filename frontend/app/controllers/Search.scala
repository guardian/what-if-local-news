package controllers

import com.gu.localnews.common.model.SearchParameters
import com.gu.localnews.common.services.index.Index
import play.api.libs.json.Json
import play.api.mvc.{AbstractController, ControllerComponents}

import scala.concurrent.ExecutionContext

class Search(index: Index, cc: ControllerComponents)(implicit ec: ExecutionContext)  extends AbstractController(cc) {
  def search(q: String) = Action.async {
    val params = SearchParameters(q)

    index.query(params).map { hits =>
      Ok(Json.toJson(hits))
    }
  }
}
