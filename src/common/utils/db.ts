import knex from "knex";
import path from "path";

export function createSqliteDb(dbName: string) {
  const directory = process.env["DATA_DIR"] || ".";

  return knex({
    client: "better-sqlite3",
    connection: {
      filename: path.join(directory, dbName),
    },
  });
}
