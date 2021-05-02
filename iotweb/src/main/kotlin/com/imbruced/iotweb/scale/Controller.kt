package com.imbruced.iotweb.scale

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class Controller(val scaleRepository: ScaleRepository) {

    @RequestMapping("/scale")
    fun readMeasurement(): ResponseEntity<KitchenScaleMeasurement> {
        return ResponseEntity.ok(scaleRepository.findFirstByOrderByTimeDesc())
    }
}