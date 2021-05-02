import logging

from bleak import BleakClient

from leb.gathering.producer import Producer


async def read_data(address: str, uuid: str, producer: Producer):
    while True:
        try:
            async with BleakClient(address) as client:
                with producer as p:
                    while True:
                        if client.is_connected:
                            await client.start_notify(uuid, p.produce)
                        else:
                            logging.warning("Device not found!")
                            break
        except Exception as e:
            logging.warning(f"Skipping due to {e}")

