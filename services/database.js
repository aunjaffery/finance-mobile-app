import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import moment from "moment";
import { Platform } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as SQLite from "expo-sqlite";
import * as Updates from "expo-updates";
let dbName = "finlex.db";
let db = {};
db = SQLite.openDatabase(dbName);

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
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

export const showDox = async () => {
  let dir = await FileSystem.readDirectoryAsync(
    `${FileSystem.documentDirectory}SQLite`
  );
  console.log(dir);
};

export const reInitDb = async () => {
  try {
    await FileSystem.deleteAsync(
      `${FileSystem.documentDirectory}SQLite/${dbName}`,
      {
        idempotent: true,
      }
    );
    await Updates.reloadAsync();
  } catch (error) {
    console.log(error);
  }
};
export const export_database = async () => {
  let time = moment().format("YYYY-MM-DD_HHmmss");
  if (Platform.OS === "android") {
    try {
      const permissions =
        await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (!permissions.granted) {
        return;
      }
      const base64 = await FileSystem.readAsStringAsync(
        `${FileSystem.documentDirectory}SQLite/${dbName}`,
        {
          encoding: FileSystem.EncodingType.Base64,
        }
      );

      let uri = await FileSystem.StorageAccessFramework.createFileAsync(
        permissions.directoryUri,
        `${dbName}${time}`,
        "application/octet-stream"
      );
      await FileSystem.StorageAccessFramework.writeAsStringAsync(uri, base64, {
        encoding: FileSystem.EncodingType.Base64,
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    await Sharing.shareAsync(`${FileSystem.documentDirectory}SQLite/${dbName}`);
  }
};
export const import_database = async () => {
  try {
    let result = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: false,
    });

    if (result.type === "success") {
      if (
        !(
          await FileSystem.getInfoAsync(FileSystem.documentDirectory + "SQLite")
        ).exists
      ) {
        await FileSystem.makeDirectoryAsync(
          FileSystem.documentDirectory + "SQLite"
        );
      }

      const base64 = await FileSystem.readAsStringAsync(result.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      await FileSystem.writeAsStringAsync(
        `${FileSystem.documentDirectory}SQLite/${dbName}`,
        base64,
        { encoding: FileSystem.EncodingType.Base64 }
      );
      await Updates.reloadAsync();
      // console.log("Closing DB -->");
      // db.closeAsync();
      // db = SQLite.openDatabase(dbName);
    }
  } catch (error) {
    console.log(error);
  }
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
