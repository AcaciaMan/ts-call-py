import os
from time import sleep
import base64

os.write(3,'{"dt" : "This is a test"}\n'.encode('latin-1'))

print('child_process_test.py called')

# Buffer to store the bytes read from the fd
call_message = bytearray()

for i in range(2):
    'read in next message from parent Node process via built-in node IPC'
    data = os.read(3, 10000)
    if data:
        call_message.extend(data)    

    # Search for the beginning and ending bytes
    begin = call_message.find(b'#$%')
    end = call_message.find(b'%$#')
    if begin != -1 and end != -1:
        # print('Found message:', call_message[begin+3:end], flush=True)
        decoded_message = base64.b64decode(call_message[begin+3:end])

        os.write(1,decoded_message)

        #print('Decoded message:', decoded_message.decode())
        # Remove the processed message from the buffer
        del call_message[begin:end+3]

    

    exec("""
print('something', i, flush=True)
    """)

    sleep(3)
