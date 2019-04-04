package com.gu.localnews.common

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
                           entities: DocumentEntities)

