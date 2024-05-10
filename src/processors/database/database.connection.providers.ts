import { DATABASE_CONNECTION } from "./database.constants";
import mongodbConfig from '../../configs/mongodb.config';
import { ConfigType } from "@nestjs/config";
import { Connection, createConnection } from "mongoose";

export const databaseConnectionProviders  = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: (dbConfig: ConfigType<typeof mongodbConfig>) : Connection => {
      const conn = createConnection(dbConfig.uri, {
      });
      return conn;
    },
    inject: [mongodbConfig.KEY],
  }
]
