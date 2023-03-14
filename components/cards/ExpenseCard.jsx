import moment from "moment";
import {
  Box,
  Flex,
  Icon,
  Pressable,
  Text,
  useColorModeValue,
  useDisclose,
  useToast,
} from "native-base";
import Feather from "@expo/vector-icons/Feather";
import { Swipeable } from "react-native-gesture-handler";
import { ExpIconDynamic } from "../../icons/ExpIconDynamic2";
import { ExpenseDetail } from "../modals/ExpenseDetail";
import { useDispatch } from "react-redux";
import { delExpAsync } from "../../store/expense.slice";
import { globalTheme } from "../../services/theme";
import { formatCash } from "../../services/helper";

const ExpenseCard = ({ exp }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const { isOpen, onClose, onOpen } = useDisclose();
  const handleDelete = async () => {
    console.log(exp.id);
    try {
      if (!exp.id) {
        //toast
      }
      await dispatch(delExpAsync(exp.id)).unwrap();
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
      console.log("Unwrap Del error ->", error);
    }
  };
  const cardBg = useColorModeValue(
    globalTheme.light.primary,
    globalTheme.dark.primary
  );
  const secTextColor = useColorModeValue("gray.500", "gray.400");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const amountColor = useColorModeValue("red.400", "red.400");
  return (
    <Box borderWidth={0} mb="4" px="4">
      <Swipeable renderRightActions={() => RightAction(handleDelete)}>
        <Pressable onPress={onOpen}>
          {({ isPressed }) => (
            <Box bg={cardBg} opacity={isPressed ? 0.5 : 1}>
              <Flex flexDir="row">
                <Box
                  bg={useColorModeValue("bg.200", "dark.200")}
                  p={2}
                  borderRadius="xl"
                >
                  <ExpIconDynamic title={exp.title} />
                </Box>
                <Flex
                  flex={1}
                  flexDir="row"
                  justify="space-between"
                  ml="3"
                  mr="2"
                  borderBottomWidth={1}
                  borderColor={borderColor}
                >
                  <Flex flex={3}>
                    <Text
                      fontWeight="semibold"
                      fontSize="md"
                      isTruncated
                      maxW="100%"
                    >
                      {exp.title}
                    </Text>
                    <Text
                      color={secTextColor}
                      fontSize="sm"
                      isTruncated
                      maxW="100%"
                    >
                      {exp.description}
                    </Text>
                  </Flex>
                  <Flex flex={1} align="flex-end">
                    <Text
                      color={amountColor}
                      fontSize="md"
                      fontWeight="semibold"
                    >
                      {formatCash(exp.amount)}
                    </Text>
                    <Text color={secTextColor} fontSize="xs">
                      {moment(exp.date).format("hh:mmA")}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            </Box>
          )}
        </Pressable>
      </Swipeable>
      <ExpenseDetail isOpen={isOpen} onClose={onClose} exp={exp} />
    </Box>
  );
};

const RightAction = (handleDelete) => {
  return (
    <Box>
      <Pressable flex={1} onPress={() => handleDelete()}>
        <Flex flex={1} px="4" justify="center" bg="danger.500">
          <Icon
            name="shopping-cart"
            as={<Feather name="trash" />}
            color="white"
            size={18}
            textAlign="center"
          />
        </Flex>
      </Pressable>
    </Box>
  );
};

export default ExpenseCard;
