import os
from child_channel import ChildChannel
import child_exec

from child_message import ChildMessage


# Buffer to store the bytes read from the fd
child_message = ChildMessage()
m_child_channel = ChildChannel()
bTerminate = False

step_i = 0
while bTerminate is False:
    'read in next message from parent Node process via built-in node IPC'
    data = os.read(0, 10000)
    m_child_channel.data_received(data)
    child_message.json_object = m_child_channel.json_object

    m_child_exec = child_exec.ChildExecFactory().create_child_exec(child_message)
    m_child_exec()
    for x in m_child_exec.execs:
        exec(x)

    if m_child_exec.execs is not None and len(m_child_exec.execs)> 0:
        print('step:', step_i)
        print(m_child_exec.execs)

    child_message.m_return_reply()
    
    step_i = step_i + 1

print('Terminated at step:', step_i, flush=True)

