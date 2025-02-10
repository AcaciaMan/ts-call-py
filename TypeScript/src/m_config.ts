import fs from "fs";

import { PythonApp } from "./python_app";
import { PythonChannel } from "./python_channel";
import path from "path";

// generate a class M_Config with static property
// config that contains the parsed typescript.json file
// load the file only once
class M_Config {
  static m_channel = new PythonChannel();
  static config = M_Config.readTsConfig();
  static main_app = M_Config.config.main_app;
  static _main_con: PythonApp;

  private constructor() {} // Prevent instantiation

  public static async destroy() {
    await M_Config.main_con.destroy();
    M_Config._main_con = null;
  }

    static findSrcDirectories(filePath: string): string[] {
        const srcDirectories: string[] = [];

        const currentDirectory = path.dirname(filePath);
        const directories = currentDirectory.split(path.sep);

        for (let i = 0; i < directories.length; i++) {
          const directory = directories.slice(0, i + 1).join(path.sep);
          const stats = fs.statSync(directory);

          if (stats.isDirectory() && fs.existsSync(path.join(directory, "ty_call_py.json"))) {
            srcDirectories.push(directory);
          }
        }

        return srcDirectories;
      }

  static readTsConfig(tsConfig?: any) {
    if (!tsConfig) {

      // const currentFilePath = __filename;
      const cwdName = __dirname;
      //const cwdName = process.cwd();

      const srcDirectories = M_Config.findSrcDirectories(cwdName);
      const tsConfigPaths: string[] = [];
      for (const srcDirectory of srcDirectories) {
        tsConfigPaths.push(path.join(srcDirectory, "ty_call_py.json"));
      }

      let tsConfigContent = "";
      let foundTsConfigPath = "";

      for (const tsConfigPath of tsConfigPaths) {
        try {
          tsConfigContent = fs.readFileSync(tsConfigPath, "utf-8");
          foundTsConfigPath = tsConfigPath;
          break;
        } catch (error) {
          // File not found, try the next path
        }
      }

      if (!tsConfigContent) {
        throw new Error("Unable to find ty_call_py.json file.");
      }

      console.log("Found ty_call_py.json at:", foundTsConfigPath);

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
      const regex = /{([^}]+)}/g;
      let match;
      while ((match = regex.exec(value)) !== null) {
        const m_result = match[1];
        if (obj.hasOwnProperty(m_result)) {
          obj[key] = obj[key].replace(`{${m_result}}`, obj[m_result]);
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
