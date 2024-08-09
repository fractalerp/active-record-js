import { ActiveRecordInterface } from "../active_record_interface";

export interface RelationalActiveRecordInterface<T> extends ActiveRecordInterface<T> {
  // Specific methods for relational databases
  query(sql: string, params?: any[]): Promise<any>;
  beginTransaction(): Promise<void>;
  commitTransaction(): Promise<void>;
  rollbackTransaction(): Promise<void>;
}
