package com.imbruced.iotweb.scale

import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.stereotype.Component
import java.math.BigDecimal

data class Measurement(val value: BigDecimal, val unit: String)
data class KitchenScaleMeasurement(val measurement: Measurement, val time: Long)

@Component
interface  ScaleRepository : MongoRepository<KitchenScaleMeasurement, Long>{
    fun findFirstByOrderByTimeDesc(): KitchenScaleMeasurement
}
