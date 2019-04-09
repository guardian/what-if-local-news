package com.gu.localnews.common.model

case class SearchParameters(q: String, page: Int = 1, pageSize: Int = 100) {
  def from: Int = (page - 1) * pageSize
  def size: Int = pageSize
}

