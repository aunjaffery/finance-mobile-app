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
import { useDispatch } from "react-redux";
import { fetchExpAsync } from "../../store/expense.slice";
import ExpenseList from "./ExpenseList";
import Octicons from "@expo/vector-icons/Octicons";
import { Platform } from "react-native";
import { globalTheme } from "../../services/theme";
import { FocusBar } from "../../services/FocusBar";

const Expense = () => {
  //var log = logger.createLogger();
  const dispatch = useDispatch();
  const mFormat = "MMM-YYYY";
  const [selectedMon, setSelectedMon] = useState(moment().format(mFormat));
  const [monList, setMonList] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclose();

  useEffect(() => {
    let monthArr = [];
    for (let i = 0; i <= 3; i++) {
      monthArr.push(moment().subtract(i, "month").format(mFormat));
    }
    setMonList(monthArr);
  }, []);

  useEffect(() => {
    console.log("useEffect Fetching expense -->");
    let f = "HH:mm DD-MMM-YYYY";
    let start = moment(`00:00 01-${selectedMon}`, f).toISOString(true);
    let end = moment(`00:00 01-${selectedMon}`, f)
      .add(1, "month")
      .toISOString(true);
    dispatch(fetchExpAsync({ start, end }));
  }, [selectedMon]);

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
                {moment(selectedMon, mFormat).format("MMMM")}
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
                    {moment(m, mFormat).format("MMMM")}
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
