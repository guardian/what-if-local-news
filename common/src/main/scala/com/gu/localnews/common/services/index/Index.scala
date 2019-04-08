package com.gu.localnews.common.services.index

import com.sksamuel.elastic4s.http.ElasticClient

class Index(val client: ElasticClient) extends CouncilContractsIndex


