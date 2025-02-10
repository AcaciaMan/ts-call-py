import { ChildProcess, spawn } from "child_process";
import M_Config from "./m_config";
import { PythonMessage } from "./python_message";
export class PythonApp {
  private _app_id: string;
  private _child: ChildProcess;
  public app_params: any;
  public result: any;

  constructor(app_id: string) {
    this.app_id = app_id;
    this.app_params = M_Config.config[this.app_id];
  }

  public get app_id(): string {
    return this._app_id;
  }

  public set app_id(value: string) {
    this._app_id = value;
  }

  public get child(): ChildProcess {
    return this._child;
  }

  public set child(value: ChildProcess) {
    this._child = value;
  }

  public callPythonScript(): ChildProcess {
    this.child = spawn(
      this.app_params.python_path,
      [this.app_params.child_process],
      {
        env: {
          ...process.env,
          PYTHONPATH: this.app_params.PYTHONPATH,
        },
        cwd: this.app_params.cwd,
      }
    );

    if (this.child.stdout) {
      this.child.stdout.on("data", (data) => {
        M_Config.m_channel.decode(data);
        this.result = M_Config.m_channel.received_json;
        console.log("stdout:", this.result);
      });
    }

    if (this.child.stderr) {
      this.child.stderr.on("data", (data: Buffer) => {
        console.log(`stderr: ${data}`);
      });
    }

    return this.child;
  }

  public async send(jObj: object) {
    if (!this.child) {
      this.callPythonScript();
    }

    await this.sendStr(M_Config.m_channel.encode(jObj));
  }

  public async sendStr(message: string) {
    M_Config.m_channel.new_message();
    this.child.stdin.write(message, (error: Error | null) => {
      if (error) {
        console.log(
          "Error sending message to Python subprocess: " + error.message
        );
      }
    });

    await this.waitUntilResult();
  }

  public async waitUntilResult(): Promise<void> {
    const totalTime = 10000; // Total waiting time in milliseconds
    const intervalTime = 100; // Interval time in milliseconds

    const startTime = Date.now();
    while (
      !M_Config.m_channel.bReceivedResponse &&
      Date.now() - startTime < totalTime
    ) {
      await new Promise((resolve) => setTimeout(resolve, intervalTime));
    }
  }

  public async destroy() {
    const pythonTerminate = new PythonMessage("terminate", {}); // terminate the child process

    await this.send(pythonTerminate);
    console.log("Terminated:", JSON.stringify(this.result));

    // wait for the child process to terminate
    await new Promise((resolve) => setTimeout(resolve, 500));

    await this.child.kill();
    this.child = null;

  }
}
