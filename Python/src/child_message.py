import base64
import json
import os

from enum import IntEnum


class ChildMessageType(IntEnum):
    """
    docstring
    """
    python_script = 1,
    param = 2,
    m_json = 3

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
        self.m_return_dict = {}

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

    def encode(self, jObj):
        json_string = json.dumps(jObj)

        # Encode the string to base64
        encoded_string = "#$%" + base64.b64encode(json_string.encode()).decode(encoding='latin1') +  "%$#"
        return encoded_string
    
    def reply(self, jObj):
        """
        docstring
        """
        os.write(1, self.encode(jObj).encode('latin1'))
        self.decoded_message = None
        self.json_object = None
        self.m_return_dict = {}

    def m_return_reply(self):
        if len(self.m_return_dict.keys())>0:
            self.reply(self.m_return_dict)

