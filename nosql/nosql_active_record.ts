import mongoose, { DefaultSchemaOptions, Model, ObtainDocumentType, ResolveSchemaOptions, Schema } from "mongoose";
import { SchemaProperty } from "../@types/schema_property";
import { NoSQLActiveRecordInterface } from "./nosql_active_record_interface";

export class NoSqlActiveRecord<T> implements NoSQLActiveRecordInterface<T> {
  private model: Model<T>;


  constructor(modelName: string, schema: SchemaProperty) {

    // Cast fractal schema to mongoose shema.
    // This is the basic implementation. TODO: we have create our own parser logic
    const mongoSchema = schema as ObtainDocumentType<SchemaProperty, T, ResolveSchemaOptions<DefaultSchemaOptions>>;

    // TODO; we have to remove any if our parser is complete
    this.model = mongoose.model<T>(modelName, new Schema(mongoSchema as any));
  }

  async find(query: any): Promise<T[]> {
    return this.model.find(query);
  }

  async findOne(query: any): Promise<T | null> {
    return this.model.findOne(query);
  }

  async create(data: T): Promise<T> {
    const document = new this.model(data);
    // @ts-ignore: TODO work on typing to support (Document<unknown, {}, T> & { _id: ObjectId; }) | (Document<unknown, {}, T> & { _id?: unknown; } & Required<{ _id: unknown; }>)
    return document.save();
  }

  async update(id: string | number, data: Partial<T>): Promise<T> {
    // @ts-ignore: TODO work on typing to support T | null
    return this.model.findByIdAndUpdate(new mongoose.Types.ObjectId(id), data, { new: true });
  }

  async delete(id: string | number): Promise<void> {
    await this.model.findByIdAndDelete(new mongoose.Types.ObjectId(id));
  }

  async aggregate(pipeline: any[]): Promise<any> {
    return this.model.aggregate(pipeline);
  }

  async index(keys: Record<string, any>, options?: Record<string, any>): Promise<void> {
    await this.model.schema.index(keys, options);
  }
}
