package com.imbruced.iotweb.product

import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.data.mongodb.repository.Query
import org.springframework.stereotype.Component


data class ProductMeasureResponse(val value: Double, val unit: String)
data class ProductAddResponse(
        val fat: ProductMeasureResponse,
        val protein: ProductMeasureResponse,
        val carbo: ProductMeasureResponse
)

data class ProductMeasure(val value: Double, val unit: String){
    fun toProductMeasureResponse(): ProductMeasureResponse =
            ProductMeasureResponse(
                    value=value, unit=unit
            )
}

data class ProductResponse(
        val name: String,
        val fat: ProductMeasureResponse,
        val protein: ProductMeasureResponse,
        val carbo: ProductMeasureResponse
)
data class Product(
        val name: String,
        val fat: ProductMeasure,
        val protein: ProductMeasure,
        val carbo: ProductMeasure
){
    fun toProductAddResponse(): ProductAddResponse =
            ProductAddResponse(
                  fat=fat.toProductMeasureResponse(),
                  protein = protein.toProductMeasureResponse(),
                  carbo = carbo.toProductMeasureResponse(),
            )

    fun toProductResponse(): ProductResponse = ProductResponse(
            name=name,
            fat=fat.toProductMeasureResponse(),
            protein = protein.toProductMeasureResponse(),
            carbo = carbo.toProductMeasureResponse()
    )
}

@Component
interface ProductRepository : MongoRepository<Product, Long>{
    @Query("{ \'name\' : { \$regex: ?0 } }")
    fun findProductByName(name: String): List<Product>
}