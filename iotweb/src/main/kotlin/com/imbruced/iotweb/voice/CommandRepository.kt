package com.imbruced.iotweb.voice

import com.imbruced.iotweb.scale.KitchenScaleMeasurement
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.stereotype.Component

data class Command(val text: String, val time: Long)

@Component
interface CommandRepository : MongoRepository<Command, Long>{
    fun findFirstByOrderByTimeDesc(): Command
}