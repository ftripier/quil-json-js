interface quilJSONInstruction {}

declare function quilToJSON(quilProgram: string): quilJSONInstruction[];

export = quilToJSON;
