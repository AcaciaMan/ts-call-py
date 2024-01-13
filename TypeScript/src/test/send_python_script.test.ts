import M_Config from "../m_config";
import { PythonScript } from "../python_message";

describe("sendPythonScript", () => {
  it("should send Python script as base64 encoded JSON", async () => {
    const pythonScript = new PythonScript();

    pythonScript.imports = ["import yaml", "import os"];
    pythonScript.declarations = [{"m_args": { "something": 1 }}, {"m_result": {}}];
    pythonScript.code = ["m_result = yaml.dump(m_args)"];
    //pythonScript.code = ["m_result = m_args"];
    pythonScript.m_return = "m_result";

    M_Config.main_con.send(pythonScript.encode());
    await M_Config.main_con.waitUntilResult();
    console.log("Result:", JSON.stringify(M_Config.main_con.result));
    M_Config.main_con.new_result();
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }, 10000);
});
