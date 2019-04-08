package controllers

import play.api.mvc.{AbstractController, ControllerComponents}

class Search(cc: ControllerComponents)  extends AbstractController(cc) {
  def search(q: String) = Action {
   Ok
  }
}
