import M_Config from "../m_config";
import { PythonMessagingApp } from "../python_messaging_app";

describe("MsgConfig", () => {
  test("should read and parse typescript.json file", async () => {
    console.log("Main app:", M_Config.main_app);
    console.log("Config:", M_Config.config);
    const message_app = new PythonMessagingApp("message_app");
    message_app.callPythonScript();
    message_app.send("Hello from VS Code!");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    message_app.send("Hello from VS Code 245!");
    await new Promise((resolve) => setTimeout(resolve, 4000));
    message_app.child.kill();


  }, 10000);
});
