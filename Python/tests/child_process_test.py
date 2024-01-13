import os
from time import sleep
import json  # noqa: F401
import child_exec  # noqa: F401

from child_message import ChildMessage

os.write(3,'{"dt" : "This is a test"}\n'.encode('latin-1'))

print('child_process_test.py called')

# Buffer to store the bytes read from the fd
child_message = ChildMessage()
sleep_secs = 0.2

for i in range(10):
    'read in next message from parent Node process via built-in node IPC'
    data = os.read(3, 10000)
    child_message.data_received(data)

    m_child_exec = child_exec.ChildExecFactory().create_child_exec(child_message)
    m_child_exec()
    for x in m_child_exec.execs:
        exec(x)

    if m_child_exec.execs is not None and len(m_child_exec.execs)> 0:
        print('step:', i)
        print(m_child_exec.execs)

    child_message.m_return_reply()
    
    sleep(sleep_secs)

'''
    exec("""
if i == 0:
    print(json.dumps(child_message.json_object["declarations"]).encode(), i, flush=True)
print('something', i, flush=True)         
    """)
'''
