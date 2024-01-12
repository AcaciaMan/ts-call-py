import base64
import json
import os

class ChildMessage(object):
    """
    docstring
    """
    def __init__(self):
        """
        docstring
        """
        self.message = bytearray()
        self.decoded_message: bytes = None
        self.json_object = None

    def data_received(self, data: bytes):
        """
        docstring
        """
        #    data = os.read(3, 10000)
        if data:
            self.message.extend(data)    

            # Search for the beginning and ending bytes
            begin = self.message.find(b'#$%')
            end = self.message.find(b'%$#')
            if begin != -1 and end != -1:
                # print('Found message:', call_message[begin+3:end], flush=True)
                self.decoded_message = base64.b64decode(self.message[begin+3:end])
                self.get_json()

                #print('Decoded message:', decoded_message.decode())
                # Remove the processed message from the buffer
                del self.message[begin:end+3]

    def get_json(self):
        """
        docstring
        """
        self.json_object = json.loads(self.decoded_message)

    def encode(self):
        json_string = json.dumps(self.json_object)

        # Encode the string to base64
        encoded_string = "#$%" + base64.b64encode(json_string.encode()).decode(encoding='latin1') +  "%$#"
        return encoded_string
    
    def reply(self):
        """
        docstring
        """
        os.write(1, self.encode().encode('latin1'))
