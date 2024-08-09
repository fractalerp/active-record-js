export interface ActiveRecordInterface<T> {
  find(query: any): Promise<T[]>;
  findOne(query: any): Promise<T | null>;
  create(data: T): Promise<T>;
  update(id: string | number, data: Partial<T>): Promise<T>;
  delete(id: string | number): Promise<void>;
}
