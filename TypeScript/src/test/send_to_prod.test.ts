import M_Config from "../m_config";
import { M_Logging } from "../m_logging";
import { PythonApp } from "../python_app";
import { PythonMessage } from "../python_message";

describe("sendPythonScriptProd", () => {
  it("should send Python script to prod", async () => {
    let pythonScript = new PythonMessage("test1()", { something: 3 });

    const py_app = new PythonApp("py_prod");

    await py_app.send(pythonScript);
    M_Logging.log("Result:", JSON.stringify(py_app.result));


    await py_app.destroy(); // Terminate the child process
  }, 10000);
});
