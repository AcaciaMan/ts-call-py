import M_Config from '../m_config';

describe('readTsConfig', () => {
  test("should read and parse typescript.json file", async () => {
    console.log("Main app:", M_Config.main_app);
    console.log("Config:", M_Config.config);
    console.log("Main con:", M_Config.main_con.child.pid);
    M_Config.main_con.send("Hello from VS Code!");
    await new Promise(resolve => setTimeout(resolve, 5000));
    M_Config.main_con.child.kill();
  }, 10000);
});