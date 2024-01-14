export interface python_channel {
  received_data: Buffer;
  received_json: object;
  bReceivedResponse: boolean;
  getJSONAs64ByteEncoded(jObj: object): string;
  encode(jObj: object): string;
  decode(data): void;
}

export class PythonChannel implements python_channel {
  received_data: Buffer;
  received_json: object;
  bReceivedResponse: boolean = false;

  getJSONAs64ByteEncoded(jObj: object): string {
    const jsonString = JSON.stringify(jObj);
    const encodedString = Buffer.from(jsonString).toString("base64");
    return encodedString;
  }

  encode(jObj: object): string {
    const jsonString = "#$%" + this.getJSONAs64ByteEncoded(jObj) + "%$#";

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
      const extractedString = jsonString.substring(
        startIndex + startMarker.length,
        endIndex
      );

      this.received_json = JSON.parse(
        Buffer.from(extractedString, "base64").toString("utf8")
      );

      this.bReceivedResponse = true;

      if (startIndex > 0) {
        console.log("recout:", jsonString.substring(0, startIndex));
      }

      if (endIndex < jsonString.length - 3) {
        console.log("recout:", jsonString.substring(endIndex + 3));
      }
      this.received_data = null;
    } else if (startIndex === -1 && jsonString.length > 0) {
      console.log("recout:", jsonString);
      this.received_data = null;
    }
  }

  new_message(): void {
    this.bReceivedResponse = false;
    this.received_json = null;
  }
}
