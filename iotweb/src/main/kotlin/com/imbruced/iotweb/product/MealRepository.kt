package com.imbruced.iotweb.product

import org.springframework.data.mongodb.repository.MongoRepository
import java.time.LocalDateTime
import java.util.*

data class MealPart(
        val fat: Double, val carbo: Double, val protein: Double, val name: String, val calories: Double
)
data class Meal(
        val id: String = UUID.randomUUID().toString(),
        val time: LocalDateTime = LocalDateTime.now(),
        val products: List<MealPart>
)

interface MealRepository : MongoRepository<Meal, Long>{
    fun findAllByTimeBetween(left: LocalDateTime, right: LocalDateTime): List<Meal>
}