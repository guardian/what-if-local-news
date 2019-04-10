package com.gu.localnews.common

case class PlanningApplication(
                         address: String,
                         caseRef: String,
                         conservationArea: Option[String],
                         applicantName: Option[String],
                         applicantCompany: Option[String],
                         applicationType: Option[String],
                         applicationLink: String,
                         proposal: String,
                         dateReceived: String, //change to date
                         status: String,
                         entities: DocumentEntities
                         )
