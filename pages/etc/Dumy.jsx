import { Box, Button, Flex, Heading, Text } from "native-base";

const Dummy = ({ navigation }) => {
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
        <Button colorScheme="blue" _text={{ fontWeight: "bold" }}>
          Submit
        </Button>
      </Box>
      <Box mt="4">
        <Button
          onPress={() => navigation.popToTop()}
          colorScheme="blue"
          _text={{ fontWeight: "bold" }}
        >
          Pop
        </Button>
      </Box>
    </Flex>
  );
};
export default Dummy;
