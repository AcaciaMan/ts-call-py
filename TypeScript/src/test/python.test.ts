import { fork } from 'child_process';
import { spawn } from 'child_process';

describe('Python Subprocess Test', () => {
  test('should call a Python subprocess', done => {

    console.log("Python Subprocess Test");
    const child = spawn(
      "C:/Tools/Python312/python.exe",
      [
      "C:/work/GitHub/ts-call-py/Python/tests/child_process_test.py",
      ],
      {
      stdio: ["pipe", "pipe", "pipe", 'ipc', null],
      serialization: "advanced",
      }
    );

    console.log("child.pid: " + child.pid);

    child.on("message", (data: Buffer) => {
      console.log("Received message...");
      console.log(`message: ${data}`);
    });

    const std_l = child.stdout;

    if (std_l) {
      std_l.on("data", (data: Buffer) => {
        console.log(`stdout: ${data}`);
      });
    }

    if (child.stderr) {
      child.stderr.on("data", (data: Buffer) => {
        console.log(`stderr: ${data}`);
      });
    }

    child.send("Hello from VS Code!");        
    child.send("Hello from VS Code!");     

    setTimeout(() => {
      done();
    }, 7000);
  }, 8000);

  });