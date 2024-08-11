import { ActiveRecordInterface } from "./active_record_interface";
import { DatabaseType } from "./@types/database_type";
import { NoSqlActiveRecord } from "./nosql/nosql_active_record";
import { RelationalActiveRecord } from "./relational/relational_active_record";
import { Messages } from "./lib/messages";
import { SchemaProperty } from "./@types/schema_property";
import { ActiveRecordError } from "./lib/active_record_error";

export class ActiveRecord<T> implements ActiveRecordInterface<T> {
  private nosqlActiveRecord!: NoSqlActiveRecord<T>;
  private relationalActiveRecord!: RelationalActiveRecord<T>;

  // TODO read database type from memory
  private databaseType = DatabaseType.NOSQL;

  constructor(modelName: string, schema: Record<string, SchemaProperty>) {
    if (this.databaseType === DatabaseType.NOSQL) {
      this.nosqlActiveRecord = new NoSqlActiveRecord<T>(modelName, schema);
    } else {
      this.relationalActiveRecord = new RelationalActiveRecord<T>(modelName, schema);
    }
  }

  async find(query: any): Promise<T[]> {
    if (this.databaseType === DatabaseType.NOSQL) {
      return this.nosqlActiveRecord.find(query);
    }

    return this.relationalActiveRecord.find(query);
  }

  async findOne(query: any): Promise<T | null> {
    if (this.databaseType === DatabaseType.NOSQL) {
      return this.nosqlActiveRecord.findOne(query);
    }

    return this.relationalActiveRecord.findOne(query);
  }

  async create(data: T): Promise<T> {
    if (this.databaseType === DatabaseType.NOSQL) {
      return this.nosqlActiveRecord.create(data);
    }

    return this.relationalActiveRecord.create(data);
  }

  async update(id: string | number, data: Partial<T>): Promise<T> {
    if (this.databaseType === DatabaseType.NOSQL) {
      return this.nosqlActiveRecord.update(id, data);
    }

    return this.relationalActiveRecord.update(id, data);
  }

  async delete(id: string | number): Promise<void> {
    if (this.databaseType === DatabaseType.NOSQL) {
      return this.nosqlActiveRecord.delete(id);
    }

    return this.relationalActiveRecord.delete(id);
  }

  async aggregate(pipeline: any[]): Promise<any> {
    if (this.databaseType === DatabaseType.RELATIONAL) {
      throw new ActiveRecordError(Messages.RELATIONAL_DATABASE_NOT_SUPPORTED);
    }

    return this.nosqlActiveRecord.aggregate(pipeline);
  }

  async index(keys: string[]): Promise<void> {
    if (this.databaseType === DatabaseType.RELATIONAL) {
      throw new ActiveRecordError(Messages.RELATIONAL_DATABASE_NOT_SUPPORTED);
    }

    return this.nosqlActiveRecord.index(keys);
  }

  async query(sql: string, params?: any[]): Promise<any> {
    if (this.databaseType === DatabaseType.NOSQL) {
      throw new ActiveRecordError(Messages.NOSQL_DATABASE_NOT_SUPPORTED);
    }

    return this.relationalActiveRecord.query(sql, params);
  }

  async beginTransaction(): Promise<void> {
    if (this.databaseType === DatabaseType.NOSQL) {
      throw new ActiveRecordError(Messages.NOSQL_DATABASE_NOT_SUPPORTED);
    }

    return this.relationalActiveRecord.beginTransaction();
  }

  async commitTransaction(): Promise<void> {
    if (this.databaseType === DatabaseType.NOSQL) {
      throw new ActiveRecordError(Messages.NOSQL_DATABASE_NOT_SUPPORTED);
    }

    await this.relationalActiveRecord.commitTransaction();
  }

  async rollbackTransaction(): Promise<void> {
    if (this.databaseType === DatabaseType.NOSQL) {
      throw new ActiveRecordError(Messages.NOSQL_DATABASE_NOT_SUPPORTED);
    }

    await this.relationalActiveRecord.rollbackTransaction();
  }
}
