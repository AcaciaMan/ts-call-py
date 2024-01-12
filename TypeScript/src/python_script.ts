export type JsonStructure = {
    [key: string]: object;
};

export type PythonScriptType = {
    imports: string[];
    declarations: JsonStructure;
    code: string[];
    return: string;
};

/*
const generatedJson: PythonScriptType = {
    imports: ["import Yaml", "import os"],
    declarations: { m_args: {something: 1}, m_result: null },
    code: ["m_result = Yaml.dump(m_args)"],
    return: "m_result",
};
*/

export class PythonScript {
    private _script: PythonScriptType;

    public get script(): PythonScriptType {
        return this._script;
    }

    public set script(value: PythonScriptType) {
        this._script = value;
    }

    public getScriptAsJsonString(): string {
        return JSON.stringify(this._script);
    }

    public getStringAs64ByteEncoded(): string {
        const scriptJsonString = this.getScriptAsJsonString();
        const encodedString = Buffer.from(scriptJsonString).toString('base64');
        return encodedString;
    }
}


