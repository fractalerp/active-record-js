import { ActiveRecordInterface } from "../active_record_interface";

export interface NoSQLActiveRecordInterface<T> extends ActiveRecordInterface<T> {
  // Specific methods for NoSQL databases
  aggregate(pipeline: any[]): Promise<any>;
  index(keys: string[]): Promise<void>;
}
