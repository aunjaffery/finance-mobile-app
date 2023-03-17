import {
  Box,
  Flex,
  Pressable,
  Spinner,
  Text,
  useColorModeValue,
} from "native-base";
import React, { useEffect, useState } from "react";
import { useStore } from "../../store/Store";
import BarGraphComp from "./BarGhraph";

const AreaChartComp = () => {
  const [span, setSpan] = useState("month");
  const {
    graphLoading,
    getExpDayGraph,
    getExpMonthGraph,
    dayGraph,
    monthGraph,
  } = useStore((state) => state);

  useEffect(() => {
    fn();
  }, [span]);

  const fn = async () => {
    try {
      if (span === "month") {
        await getExpDayGraph();
      } else {
        await getExpMonthGraph();
      }
    } catch (error) {
      console.log("IN Error -->");
      console.log(error);
    }
  };

  let bgColor = useColorModeValue("gray.400", "gray.400");
  const gHeight = 300;

  const LoadingComp = () => {
    return (
      <Flex h={gHeight} justify="center" align="center">
        <Spinner color="indigo.500" />
      </Flex>
    );
  };
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
          {graphLoading ? (
            <LoadingComp />
          ) : (
            <BarGraphComp gdata={dayGraph} type="month" gHeight={gHeight} />
          )}
        </Flex>
      ) : (
        <Flex mt="4" borderWidth="0" borderColor="teal.500">
          {graphLoading ? (
            <LoadingComp />
          ) : (
            <BarGraphComp gdata={monthGraph} type="year" gHeight={gHeight} />
          )}
        </Flex>
      )}
    </Box>
  );
};
export default AreaChartComp;
