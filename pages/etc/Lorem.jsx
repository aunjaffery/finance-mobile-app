import moment from "moment";
import { Box, Button, Flex, Text } from "native-base";
import { useState } from "react";
import { ScrollView } from "react-native";

const Lorem = () => {
  let [exp, setExp] = useState(null);
  return (
    <Box flex={1} borderColor="blue.200" borderWidth={0}>
      <Box p={2} borderColor="purple.200" borderWidth={0} bg="purple.400">
        <Text
          color="green.50"
          fontSize="xl"
          textAlign="center"
          fontWeight="bold"
        >
          Expenses
        </Text>
      </Box>
      <Box my="4">
        <Button colorScheme="green" _text={{ fontWeight: "bold" }}>
          Reload
        </Button>
      </Box>
      <Box flex={1} borderColor="red.200" borderWidth={0} mx="4">
        <ScrollView w="100%" h="100%">
          {exp &&
            exp.map((x) => (
              <Box key={x.id} p="4" bg="dark.200" mb="4" borderRadius="xl">
                <Flex direction="row">
                  <Box flex={1}>
                    <Text color="white">{x.title}</Text>
                    <Text color="red.400">{x.amount}</Text>
                  </Box>
                  <Box flex={1}>
                    <Text color="white">{x.shop}</Text>
                    <Text color="white">
                      {moment(x.date).format("hh:mmA DD MMM YY")}
                    </Text>
                  </Box>
                </Flex>
                <Box mt="2">
                  <Text color="gray.400" fontSize="lg">
                    {x.description}
                  </Text>
                </Box>
              </Box>
            ))}
        </ScrollView>
      </Box>
    </Box>
  );
};

export default Lorem;
