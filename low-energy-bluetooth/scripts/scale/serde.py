import json

from leb.gathering.serde import MessageSerializer


class ScaleMeasurementSerializer(MessageSerializer):

    def serialize(self, message: object):
        return json.dumps(message).encode('utf-8')
