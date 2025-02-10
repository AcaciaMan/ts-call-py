import os
from child_channel import ChildChannel
import child_exec

from child_message import ChildMessage

def test1():
    print('test1', flush=True)
    global m_child_message
    print(m_child_message.m_args, flush=True)
    m_child_message.m_return = {'m_return': 'test1'}
    return 'test1'

def terminate():
    global bTerminate
    bTerminate = True

# Buffer to store the bytes read from the fd
m_child_message = ChildMessage()
m_child_channel = ChildChannel()
bTerminate = False

step_i = 0
while bTerminate is False:
    'read in next message from parent Node process via built-in node IPC'
    data = os.read(0, 10000)
    m_child_channel.data_received(data)
    m_child_message.json_object = m_child_channel.json_object

    m_child_exec = child_exec.ChildExecFactory().create_child_exec(m_child_message)
    m_child_exec()
    if m_child_exec.execs is not None:
        exec(m_child_exec.execs)

    if m_child_exec.execs is not None and len(m_child_exec.execs)> 0:
        print('step:', step_i)
        print(m_child_exec.execs)

    m_child_message.m_return_reply()
    
    step_i = step_i + 1

print('Terminated at step:', step_i, flush=True)


'''
    exec("""
if i == 0:
    print(json.dumps(child_message.json_object["declarations"]).encode(), i, flush=True)
print('something', i, flush=True)         
    """)
'''
