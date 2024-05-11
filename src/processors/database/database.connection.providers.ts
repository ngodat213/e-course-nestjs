import { DATABASE_CONNECTION } from "./database.constants";
import * as APP_CONFIG from '../../app.config'
import { ConfigType } from "@nestjs/config";
import { Connection, createConnection } from "mongoose";

export const databaseConnectionProviders  = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: () : Connection => {
      const conn = createConnection(APP_CONFIG.MONGODB.uri, {
      });
      return conn;
    },
  }
]
