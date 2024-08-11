import { Sequelize } from "sequelize";

import { DatabaseConnectionInterface } from "./database_connection_interface";
export class Rdms implements DatabaseConnectionInterface {

  public database!: Sequelize;

  private database_uri: string;

  constructor(database_uri: string) {
    this.database_uri = database_uri;
    this.database = new Sequelize(this.database_uri);

    this.database.addHook("afterConnect", () => {
      console.info("Connected to the database RDMS");
    });

    this.database.addHook("afterDisconnect", () => {
      console.error("Error: The server was not able to reach RDMS. Maybe it's not running?");
    });
  }

  async connect(): Promise<void> {
    this.database?.authenticate();
  }

  async disconnect(): Promise<void> {
    await this.database?.close();
  }
}

