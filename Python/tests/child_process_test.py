import os
from time import sleep

os.write(3,'{"dt" : "This is a test"}\n'.encode('latin-1'))
# os.write(4,b'{"dt" : "This is a test"}\n')

'''
bytesMessage = (json.dumps('This is a test') + "\n").encode()
# I'm not actually sure what this number is for,
# but not including it causes problems.
# probably encodes something to do with the 'advanced' serialization
os.write(4, int.to_bytes(1, 8, "little"))
# send the length as an 8-byte number in little Endian format
os.write(4, len(bytesMessage).to_bytes(8, "little"))
# send message
os.write(4, bytesMessage)
'''
print('child_process_test.py called')

for i in range(2):
    'read in next message from parent Node process via built-in node IPC'
    # read and discard 8 bytes. Again, don't know why...
    # anything: int = None
    anything = os.read(3, 2000)
    # read and parse 8 bytes as length in little Endian format
    # length = int.from_bytes(os.read(4, 8), "little")
    # read 'length' bytes and pass to json parser
    os.write(1,b'received message...')

    print('something', i)
    print(anything.decode('latin-1'))
    sleep(3)
