import { Box, Flex, Icon, Text, useColorModeValue } from "native-base";
import ExpenseCard from "../../components/cards/ExpenseCard";
import ExpCardSkl from "../../components/skeleton/ExpCardSkl";
import Octicons from "@expo/vector-icons/Octicons";
import { Image } from "expo-image";
import { useStore } from "../../store/Store";

const ExpenseList = ({ topColor }) => {
  const { loading, expList, monthlyTotal } = useStore((state) => state);

  if (loading) {
    return <ExpCardSkl />;
  }
  const secTextColor = useColorModeValue("gray.500", "gray.400");
  const dateTextColor = useColorModeValue("gray.600", "gray.200");
  return (
    <Box flex={1}>
      <Box bg={topColor} px="4" pb="2">
        <Box px="1">
          <Text color={secTextColor}>Total Expense</Text>
        </Box>
        <Flex direction="row" align="center" mb="2">
          <Icon
            name="shopping-cart"
            as={<Octicons name="stack" />}
            color="red.400"
            size={25}
            textAlign="center"
            mr="1"
          />
          <Text fontSize="3xl" fontWeight="bold">
            {monthlyTotal
              ? monthlyTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : 0}

            <Text fontSize="sm" color={secTextColor}>
              {" "}
              Rs
            </Text>
          </Text>
        </Flex>
      </Box>
      {!expList ? (
        <Flex justify="center" align="center" flex={1} mb="20">
          <Image
            source={require("../../assets/empty.svg")}
            style={{ width: 180, height: 180 }}
          />
          <Text fontSize="lg" fontWeight="semibold" color="gray.500">
            No expense found!
          </Text>
        </Flex>
      ) : (
        <Box flex={1} mt="3">
          <Flex>
            {expList &&
              Object.keys(expList).map((x, id) => (
                <Box key={id}>
                  <Box mb="2" px="4">
                    <Text color={dateTextColor} fontWeight="bold">
                      {x}
                    </Text>
                  </Box>
                  {expList[x].map((e) => (
                    <ExpenseCard key={e.id} exp={e} />
                  ))}
                </Box>
              ))}
          </Flex>
        </Box>
      )}
    </Box>
  );
};

export default ExpenseList;
