import { Box, Flex, Pressable, Text, useColorModeValue } from "native-base";
import React, { useEffect, useState } from "react";
import { useStore } from "../../store/Store";
import BarGraphComp from "./BarGhraph";
import LineGraphComp from "./LineGraph";

const AreaChartComp = () => {
  const [span, setSpan] = useState("month");
  const { getExpDayGraph, dayGraph } = useStore((state) => state);

  useEffect(() => {
    fn();
  }, [span]);

  const fn = async () => {
    try {
      await getExpDayGraph();
    } catch (error) {
      console.log("IN Error -->");
      console.log(error);
    }
  };

  let bgColor = useColorModeValue("gray.400", "gray.400");
  return (
    <Box mt="4">
      <Flex direction="row" justify="flex-end" mr="2">
        <Flex direction="row" bg={bgColor} borderRadius="md">
          {["month", "year"].map((x, id) => (
            <Pressable onPress={() => setSpan(x)} key={id}>
              <Box
                bg={span === x ? "indigo.500" : bgColor}
                px="2"
                py="1"
                borderRadius="md"
              >
                <Text
                  color="white"
                  textTransform="capitalize"
                  fontWeight="bold"
                >
                  {x}
                </Text>
              </Box>
            </Pressable>
          ))}
        </Flex>
      </Flex>
      {span === "month" ? (
        <Flex mt="4" borderWidth="0" borderColor="teal.500">
          <LineGraphComp gdata={dayGraph} />
        </Flex>
      ) : (
        <Flex mt="4" borderWidth="0" borderColor="teal.500">
          <BarGraphComp gdata={dayGraph} />
        </Flex>
      )}
    </Box>
  );
};
export default AreaChartComp;
