import fs from "fs";
import path from "path";

function readTsConfig() {
    const projectRoot = path.resolve(__dirname, "../");
    const tsConfigPath = path.resolve(projectRoot, "typescript.json");
    
    const tsConfigContent = fs.readFileSync(tsConfigPath, "utf-8");
    const tsConfig = JSON.parse(tsConfigContent);
    
  
    return tsConfig;
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

            if (typeof value === "string" && value.includes("{") && value.includes("}")) {
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

// Usage example:
const config = readTsConfig();
walkJsonTree(config, (key, value) => {
    // console.log(`Key: ${key}, Value: ${value}`);
});

// const tsConfig = readTsConfig();
console.log(config);
