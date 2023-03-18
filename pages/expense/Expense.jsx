import {
  Actionsheet,
  Box,
  Flex,
  Pressable,
  ScrollView,
  Text,
  Icon,
  useDisclose,
  useColorModeValue,
} from "native-base";
import moment from "moment";
import { useEffect, useState } from "react";
import ExpenseList from "./ExpenseList";
import Octicons from "@expo/vector-icons/Octicons";
import { Platform } from "react-native";
import { globalTheme } from "../../services/theme";
import { FocusBar } from "../../services/FocusBar";
import { mFmt } from "../../services/helper";
import { useStore } from "../../store/Store";

const Expense = () => {
  //var log = logger.createLogger();
  const [monList, setMonList] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclose();
  const { fetchExpAsync, selectedMon, setSelectedMon } = useStore(
    (state) => state
  );

  useEffect(() => {
    let monthArr = [];
    for (let i = 0; i <= 5; i++) {
      monthArr.push(moment().subtract(i, "month").format(mFmt));
    }
    setMonList(monthArr);
  }, []);

  useEffect(() => {
    fetchExpAsync();
  }, []);

  const topColor = useColorModeValue(
    globalTheme.light.secondary,
    globalTheme.dark.secondary
  );

  return (
    <Box flex={1}>
      <FocusBar topColor={topColor} />
      {Platform.OS === "ios" && <Box h="8" bg={topColor} />}
      <ScrollView h="100" w="100%" contentContainerStyle={{ flexGrow: 1 }}>
        <Box alignItems="flex-end" bg={topColor} pt="6" px="4" pb="2">
          <Pressable onPress={onOpen}>
            <Flex
              direction="row"
              align="center"
              bg="tertiary.600"
              px="3"
              py="1"
              borderRadius="full"
            >
              <Text color="white">
                {moment(selectedMon, mFmt).format("MMMM")}
              </Text>
              <Icon
                name="shopping-cart"
                as={<Octicons name="chevron-down" />}
                color="white"
                size={15}
                textAlign="center"
                ml="1"
              />
            </Flex>
          </Pressable>
          <Actionsheet isOpen={isOpen} onClose={onClose} disableOverlay={true}>
            <Actionsheet.Content>
              {monList &&
                monList.map((m, id) => (
                  <Actionsheet.Item
                    key={id}
                    onPress={() => {
                      setSelectedMon(m);
                      onClose();
                    }}
                  >
                    {moment(m, mFmt).format("MMMM")}
                  </Actionsheet.Item>
                ))}
            </Actionsheet.Content>
          </Actionsheet>
        </Box>
        <ExpenseList topColor={topColor} />
      </ScrollView>
    </Box>
  );
};
export default Expense;
