import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("flex1.db");

export const InitDb = () => {
  console.log("Initializing Database -->");
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS expenses
		   (id INTEGER PRIMARY KEY NOT NULL,
			title TEXT NOT NULL,
			amount INT NOT NULL,
			shop TEXT,
			date TEXT NOT NULL,
			description TEXT)`,
        [],
        resolve,
        (_, error) => reject(error)
      );
    });
  });
};

export const fetchExpenses = (month) => {
  return new Promise((resolve, reject) => {
    if (!month) reject("Error! Required start and end date");
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM expenses
		 WHERE
		   STRFTIME('%Y-%m', date) = ?
		 ORDER BY date DESC;`,
        [month],
        (_, result) => resolve(result.rows._array),
        (_, error) => reject(error)
      );
    });
  });
};
export const createExpense = (data) => {
  let { title, amount, shop, date, description } = data;
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO expenses (title, amount, shop, date, description) VALUES (?, ?, ?, ?, ?)`,
        [title, amount, shop, date, description],
        (_, result) => resolve(result.insertId),
        (_, error) => reject(error)
      );
    });
  });
};
export const expByCat = (month) => {
  return new Promise((resolve, reject) => {
    if (!month) reject("Error! Required start and end date");
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT id, title, sum(amount) sum FROM expenses
		 WHERE
		   STRFTIME('%Y-%m', date) = ?
         GROUP BY 
		  title
		 ORDER BY sum DESC;`,
        [month],
        (_, result) => resolve(result.rows._array),
        (_, error) => reject(error)
      );
    });
  });
};
export const expByDay = (data) => {
  const { start, end } = data;
  return new Promise((resolve, reject) => {
    if (!start || !end) reject("Error! Required start and end date");
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT
		   id, STRFTIME('%Y-%m-%d', date) date, SUM(amount) sum
         FROM expenses
		 WHERE
		   date BETWEEN ? AND ?
         GROUP BY 
		   STRFTIME('%Y-%m-%d', date)
		 ORDER BY date;`,
        [start, end],
        (_, result) => resolve(result.rows._array),
        (_, error) => reject(error)
      );
    });
  });
};

export const expByMonth = (data) => {
  const { start, end } = data;
  return new Promise((resolve, reject) => {
    if (!start || !end) reject("Error! Required start and end date");
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT
		   id, STRFTIME('%Y-%m', date) date, SUM(amount) sum
         FROM expenses
		 WHERE
		   date BETWEEN ? AND ?
         GROUP BY 
		   STRFTIME('%Y-%m', date)
		 ORDER BY date;`,
        [start, end],
        (_, result) => resolve(result.rows._array),
        (_, error) => reject(error)
      );
    });
  });
};

export const deleteExpense = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "Delete FROM expenses Where id = ?",
        [id],
        resolve,
        (_, error) => reject(error)
      );
    });
  });
};
