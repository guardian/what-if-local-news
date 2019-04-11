package com.gu.localnews.common

import com.gu.localnews.common.model.ResourceFields
import play.api.libs.json.Json

case class CouncilContract(title: String,
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

object CouncilContract {
  implicit val format = Json.format[CouncilContract]
}
