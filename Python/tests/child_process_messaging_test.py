import os
import sys  # noqa: F401
from time import sleep

print('child_process_test.py called', flush=True)
print('child_process_test.py called 245', flush=True)
# Buffer to store the bytes read from the fd
sleep_secs = 0.2
bTerminate = False
step_i=0
while bTerminate is False:
    'read in next message from parent Node process via built-in node IPC'
    # data = sys.stdin.buffer.read(3000)
    data = os.read(0,3000)
    print(len(data), step_i, flush=True)
    if len(data)>0:
        print(data,flush=True)
    
    print('After step:', step_i, flush=True)

    step_i = step_i +1
    sleep(sleep_secs)

print('Terminated after steps:', step_i, flush=True)

