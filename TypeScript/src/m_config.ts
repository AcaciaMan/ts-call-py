import fs from "fs";
import path from "path";
import { PythonApp } from "./python_app";

// generate a class M_Config with static property
// config that contains the parsed typescript.json file
// load the file only once
class M_Config {
  static config = M_Config.readTsConfig();
  static main_app = M_Config.config.main_app;
  static _main_con: PythonApp;

  private constructor() {} // Prevent instantiation

  static readTsConfig(tsConfig?: any) {
    if (!tsConfig) {
      const projectRoot = path.resolve(__dirname, "../");
      const tsConfigPath = path.resolve(projectRoot, "typescript.json");

      const tsConfigContent = fs.readFileSync(tsConfigPath, "utf-8");
      tsConfig = JSON.parse(tsConfigContent);
    }

    walkJsonTree(tsConfig, (key, value) => {
      // console.log(`Key: ${key}, Value: ${value}`);
    });

    return tsConfig;
  }

    static get main_con(): PythonApp {
        if (!M_Config._main_con) {
        M_Config._main_con = new PythonApp(M_Config.main_app);
        M_Config._main_con.callPythonScript();
        }
        return M_Config._main_con;
    }

    static set main_con(value: PythonApp) {
        M_Config._main_con = value;
    }
}

function getStringBetweenCurlyBrackets(value: string): string | null {
  const regex = /{([^}]+)}/;
  const match = value.match(regex);
  return match ? match[1] : null;
}

function walkJsonTree(obj: any, callback: (key: string, value: any) => void) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];

      if (
        typeof value === "string" &&
        value.includes("{") &&
        value.includes("}")
      ) {
        const m_result = getStringBetweenCurlyBrackets(value);
        if (m_result) {
          if (obj.hasOwnProperty(m_result)) {
            obj[key] = value.replace(`{${m_result}}`, obj[m_result]);
          }
        }
      }
      callback(key, value);
      if (typeof value === "object" && value !== null) {
        walkJsonTree(value, callback);
      }
    }
  }
}

export default M_Config;
