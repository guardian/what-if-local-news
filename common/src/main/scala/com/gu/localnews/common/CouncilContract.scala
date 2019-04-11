package com.gu.localnews.common

import com.gu.localnews.common.model.ResourceFields
import play.api.libs.json.Json

case class CouncilContract(title: String,
                           organisationName: String,
                           description: String,
                           publishedDate: String,
                           status: String,
                           valueLow: Option[Float],
                           valueHigh: Option[Float],
                           awardedDate: Option[String],
                           awardedValue: Option[Float],
                           suppliers: Option[List[ContractSupplier]],
                           entities: DocumentEntities) extends ResourceFields

object CouncilContract {
  implicit val format = Json.format[CouncilContract]
}
