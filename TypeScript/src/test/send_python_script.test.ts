import M_Config from "../m_config";
import { PythonMessage } from "../python_message";

describe("sendPythonScript", () => {
  it("should send Python script as base64 encoded JSON", async () => {
    let pythonScript = new PythonMessage("test1()", { something: 3 });

    await M_Config.main_con.send(pythonScript);
    console.log("Result:", JSON.stringify(M_Config.main_con.result));

    //pythonScript = new PythonScript();
    //pythonScript.m_return = "m_result";
    //await M_Config.main_con.send(pythonScript);
    //console.log("Result 2:", JSON.stringify(M_Config.main_con.result));    

    await M_Config.destroy(); // Terminate the child process
  }, 10000);
});
