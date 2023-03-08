import { Box, Button, Center, Heading, SectionList, Text } from "native-base";

const Random = ({ navigation }) => {
  const data = [
    {
      title: "Cyan",
      data: ["cyan.100", "cyan.200", "cyan.300", "cyan.400", "cyan.500"],
    },
    {
      title: "Yellow",
      data: [
        "yellow.100",
        "yellow.200",
        "yellow.300",
        "yellow.400",
        "yellow.500",
      ],
    },
    {
      title: "Violet",
      data: [
        "violet.100",
        "violet.200",
        "violet.300",
        "violet.400",
        "violet.500",
      ],
    },
  ];
  return (
    <Box flex={1} p={4}>
      <Text>Jon is Rubik justin</Text>
      <Text fontWeight={400}>Jon is Rubik justin 400</Text>
      <Box my="4">
        <Button onPress={() => navigation.push("Flex")}>Flex Page</Button>
      </Box>
      <Center h="80" w="100%">
        <SectionList
          maxW="300"
          w="100%"
          mb="4"
          sections={data}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => (
            <Center py="4" bg={item}>
              {item.split(".")[1]}
            </Center>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Center>
              <Heading fontSize="xl" mt="8" pb="4">
                {title}
              </Heading>
            </Center>
          )}
        />
      </Center>
    </Box>
  );
};

export default Random;
