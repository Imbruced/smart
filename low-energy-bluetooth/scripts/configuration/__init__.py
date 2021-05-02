import configparser
import os.path
from dataclasses import dataclass

file = os.path.abspath(__file__)
file_path = os.path.split(file)[0]

config = configparser.ConfigParser()
config.read(os.path.join(file_path, "config.ini"))


class ScaleConfiguration:

    MAC_ADDRESS = config["DEVICE"]["SCALE_MAC_ADDRESS"]
    NOTIFICATION_UID = config["DEVICE"]["NOTIFICATION_UID"]
    TOPIC_NAME = config["DEVICE"]["TOPIC"]


class KafkaConfiguration:

    HOST = config["KAFKA"]["HOST"]
    PORT = config["KAFKA"]["PORT"]


SCALE_CONFIG = ScaleConfiguration()
KAFKA_CONFIG = KafkaConfiguration()
