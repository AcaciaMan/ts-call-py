import { ChildProcess, spawn } from "child_process";
import M_Config from "./m_config";
import { PythonMessage, python_message_type } from "./python_message";
export class PythonApp {
  private _app_id: string;
  private _child: ChildProcess;
  public app_params: any;
  public result: any;
  public python_message = new PythonMessage(python_message_type.m_json);

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
        this.python_message.decode(data);
        this.result = this.python_message.received_json;
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

  public new_result(): void {
    this.python_message.received_json = null;
    this.result = null;
  }

  public send(message: string): void {
    this.child.stdin.write(message, (error: Error | null) => {
      if (error) {
        console.log(
          "Error sending message to Python subprocess: " + error.message
        );
      }
    });
  }

  public async waitUntilResult(): Promise<void> {
    const totalTime = 10000; // Total waiting time in milliseconds
    const intervalTime = 100; // Interval time in milliseconds

    const startTime = Date.now();
    while (!this.result && Date.now() - startTime < totalTime) {
      await new Promise((resolve) => setTimeout(resolve, intervalTime));
    }
  }
}
