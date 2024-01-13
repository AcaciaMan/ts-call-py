import { ChildProcess, spawn } from "child_process";
import M_Config from "./m_config";
import { M_Logging } from "./m_logging";
export class PythonMessagingApp {
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
        M_Logging.log("Received message from Python subprocess: " + data);
        this.result = data;});
    }

    if (this.child.stderr) {
      this.child.stderr.on("data", (data: Buffer) => {
        console.log(`stderr: ${data}`);
      });
    }

    return this.child;
  }

  public new_result(): void {
    this.result = null;
  }

  public send(message: string): void {
    M_Logging.log("Sending message to Python subprocess: " + message);
    this.child.stdin.write(message, (err) => {
        if (err) {
            console.log("Error sending message to Python subprocess: " + err);
        }
  });}

  public async waitUntilResult(): Promise<void> {
    const totalTime = 5000; // Total waiting time in milliseconds
    const intervalTime = 100; // Interval time in milliseconds

    const startTime = Date.now();
    while (!this.result && Date.now() - startTime < totalTime) {
      await new Promise((resolve) => setTimeout(resolve, intervalTime));
    }
  }
}
