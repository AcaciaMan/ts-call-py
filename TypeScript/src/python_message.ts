import M_Config from "./m_config";

export class PythonMessage {
  m_function: string;
  m_args: object;

  constructor(m_function: string, m_args: object) {
    this.m_function = m_function;
    this.m_args = m_args;
  }

  encode(): string {
    return M_Config.m_channel.encode(this);
  }
}

/*
const generatedJson: PythonMessage = new PythonMessage( "return_2", {something: 1});
*/
