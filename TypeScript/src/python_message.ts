import M_Config from "./m_config";

export enum python_message_type {
  python_script = "python_script",
  m_json = "json",
}

export interface python_message {
  type: python_message_type;
  encode(): string;
}

export interface python_script extends python_message {
  imports: string[];
  declarations: object[];
  code: string[];
  m_return: string;
}

export class PythonMessage implements python_message {
  type: python_message_type;
  constructor(type: python_message_type) {
    this.type = type;
  }

  encode(): string {
      return M_Config.m_channel.encode(this);
  }
}

export class PythonScript extends PythonMessage implements python_script {
  imports: string[];
  declarations: object[];
  code: string[];
  m_return: string;
  constructor() {
    super(python_message_type.python_script);
  }
}

/*
const generatedJson: PythonScript = new PythonScript();
generatedJson.imports = ["import Yaml", "import os"];
generatedJson.declarations = [{ m_args: {something: 1}}, {m_result: null }];
generatedJson.code = ["m_result = Yaml.dump(m_args)"];
generatedJson.return = "m_result";
*/
