package com.imbruced.iotweb.scale

import kotlinx.serialization.decodeFromString
import org.slf4j.LoggerFactory
import org.springframework.kafka.annotation.KafkaListener
import org.springframework.stereotype.Service
import java.math.BigDecimal
import java.sql.Timestamp
import java.time.Instant
import kotlinx.serialization.json.*
import kotlinx.serialization.*

@Serializable
data class KafkaScaleMeasurement(val measurement: Int, val event_time: Double)

@Service
class ConsumerService(val scaleRepository: ScaleRepository) {
    @KafkaListener(topics = ["kitchen-scale"], groupId = "group_id")
    fun consume(message: String?): Unit {
        if (message != null){
            val decodedValue = Json.decodeFromString<KafkaScaleMeasurement>(message)
            scaleRepository.save(KitchenScaleMeasurement(
                    Measurement(
                            BigDecimal(decodedValue.measurement),
                            "g"
                    ),
                    decodedValue.event_time.toLong()
            ))
        }

    }
}
