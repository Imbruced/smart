package com.imbruced.iotweb.product

import com.imbruced.iotweb.voice.CommandRepository
import org.springframework.data.repository.query.Param
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.sql.Timestamp
import java.time.LocalDate
import java.time.LocalDateTime

data class Measure(val value: Double, val unit: String) {
    fun toProductMeasure(): ProductMeasure = ProductMeasure(value = value, unit = unit)
}

data class ProductAddMeasure(val value: Double, val unit: String)

data class ProductAddRequest(
        val name: String,
        val fat: Measure,
        val carbo: Measure,
        val protein: Measure
) {
    fun toProduct(): Product = Product(
            name = name,
            protein = protein.toProductMeasure(),
            carbo = carbo.toProductMeasure(),
            fat = fat.toProductMeasure()
    )

}


data class MealRequest(val fat: Double, val carbo: Double, val protein: Double, val name: String, val calories: Double)
data class MealsRequest(val products: List<MealRequest>) {
    fun toMeal(): Meal {
        return Meal(
                products = products.map { it ->
                    MealPart(
                            fat = it.fat,
                            carbo = it.carbo,
                            protein = it.protein,
                            calories = it.calories,
                            name = it.name
                    )
                }
        )
    }
}

data class MealAddResponse(val id: String)

data class CurrentCaloriesResponse(val calories: Double)

@RestController
class MealController(val productRepository: ProductRepository, val mealRepository: MealRepository,
                     val commandRepository: CommandRepository) {

    @PostMapping("/product")
    fun saveProduct(@RequestBody product: ProductAddRequest): ResponseEntity<ProductAddResponse> =
            productRepository
                    .save(product.toProduct())
                    .let { ResponseEntity.ok(it.toProductAddResponse()) }

    @GetMapping("/products")
    fun getProductsByName(@RequestParam name: String): ResponseEntity<List<ProductResponse>> {
        val possibleProducts = productRepository.findProductByName(name)
        return if (possibleProducts.isNotEmpty()) {
            possibleProducts
                    .take(10)
                    .let { products -> ResponseEntity.ok(products.map { product -> product.toProductResponse() }) }
        } else possibleProducts.let { products -> ResponseEntity.ok(products.map { product -> product.toProductResponse() }) }

    }

    @GetMapping("/products-voice")
    fun getProductsBaseOnVoice(): ResponseEntity<List<ProductResponse>> {
        val possibleProducts = productRepository.findProductByName(commandRepository.findFirstByOrderByTimeDesc().text)
        return if (possibleProducts.isNotEmpty()) {
            possibleProducts
                    .take(10)
                    .let { products -> ResponseEntity.ok(products.map { product -> product.toProductResponse() }) }
        } else possibleProducts.let { products -> ResponseEntity.ok(products.map { product -> product.toProductResponse() }) }

    }

    @PostMapping("/meal")
    fun saveMeals(@RequestBody meals: MealsRequest): ResponseEntity<MealAddResponse> {
        return mealRepository.save(
                meals.toMeal()
        ).let { ResponseEntity.ok(MealAddResponse(it.id)) }
    }

    @GetMapping("/meals")
    fun getCalories(@RequestParam date: String): ResponseEntity<CurrentCaloriesResponse> {
        return mealRepository.findAllByTimeBetween(
                left = LocalDate.parse(date).atStartOfDay(),
                right = LocalDate.parse(date).atTime(23, 59, 59),
        ).flatMap { product -> product.products.map { it -> it.calories } }.sum().let { ResponseEntity.ok(CurrentCaloriesResponse(it)) }
    }


}