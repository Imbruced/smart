class Producer:

    async def produce(self, sender, data: bytearray):
        raise NotImplementedError()
