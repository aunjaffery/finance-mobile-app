import { Box, Button, Flex } from "native-base";
import moment from "moment";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";

const Con = () => {
  const [selectedMon, setSelectedMon] = useState(moment().format("MMM-YYYY"));
  let monthFunc = () => {
    let monthArr = [];
    for (let i = 3; i >= 0; i--) {
      monthArr.push(moment().subtract(i, "month").format("MMM-YYYY"));
    }
    return monthArr;
  };

  return (
    <Box p={6}>
      <Flex flexDir="row">
        {monthFunc().map((x, id) => (
          <Button
            key={id}
            mr={4}
            bg="dark.200"
            py={2}
            px={4}
            borderRadius="xl"
            borderWidth={selectedMon === x ? 1 : 0}
            borderColor="green.800"
            color="pink.400"
            _text={{ color: selectedMon === x ? "green.400" : "gray.500" }}
            onPress={() => setSelectedMon(x)}
          >
            {moment(x, "MMM-YYYY").format("MMM")}
          </Button>
        ))}
      </Flex>
      <Box mt={10}>
      </Box>
      <Box mt="10">
        <Button onPress={() => console.log("PRESSED!!!")}>Try me</Button>
      </Box>
    </Box>
  );
};
export default Con;
