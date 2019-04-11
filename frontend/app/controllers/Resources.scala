package controllers

import com.gu.localnews.common.model.Resource
import com.gu.localnews.common.services.index.Index
import play.api.libs.json.Json
import play.api.mvc.{AbstractController, ControllerComponents}

import scala.concurrent.ExecutionContext

class Resources(index: Index, cc: ControllerComponents)(implicit ec: ExecutionContext)  extends AbstractController(cc) {
  def getResources(idx: String, id: String) = Action.async {
    index.getResource(idx, id).map { v: Resource =>
      Ok(Json.toJson(v))
    }
  }
}
