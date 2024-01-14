import M_Config from "../m_config";
import { M_Logging } from "../m_logging";
import { PythonApp } from "../python_app";
import { PythonScript } from "../python_message";

describe("sendPythonScriptProd", () => {
  it("should send Python script to prod", async () => {
    let pythonScript = new PythonScript();

    pythonScript.imports = ["import yaml", "import os", "import json"];
    pythonScript.declarations = [{ m_args: { obj: "str" } }, { m_result: {} }];
    pythonScript.code = ["m_result = json.dumps(&{m_args})"];
    //pythonScript.code = ["m_result = yaml.dump(m_args)"];
    //pythonScript.code = ["m_result = m_args"];
    pythonScript.m_return = "m_result";


    const py_app = new PythonApp("py_prod");

    await py_app.send(pythonScript);
    M_Logging.log("Result:", JSON.stringify(py_app.result));


    await py_app.destroy(); // Terminate the child process
  }, 10000);
});
