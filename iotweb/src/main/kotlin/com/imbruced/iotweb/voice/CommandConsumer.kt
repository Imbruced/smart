package com.imbruced.iotweb.voice

import kotlinx.serialization.Serializable
import kotlinx.serialization.decodeFromString
import kotlinx.serialization.json.Json
import org.springframework.kafka.annotation.KafkaListener
import org.springframework.stereotype.Service

@Serializable
data class KafkaCommandMessage(val data: String, val event_time: Double)

@Service
class CommandConsumer(val commandRepository: CommandRepository) {
    @KafkaListener(topics = ["voice"], groupId = "group_id")
    fun consume(message: String?): Unit {
        if (message != null){
            val decodedValue = Json.decodeFromString<KafkaCommandMessage>(message)
            commandRepository.save(Command(decodedValue.data, decodedValue.event_time.toLong()))
        }

    }
}