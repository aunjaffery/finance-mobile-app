import { useIsFocused } from "@react-navigation/native";
import {
  Box,
  Flex,
  Pressable,
  Spinner,
  Text,
  useColorModeValue,
  useToast,
} from "native-base";
import React, { useEffect, useState } from "react";
import { FocusBar } from "../../services/FocusBar";
import { useStore } from "../../store/Store";
import BarGraphComp from "./BarGhraph";
import CatGraph from "./CatGraph";

const AreaChartComp = () => {
  const toast = useToast();
  const isFocus = useIsFocused();
  const [span, setSpan] = useState("month");
  const {
    graphLoading,
    getExpDayGraph,
    getExpMonthGraph,
    dayGraph,
    monthGraph,
  } = useStore((state) => state);

  useEffect(() => {
    if (isFocus) {
      fn();
    }
  }, [span, isFocus]);

  const fn = async () => {
    try {
      if (span === "month") {
        await getExpDayGraph();
      } else {
        await getExpMonthGraph();
      }
    } catch (error) {
      toast.show({
        duration: 2000,
        placement: "top",
        render: () => (
          <Box bg="red.400" px="4" py="2">
            <Text>Oops! Somthing went wrong...</Text>
          </Box>
        ),
      });
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
  //log.info("rending Times ------------->");
  return (
    <Box mt="4">
      <FocusBar />
      <CatGraph />
      <Box mt="6">
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
                    fontSize="xs"
                  >
                    {x}
                  </Text>
                </Box>
              </Pressable>
            ))}
          </Flex>
        </Flex>
        {span === "month" ? (
          <Flex mt="6" borderWidth="0" borderColor="teal.500">
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
    </Box>
  );
};
export default AreaChartComp;
