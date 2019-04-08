package com.gu.localnews.common.services.index

import com.sksamuel.elastic4s.http.ElasticClient
import org.apache.http.HttpHost
import org.elasticsearch.client.RestClient

import scala.concurrent.ExecutionContext

object ElasticsearchClient {
  def apply(hostnames: List[String])(implicit executionContext: ExecutionContext): ElasticClient = {
    val hosts = hostnames.map(HttpHost.create)

    val client = RestClient.builder(hosts: _*).setRequestConfigCallback(reqConfigCallback =>
      reqConfigCallback.setConnectionRequestTimeout(5000) // Default is 500. Needed for when we send lots of updates quickly.
    ).build()

    ElasticClient.fromRestClient(client)
  }
}
