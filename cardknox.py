import requests
from random import randint

class CardknoxRequest:
    def __init__(self):
        self.api_url = "https://x1.cardknox.com/gatewayjson"
        self.api_key = "hiboudevdbc05a72fd1b43a7b697a230fbd460ec"

    def _post(self, payload):
        payload['xKey'] = self.api_key
        return requests.post(self.api_url, json=payload).json()

    def authonly(self, payload):
        payload['xCommand'] = 'cc:authonly'
        return self._post(payload)

    def adjust(self, payload):
        payload['xCommand'] = 'cc:adjust'
        return self._post(payload)

    def capture(self, payload):
        payload['xCommand'] = 'cc:capture'
        return self._post(payload)

    def refund(self, payload):
        payload['xCommand'] = 'cc:refund'
        return self._post(payload)