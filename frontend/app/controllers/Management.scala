package controllers

import play.api.mvc.{AbstractController,  ControllerComponents}

class Management(cc: ControllerComponents) extends AbstractController(cc) {
  def healthCheck = Action { _ =>
    Ok
  }
}
