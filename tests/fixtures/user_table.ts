import { SchemaProperty } from "../../@types/schema_property";

export interface IUserTable {
  type?: string;
  firstName: string;
  lastName: string;
  phoneNumber: number;
  id?: string;
}

export const userTableSchema: Record<string, SchemaProperty> = {
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    unique: false
  },
  phoneNumber: {
    type: Number
  }
};
