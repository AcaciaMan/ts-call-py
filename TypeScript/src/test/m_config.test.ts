import M_Config from '../m_config';
import { M_Logging } from '../m_logging';
import { PythonMessage} from '../python_message';

describe('readTsConfig', () => {
  test("should read and parse ty_call_py.json file", async () => {
    console.log("Main app:", M_Config.main_app);
    console.log("Config:", M_Config.config);
    console.log("Main con:", M_Config.main_con.child.pid);
    const m_python_message = new PythonMessage( "test1()", {});
    await M_Config.main_con.send(m_python_message);
    await M_Config.main_con.sendStr("Hello from VS Code!");
    await M_Config.destroy();
    M_Logging.log("End of test readTsConfig");
  }, 10000);
});