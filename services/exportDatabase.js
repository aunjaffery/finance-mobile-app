import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import moment from "moment";
import { Platform } from "react-native";
import * as DocumentPicker from "expo-document-picker";

// export const export_database = async () => {
//   let time = moment().format("YYYY-MM-DD_HHmmss");
//   if (Platform.OS === "android") {
//     try {
//       const permissions =
//         await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
//       if (!permissions.granted) {
//         return;
//       }
//       const base64 = await FileSystem.readAsStringAsync(
//         FileSystem.documentDirectory + "SQLite/flex1.db",
//         {
//           encoding: FileSystem.EncodingType.Base64,
//         }
//       );
//
//       let uri = await FileSystem.StorageAccessFramework.createFileAsync(
//         permissions.directoryUri,
//         `database${time}`,
//         "application/octet-stream"
//       );
//       await FileSystem.StorageAccessFramework.writeAsStringAsync(uri, base64, {
//         encoding: FileSystem.EncodingType.Base64,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   } else {
//     await Sharing.shareAsync(FileSystem.documentDirectory + "SQLite/flex1.db");
//   }
// };

export const import_database = async () => {
  try {
    let result = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: false,
    });
    const base64 = await FileSystem.readAsStringAsync(result.uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    console.log("res -->", base64);
    console.log("importing -->");
  } catch (error) {
    console.log(error);
  }
};

const importDb = async () => {
  let result = await DocumentPicker.getDocumentAsync({
    copyToCacheDirectory: false,
  });

  if (result.type === "success") {
    setIsLoading(true);

    if (
      !(await FileSystem.getInfoAsync(FileSystem.documentDirectory + "SQLite"))
        .exists
    ) {
      await FileSystem.makeDirectoryAsync(
        FileSystem.documentDirectory + "SQLite"
      );
    }

    const base64 = await FileSystem.readAsStringAsync(result.uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    await FileSystem.writeAsStringAsync(
      FileSystem.documentDirectory + "SQLite/example.db",
      base64,
      { encoding: FileSystem.EncodingType.Base64 }
    );
    await db.closeAsync();
    setDb(SQLite.openDatabase("example.db"));
  }
};
