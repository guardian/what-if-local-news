package com.gu.localnews.common

import com.gu.localnews.common.model.ResourceFields
import play.api.libs.json.Json

case class PlanningApplication(
                         address: String,
                         caseRef: String,
                         conservationArea: Option[String],
                         applicantName: Option[String],
                         applicantCompany: Option[String],
                         applicationType: Option[String],
                         applicationLink: Option[String],
                         proposal: String,
                         dateReceived: String, //change to date
                         status: String,
                         entities: DocumentEntities
                         ) extends ResourceFields

object PlanningApplication {
  implicit val format = Json.format[PlanningApplication]
}
