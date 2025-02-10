import M_Config from "./m_config";

export interface python_message {
  code: string;
  args: object;
  encode(): string;
}

export class PythonMessage implements python_message {
  code: string;
  args: object;

  constructor(code: string, args: object) {
    this.code = code;
    this.args = args;
  }

  encode(): string {
    return M_Config.m_channel.encode(this);
  }
}

/*
const generatedJson: PythonMessage = new PythonMessage( "return_2", {something: 1});
*/
