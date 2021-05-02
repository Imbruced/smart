import sys
import asyncio
import logging

from leb.gathering.reactive import read_data
from scripts.configuration import SCALE_CONFIG, KAFKA_CONFIG

from scripts.scale.producer import KafkaDataProducer
from scripts.scale.serde import ScaleMeasurementSerializer

log = logging.getLogger(__name__)
log.setLevel(logging.DEBUG)
h = logging.StreamHandler(sys.stdout)
h.setLevel(logging.DEBUG)
log.addHandler(h)

loop = asyncio.get_event_loop()
loop.create_task(read_data(SCALE_CONFIG.MAC_ADDRESS, SCALE_CONFIG.NOTIFICATION_UID,
                           KafkaDataProducer(KAFKA_CONFIG.HOST, KAFKA_CONFIG.PORT, ScaleMeasurementSerializer(),
                                             SCALE_CONFIG.TOPIC_NAME)
                           ))
loop.run_forever()
