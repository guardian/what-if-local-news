package com.gu.localnews.common

import com.gu.localnews.common.model.ResourceFields
import play.api.libs.json.Json

case class HealthContract(title: String,
                           organisationName: String,
                           description: String,
                           publishedDate: String,
                           status: String,
                           valueLow: Option[Double],
                           valueHigh: Option[Double],
                           awardedDate: Option[String],
                           awardedValue: Option[Double],
                           suppliers: Option[List[ContractSupplier]],
                           entities: DocumentEntities) extends ResourceFields

object HealthContract {
  implicit val format = Json.format[HealthContract]
}
