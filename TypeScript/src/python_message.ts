export enum python_message_type {
    python_script = "python_script",
    param = "param"
}

export type JsonStructure = {
    [key: string]: object;
};

export interface python_message {
    type: python_message_type;
    getJSONAs64ByteEncoded(): string;
}

export interface python_script extends python_message {
    imports: string[];
    declarations: JsonStructure;
    code: string[];
    return: string;
}

export class PythonMessage implements python_message {
    type: python_message_type;
    constructor(type: python_message_type) {
        this.type = type;
    }
    
    getJSONAs64ByteEncoded(): string {
        const jsonString = JSON.stringify(this);
        const encodedString = Buffer.from(jsonString).toString('base64');
        return encodedString;
    }
}

export class PythonScript extends PythonMessage implements python_script {
    imports: string[];
    declarations: JsonStructure;
    code: string[];
    return: string;
    constructor() {
        super(python_message_type.python_script);
    }
}

/*
const generatedJson: PythonScript = new PythonScript();
generatedJson.imports = ["import Yaml", "import os"];
generatedJson.declarations = { m_args: {something: 1}, m_result: null };
generatedJson.code = ["m_result = Yaml.dump(m_args)"];
generatedJson.return = "m_result";
*/
