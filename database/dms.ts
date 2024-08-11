import { DatabaseAdapter } from "./database_adapter";
import { MongoDB } from "./mongodb";
import { Rdms } from "./rdms";

export default class DatabaseManagementSystem {
  public rdmsDB = new Rdms(process.env.RDBMS_DATABASE_URI as string);;
  public nosqlDB = new MongoDB(process.env.NOSQL_DATABASE_URI as string);

  constructor() {
    const noSqLAdapter = process.env.NOSQL_DATABASE_ADAPTER;

    switch (noSqLAdapter) {
      case DatabaseAdapter.MONGODB:
        this.nosqlDB.connect();

        break;
    }

    this.rdmsDB.connect();
  }
}
