import M_Config from '../m_config';
import { PythonMessage, PythonScript, python_message_type } from '../python_message';

describe('readTsConfig', () => {
  test("should read and parse typescript.json file", async () => {
    console.log("Main app:", M_Config.main_app);
    console.log("Config:", M_Config.config);
    console.log("Main con:", M_Config.main_con.child.pid);
    const m_python_message = new PythonMessage( python_message_type.m_json);
    await M_Config.main_con.send(m_python_message);
    await M_Config.main_con.sendStr("Hello from VS Code!");
    await M_Config.destroy();
  }, 10000);
});