import M_Config from "../m_config";
import { PythonScript } from "../python_script";

describe("sendPythonScript", () => {
  it("should send Python script as base64 encoded JSON", async () => {
    const pythonScript = new PythonScript();

    pythonScript.script = {
      imports: ["import Yaml", "import os"],
      declarations: { m_args: { something: 1 }, m_result: null },
      code: ["m_result = Yaml.dump(m_args)"],
      return: "m_result",
    };

    M_Config.main_con.send(pythonScript.getStringAs64ByteEncoded());
    await M_Config.main_con.waitUntilResult();
    console.log("Result:", M_Config.main_con.result);
    await new Promise((resolve) => setTimeout(resolve, 10000));
  }, 20000);
});
