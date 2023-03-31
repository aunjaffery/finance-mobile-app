import {
  Actionsheet,
  Box,
  Flex,
  Pressable,
  ScrollView,
  Spinner,
  Text,
  Icon,
  useColorModeValue,
  useDisclose,
  useToast,
} from "native-base";
import moment from "moment";
import Octicons from "@expo/vector-icons/Octicons";
import { useEffect, useState } from "react";
import {
  formatCash,
  ListMonths,
  mFmt,
  randomColors,
} from "../../services/helper";
import { useStore } from "../../store/Store";
import { useIsFocused } from "@react-navigation/native";

const CatGraph = () => {
  const isFocus = useIsFocused();
  const toast = useToast();
  const [monList, setMonList] = useState(null);
  const [selectedMon, setSelectedMon] = useState(moment().format(mFmt));
  const { isOpen, onOpen, onClose } = useDisclose();
  const { catGraph, catLoading, getExpByCat } = useStore((state) => state);

  useEffect(() => {
    setMonList(ListMonths());
  }, []);

  useEffect(() => {
    if (isFocus) {
      callCatGraph();
    }
  }, [selectedMon, isFocus]);

  const callCatGraph = async () => {
    try {
      await getExpByCat(selectedMon);
    } catch (error) {
      console.log("In cat error", error);
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
  const LoadingComp = () => {
    return (
      <Flex justify="center" align="center" mt="1">
        <Spinner color="indigo.500" />
      </Flex>
    );
  };
  const secTextColor = useColorModeValue("gray.500", "gray.400");
  const priTextColor = useColorModeValue("gray.600", "gray.300");
  let tagBg = useColorModeValue("bg.200", "dark.200");
  const EmptyComp = () => {
    return (
      <Flex justify="center" align="center" mt="1">
        <Text color={secTextColor}>No Expenses Found</Text>
      </Flex>
    );
  };
  return (
    <Box>
      <Flex mb="3" pl="4">
        <Pressable onPress={onOpen} alignSelf="flex-start">
          <Flex direction="row" align="center">
            <Text color={priTextColor}>
              Expenses for {moment(selectedMon, mFmt).format("MMMM")}
            </Text>
            <Icon
              name="shopping-cart"
              as={<Octicons name="chevron-down" />}
              size={15}
              textAlign="center"
              ml="1"
            />
          </Flex>
        </Pressable>
      </Flex>
      {catLoading ? (
        <LoadingComp />
      ) : !catGraph || !catGraph.length ? (
        <EmptyComp />
      ) : (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <Flex
            borderWidth={0}
            alignSelf="flex-start"
            direction="row"
            wrap="wrap"
            pl="4"
          >
            {catGraph &&
              catGraph.map((c, index) => (
                <Flex
                  direction="row"
                  key={c.id}
                  align="center"
                  bg={tagBg}
                  borderRadius="full"
                  pr="3"
                  pl="1"
                  py="1"
                  shadow="3"
                  mr="2"
                >
                  <Box px="2">
                    <Box
                      w="2"
                      h="2"
                      bg={randomColors[index % randomColors.length]}
                      borderRadius="full"
                    />
                  </Box>
                  <Flex>
                    <Text color={priTextColor} fontSize="sm">
                      {c.title}
                    </Text>
                  </Flex>
                  <Flex justify="flex-end" ml="2">
                    <Text textAlign="right" fontWeight="semibold" fontSize="xs">
                      {formatCash(c.sum)}
                    </Text>
                  </Flex>
                </Flex>
              ))}
          </Flex>
        </ScrollView>
      )}
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
  );
};

export default CatGraph;
