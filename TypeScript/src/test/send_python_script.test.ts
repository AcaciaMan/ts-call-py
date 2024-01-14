import M_Config from "../m_config";
import { PythonScript } from "../python_message";

describe("sendPythonScript", () => {
  it("should send Python script as base64 encoded JSON", async () => {
    const pythonScript = new PythonScript();

    pythonScript.imports = ["import yaml", "import os", "import json"];
    pythonScript.declarations = [{"m_args": { "obj": 1 }}, {"m_result": {}}];
    pythonScript.code = ["m_result = json.dumps(&{m_args})"];
    //pythonScript.code = ["m_result = yaml.dump(m_args)"];
    //pythonScript.code = ["m_result = m_args"];
    pythonScript.m_return = "m_result";

    await M_Config.main_con.send(pythonScript);
    console.log("Result:", JSON.stringify(M_Config.main_con.result));

    await M_Config.destroy(); // Terminate the child process
  }, 10000);
});
