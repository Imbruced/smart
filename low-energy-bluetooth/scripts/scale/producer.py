import asyncio
import time

from kafka import KafkaProducer
import logging

from leb.gathering.producer import Producer
from leb.gathering.serde import MessageSerializer


class KafkaDataProducer(Producer):

    def __init__(self, host: str, port: str, serializer: MessageSerializer, topic_name: str):
        self.host = host
        self.port = port
        self.serializer = serializer
        self.topic_name = topic_name

    def __enter__(self):
        self.producer = KafkaProducer(bootstrap_servers=f'{self.host}:{self.port}',
                                      value_serializer=lambda v: self.serializer.serialize(v))
        self.topic_name = self.topic_name
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.producer.close()
        self.producer.flush()

    async def produce(self, sender, data: bytearray):
        await asyncio.sleep(0.3)
        if data[5] == 1:
            value = -int.from_bytes(data[3:5], byteorder='big', signed=False)
        else:
            value = int.from_bytes(data[3:5], byteorder='big', signed=False)
        logging.info(f"Measurement {value}")
        self.producer.send(self.topic_name, {'measurement': value, "event_time": time.time()})

