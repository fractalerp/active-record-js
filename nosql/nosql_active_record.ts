import {
  DefaultSchemaOptions, Model,
  ObtainDocumentType, ResolveSchemaOptions,
  Schema, Types,
  model
} from "mongoose";

import { SchemaProperty } from "../lib/schema_property";
import { NoSQLActiveRecordInterface } from "./nosql_active_record_interface";
import DatabaseManagementSystem from "./../database/dms";

export class NoSqlActiveRecord<T> implements NoSQLActiveRecordInterface<T> {
  public model: Model<T>;
  private dbms: DatabaseManagementSystem = new DatabaseManagementSystem();


  constructor(modelName: string, schema: SchemaProperty) {
    // Cast fractal schema to mongoose shema.
    // This is the basic implementation. TODO: we have create our own parser logic
    const mongoSchema = schema as ObtainDocumentType<SchemaProperty, T, ResolveSchemaOptions<DefaultSchemaOptions>>;

    this.model =
      process.env.NODE_ENV !== "test"
        ? this.dbms.nosqlDB.database.model<T>(modelName, new Schema(mongoSchema as any))
        : model<T>(modelName, new Schema(mongoSchema as any)) // allow for test
  }

  async find(query: any): Promise<T[]> {
    return await this.model.find(query);
  }

  async findOne(query: any): Promise<T | null> {
    return await this.model.findOne(query);
  }

  async create(data: T): Promise<T> {
    const document = new this.model(data);
    // @ts-ignore: TODO work on typing to support (Document<unknown, {}, T> & { _id: ObjectId; }) | (Document<unknown, {}, T> & { _id?: unknown; } & Required<{ _id: unknown; }>)
    return await document.save();
  }

  async update(id: string | number, data: Partial<T>): Promise<T> {
    // @ts-ignore: TODO work on typing to support T | null
    return await this.model.findByIdAndUpdate(new Types.ObjectId(id), data, { new: true });
  }

  async delete(id: string | number): Promise<void> {
    await this.model.findByIdAndDelete(new Types.ObjectId(id));
  }

  async aggregate(pipeline: any[]): Promise<any> {
    return await this.model.aggregate(pipeline);
  }

  async index(keys: Record<string, any>, options?: Record<string, any>): Promise<void> {
    await this.model.schema.index(keys, options);
  }
}
