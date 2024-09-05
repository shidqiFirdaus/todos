import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("todo.db");
export function init() {
  const initQuery = `CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, createDate TEXT);
                      CREATE TABLE IF NOT EXISTS taskList (todoId INTEGER, task TEXT NOT NULL)`;
  db.execSync(initQuery);
}

export async function newTodo(title: string) {
  const newTodos = `insert into todos (title,createDate) values(${title}, DATE('now))`;
  await db.execAsync(newTodos);
}
