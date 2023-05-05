import * as SQLite from "expo-sqlite";
import { User } from "../models/user.model";

const db = SQLite.openDatabase("db.database");

export const createTablesInDB = () => {
  db.transaction((transaction) => {
    transaction.executeSql(
      `CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT NOT NULL,
            password TEXT NOT NULL
        )`
    );
  });
};

// retrive user from database based on email
export const getUserByEmailFromDB = (email: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    db.transaction((transaction) => {
      transaction.executeSql(
        `SELECT * FROM users WHERE email = ?`,
        [email],
        (_, result) => {
          if (result.rows.length > 0) {
            const { id, email, password } = result.rows.item(0);
            resolve({ id, email, password });
          } else {
            resolve({ id: 0, email: "", password: "" });
          }
        },
        (_, err): boolean | any => {
          console.error(err);
          reject(err);
        }
      );
    });
  });
};

// insert user in database
export const insertUserInDB = (email: string, password: string) => {
  return new Promise((resolve, reject) => {
    db.transaction((transaction) => {
      transaction.executeSql(
        `INSERT INTO users (email, password) VALUES (?, ?)`,
        [email, password],
        (_, result) => {
          resolve(result.insertId);
        },
        (_, err): boolean | any => {
          console.log(err);
          reject(err);
        }
      );
    });
  });
};

export const deleteTablesInDB = () => {
  db.transaction((transaction) => {
    transaction.executeSql(`DROP TABLE users`);
  });
};
