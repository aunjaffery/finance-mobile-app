import { Box, Button, Flex, Heading, Text } from "native-base";
import * as FileSystem from "expo-file-system";
import { export_database, import_database } from "../../services/database";

const Dummy = () => {
  const test = async () => {
    let docx = await FileSystem.readDirectoryAsync(
      `${FileSystem.documentDirectory}SQLite`
    );
    console.log(docx);
  };
  let g = async () => {
    try {
      await export_database();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Flex flex={1} p={10}>
      <Box>
        <Heading color="success.400">This is Dummy...</Heading>
        <Box mb={4}>
          <Text color="coolGray.400" mb={2} fontSize="md">
            Title
          </Text>
        </Box>
      </Box>
      <Box mt="4">
        <Button
          colorScheme="blue"
          _text={{ fontWeight: "bold" }}
          onPress={test}
        >
          Test
        </Button>
      </Box>
      <Box mt="4">
        <Button colorScheme="blue" _text={{ fontWeight: "bold" }} onPress={g}>
          Export Database
        </Button>
      </Box>
      <Box mt="4">
        <Button
          onPress={() => import_database()}
          colorScheme="blue"
          _text={{ fontWeight: "bold" }}
        >
          Import DataBase
        </Button>
      </Box>
    </Flex>
  );
};
export default Dummy;
