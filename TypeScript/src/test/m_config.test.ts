import M_Config from '../m_config';

describe('readTsConfig', () => {
  test("should read and parse typescript.json file", async () => {
    console.log("Main app:", M_Config.main_app);
    console.log("Config:", M_Config.config);
    console.log("Main con:", M_Config.main_con.child.pid);
    M_Config.main_con.send("Hello from VS Code!");
    await M_Config.main_con.waitUntilResult();
    console.log("Result:", M_Config.main_con.result);
    await new Promise(resolve => setTimeout(resolve, 10000));
  }, 20000);
});