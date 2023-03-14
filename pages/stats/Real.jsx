import {
  Box,
  Button,
  Flex,
  Pressable,
  Text,
  useColorModeValue,
} from "native-base";
import React, { useEffect, useState } from "react";
import { expByDay } from "../../services/database";
import BarGraphComp from "./BarGhraph";
import PieGraph from "./PieGraph";

let sam = [
  { id: 1, date: "Jan", sum: 3000 },
  { id: 2, date: "Feb", sum: 2000 },
  { id: 3, date: "Mar", sum: 8000 },
  { id: 4, date: "Apr", sum: 20800 },
  { id: 5, date: "May", sum: 30000 },
  { id: 6, date: "Jun", sum: 15000 },
  { id: 7, date: "Jul", sum: 28000 },
  { id: 8, date: "Aug", sum: 18000 },
  { id: 9, date: "Sep", sum: 5000 },
  { id: 10, date: "Oct", sum: 18000 },
  { id: 11, date: "Nov", sum: 13000 },
  { id: 12, date: "Dec", sum: 20000 },
];

const AreaChartComp = () => {
  const [gdata, setGdata] = useState([]);
  const [span, setSpan] = useState("month");

  useEffect(() => {
    const fn = async () => {
      try {
        const exp = await expByDay();
        console.log("getting graphs -->");
        console.log(exp);
        setGdata(exp);
      } catch (error) {
        console.log("IN Error -->");
        console.log(error);
      }
    };
    fn();
  }, []);

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
      <Flex mt="4" borderWidth="0" borderColor="teal.500">
        <BarGraphComp gdata={gdata} />
      </Flex>
    </Box>
  );
};
export default AreaChartComp;
