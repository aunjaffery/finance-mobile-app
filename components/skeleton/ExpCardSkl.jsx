import { Box, Flex, Skeleton, useColorModeValue } from "native-base";

const ExpCardSkl = () => {
  const bg = useColorModeValue("bg.200", "dark.200");
  return (
    <Box>
      <Box h="20"  bg={bg} />
      <Box flex={1} mt="6" px="4">
        {[1, 2, 3].map((x) => (
          <Flex direction="row" key={x} mb="4">
            <Skeleton w="45" h="45" borderRadius="lg" />
            <Flex flex={1} direction="row" ml="4" justify="space-between">
              <Box flex={2}>
                <Skeleton.Text lines="2" />
              </Box>
              <Box flex={2} />
              <Box flex={1}>
                <Skeleton.Text lines="2" />
              </Box>
            </Flex>
          </Flex>
        ))}
      </Box>
    </Box>
  );
};

export default ExpCardSkl;
