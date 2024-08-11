import mongoose from "mongoose";
import { DatabaseConnectionInterface } from "./database_connection_interface";

export class MongoDB implements DatabaseConnectionInterface {
  private mongoConnectionOptions = { retryWrites: true, ssl: true };
  private database_url: string;

  public database!: mongoose.Connection;

  constructor(database_url: string) {
    this.database_url = database_url;
    this.database = new mongoose.Connection();
  }

  async connect(): Promise<void> {
    // set database debgu info to log file
    mongoose.set("debug", (coll, method, query, doc, options) => {
      const set = {
        coll,
        method,
        query,
        doc,
        options
      };

      console.info({
        dbQuery: set
      });
    });

    // Do not log sensitive information in production
    if (process.env.NODENV !== "production") {
      mongoose.set("debug", (coll: any, method: any, query: any, doc: any, opts: any) => {
        console.info({
          dbQuery: {
            coll,
            method,
            query,
            doc,
            options: opts
          }
        });
      });
    }

    // Do not use ssl on localhost
    for (const dbHost of ["://localhost", "://127.0.0.1", "://0.0.0.0"]) {
      if (this.database_url.includes(dbHost)) {
        this.mongoConnectionOptions = { ...this.mongoConnectionOptions, ssl: false };
        break;
      }
    }

    this.database = mongoose.createConnection(this.database_url, this.mongoConnectionOptions);

    this.database
      .on("connected", () => {
        console.info("Connected to the database mongodb");
      })
      .on("error", (err: any) => {
        if (err.message.indexOf("ECONNREFUSED") !== -1) {
          // eslint-disable-next-line
          console.error("Error: The server was not able to reach MongoDB. Maybe it's not running?");
          process.exit(1);
        } else {
          throw err;
        }
      });
  }

  async disconnect(): Promise<void> {
    await mongoose.disconnect();
  }
}
