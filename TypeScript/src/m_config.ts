import fs from "fs";
import path from "path";

function readTsConfig() {
    const projectRoot = path.resolve(__dirname, "../");
    const tsConfigPath = path.resolve(projectRoot, "typescript.json");
    
    const tsConfigContent = fs.readFileSync(tsConfigPath, "utf-8");
    const tsConfig = JSON.parse(tsConfigContent);
    
    // Interpolate config values
    const interpolatedConfig = interpolateValues(tsConfig);
    
    return interpolatedConfig;
}

function interpolateValues(config: any): any {
    const jsonParams = {
        param1: "value1",
        param2: "value2",
        // Add more JSON parameters as needed
    };

    const interpolatedConfig = JSON.stringify(config, (key, value) => {
        if (typeof value === "string" && value.includes("{") && value.includes("}")) {
            const paramKey = value.substring(value.indexOf("{") + 1, value.indexOf("}"));
            if (jsonParams.hasOwnProperty(paramKey)) {
                return value.replace(`{${paramKey}}`, jsonParams[paramKey]);
            }
        }
        return value;
    });

    return JSON.parse(interpolatedConfig);
}

const tsConfig = readTsConfig();
console.log(tsConfig);
