export enum python_message_type {
  python_script = "python_script",
  m_json = "json",
}

export interface python_message {
  type: python_message_type;
  received_data: Buffer;
  received_json: object;
  getJSONAs64ByteEncoded(): string;
  encode(): string;
  decode(data): void;
}

export interface python_script extends python_message {
  imports: string[];
  declarations: object[];
  code: string[];
  m_return: string;
}

export class PythonMessage implements python_message {
  type: python_message_type;
  received_data: Buffer;
  received_json: object;
  constructor(type: python_message_type) {
    this.type = type;
  }

  getJSONAs64ByteEncoded(): string {
    const jsonString = JSON.stringify(this);
    const encodedString = Buffer.from(jsonString).toString("base64");
    return encodedString;
  }

  encode(): string {
    const jsonString = "#$%" + this.getJSONAs64ByteEncoded() + "%$#";

    return jsonString;
  }

decode(data): void {
    if (!this.received_data) {
        this.received_data = Buffer.from("", "latin1");
    }
    
    this.received_data = Buffer.concat([this.received_data, data]);

    const jsonString = Buffer.from(this.received_data).toString("latin1");
    // console.log(jsonString);

    const startMarker = "#$%";
    const endMarker = "%$#";
    const startIndex = jsonString.indexOf(startMarker);
    const endIndex = jsonString.indexOf(endMarker);

    if (startIndex > -1 && endIndex > -1) {
        const extractedString = jsonString.substring(startIndex+startMarker.length, endIndex);

        this.type = python_message_type.m_json;
        this.received_json = JSON.parse(
            Buffer.from(extractedString, "base64").toString("utf8")
        );

        if(startIndex > 0) {
            console.log(
              "recout:",
              jsonString.substring(0, startIndex)
            );
        }

        if(endIndex < jsonString.length-3) {
            console.log('recout:', jsonString.substring(endIndex+3));
        }
                this.received_data = null;

    } else if (startIndex === -1 && jsonString.length > 0) {

        console.log('recout:', jsonString);
        this.received_data = null;
    }
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
