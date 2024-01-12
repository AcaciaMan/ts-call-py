import os
from time import sleep

os.write(3,'{"dt" : "This is a test"}\n'.encode('latin-1'))

print('child_process_test.py called')

for i in range(2):
    'read in next message from parent Node process via built-in node IPC'
    anything = os.read(3, 10000)
    os.write(1,b'received message...')

    exec("""
print('something', i, flush=True)
print(anything.decode('latin-1'), flush=True)
    """)

    sleep(3)
