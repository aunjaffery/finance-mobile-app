import moment from "moment";
import {
  Box,
  Button,
  Flex,
  Input,
  KeyboardAvoidingView,
  ScrollView,
  Select,
  Text,
  TextArea,
  useColorModeValue,
  useToast,
} from "native-base";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Platform, TouchableOpacity } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import { FocusBar } from "../../services/FocusBar";
import { dFmt, dtFmt, tFmt } from "../../services/helper";
import { useStore } from "../../store/Store";

const options = [
  { value: "Daily Essentials", label: "Daily Essentials" },
  { value: "Donation", label: "Donation" },
  { value: "Fee", label: "Fee" },
  { value: "Food", label: "Food" },
  { value: "Groceries", label: "Groceries" },
  { value: "Investment", label: "Investment" },
  { value: "Medicine", label: "Medicine" },
  { value: "Shopping", label: "Shopping" },
  { value: "Self Care", label: "Self Care" },
  { value: "Stationery", label: "Stationery" },
  { value: "Traveling", label: "Traveling" },
  { value: "Utility Bills", label: "Utility Bills" },
  { value: "Vehicle Expense", label: "Vehicle Expense" },
  { value: "Other", label: "Other" },
];

const AddExpense = ({ navigation }) => {
  const { addExpAsync, addLoading } = useStore((state) => state);
  const toast = useToast();
  const headHeight = useHeaderHeight();

  const [timeDate, setTimeDate] = useState(moment().format(dtFmt));
  const [showDateTime, setShowDateTime] = useState(false);
  const [mode, setMode] = useState("date");

  const dateTimeVis = (mode) => {
    setMode(mode);
    setShowDateTime(true);
  };

  const handleDateTime = (dt) => {
    if (mode === "date") {
      const formatDate = moment(dt).format(dFmt);
      const orgTime = moment(timeDate, dtFmt).format(tFmt);
      const fullDate = moment(`${formatDate} ${orgTime}`, dtFmt).format(dtFmt);
      setTimeDate(fullDate);
    }
    if (mode === "time") {
      const formatTime = moment(dt).format(tFmt);
      const orgDate = moment(timeDate, dtFmt).format(dFmt);
      const fullDate = moment(`${orgDate} ${formatTime}`, dtFmt).format(dtFmt);
      setTimeDate(fullDate);
    }
    setShowDateTime(false);
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      title: "",
      amount: "",
      shop: "",
      description: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      data.date = timeDate;
      //data.title = null;
      await addExpAsync(data);
      reset();
      navigation.navigate("Home");
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

  const labelColor = useColorModeValue("coolGray.800", "coolGray.100");
  const borderColor = useColorModeValue("gray.400", "gray.400");
  const inputBg = useColorModeValue("bg.200", "dark.400");
  const inputTextColor = useColorModeValue("black", "white");
  const iRef = useRef([]);

  return (
    <Box flex={1} px={4}>
      <FocusBar />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={headHeight}
      >
        <ScrollView h="full" w="full" keyboardShouldPersistTaps="handled">
          <Box mx={4} py={4}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                flexGrow: 1,
                width: "100%",
              }}
            >
              <Box mb={4} w="100%">
                <Text color={labelColor} mb={2} fontSize="sm">
                  Title
                </Text>
                <Controller
                  control={control}
                  name="title"
                  render={({ field: { onChange, value, onBlur } }) => (
                    <Select
                      accessibilityLabel="Choose title"
                      placeholder="Choose title"
                      selectedValue={value}
                      onBlur={onBlur}
                      bg={inputBg}
                      borderColor="red.400"
                      borderWidth={errors?.title ? 1 : 0}
                      size="lg"
                      color={inputTextColor}
                      placeholderTextColor="gray.500"
                      onValueChange={(value) => onChange(value)}
                      mt="1"
                      _selectedItem={{
                        bg: "indigo.400",
                        borderRadius: "md",
                      }}
                    >
                      {options.map((o, id) => (
                        <Select.Item label={o.label} value={o.value} key={id} />
                      ))}
                    </Select>
                  )}
                  rules={{
                    required: {
                      value: true,
                      message: "Title is required!",
                    },
                  }}
                />
              </Box>
            </ScrollView>
            <Box mb={4}>
              <Text color={labelColor} mb={2} fontSize="sm">
                Amount
              </Text>
              <Controller
                control={control}
                name="amount"
                render={({ field: { onChange, value, onBlur } }) => (
                  <Input
                    placeholder="Enter amount"
                    value={value}
                    keyboardType="numeric"
                    returnKeyType="done"
                    ref={(ref) => (iRef.current[1] = ref)}
                    onSubmitEditing={() => iRef.current[2].focus()}
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                    borderColor="red.400"
                    borderWidth={errors?.amount ? 1 : 0}
                    size="lg"
                    step="0.01"
                    min={1}
                    bg={inputBg}
                    placeholderTextColor="gray.500"
                    color={inputTextColor}
                    _focus={{
                      borderWidth: 1,
                      bg: inputBg,
                      borderColor,
                      selectionColor: inputTextColor,
                    }}
                  />
                )}
                rules={{
                  required: {
                    value: true,
                    message: "Amount is required!",
                  },
                  min: 1,
                  pattern: /^\d{0,8}(\.\d{1,2})?$/,
                }}
              />
            </Box>
            <Box mb={4}>
              <Text color={labelColor} mb={2} fontSize="sm">
                Shop / Location
              </Text>
              <Controller
                control={control}
                name="shop"
                render={({ field: { onChange, value, onBlur } }) => (
                  <Input
                    placeholder="Enter Shop (Optional)"
                    value={value}
                    onBlur={onBlur}
                    ref={(ref) => (iRef.current[2] = ref)}
                    returnKeyType="next"
                    onChangeText={(value) => onChange(value)}
                    borderWidth={0}
                    size="lg"
                    bg={inputBg}
                    placeholderTextColor="gray.500"
                    color={inputTextColor}
                    _focus={{
                      borderWidth: 1,
                      bg: inputBg,
                      borderColor,
                      selectionColor: inputTextColor,
                    }}
                  />
                )}
              />
            </Box>
            <Box mb={4}>
              <Flex direction="row" justify="flex-start">
                <Box flex={1} mr="2">
                  <Text color={labelColor} mb={2} fontSize="sm">
                    Date
                  </Text>
                  <TouchableOpacity onPress={() => dateTimeVis("date")}>
                    <Box py="2" px="4" bg={inputBg} borderRadius="md">
                      <Text color={inputTextColor} fontSize="md">
                        {moment(timeDate, dtFmt).format("DD MMM YYYY")}
                      </Text>
                    </Box>
                  </TouchableOpacity>
                </Box>
                <Box flex={1} ml="2">
                  <Text color={labelColor} mb={2} fontSize="sm">
                    Time
                  </Text>
                  <TouchableOpacity onPress={() => dateTimeVis("time")}>
                    <Box py="2" px="4" bg={inputBg} borderRadius="md">
                      <Text color={inputTextColor} fontSize="md">
                        {moment(timeDate, dtFmt).format("hh:mmA")}
                      </Text>
                    </Box>
                  </TouchableOpacity>
                </Box>
              </Flex>
            </Box>
            <Box mb={4}>
              <Text color={labelColor} mb={2} fontSize="sm">
                Description
              </Text>
              <Controller
                control={control}
                name="description"
                render={({ field: { onChange, value, onBlur } }) => (
                  <TextArea
                    placeholder="Enter description"
                    value={value}
                    onBlur={onBlur}
                    returnKeyType="done"
                    multiline={false}
                    onChangeText={(value) => onChange(value)}
                    borderColor="red.400"
                    borderWidth={errors?.description ? 1 : 0}
                    size="lg"
                    bg={inputBg}
                    placeholderTextColor="gray.500"
                    color={inputTextColor}
                    _focus={{
                      borderWidth: 1,
                      bg: inputBg,
                      borderColor,
                      selectionColor: inputTextColor,
                    }}
                  />
                )}
                rules={{
                  required: {
                    value: true,
                    message: "Description is required!",
                  },
                }}
              />
            </Box>
            <Box mt="5">
              <Button
                onPress={handleSubmit(onSubmit)}
                colorScheme="green"
                _text={{ fontWeight: "bold" }}
                isLoading={addLoading}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </ScrollView>
      </KeyboardAvoidingView>
      <DateTimePickerModal
        isVisible={showDateTime}
        mode={mode}
        onConfirm={handleDateTime}
        onCancel={() => setShowDateTime(false)}
        maximumDate={moment().toDate()}
        minimumDate={moment().subtract(6, "months").toDate()}
      />
    </Box>
  );
};

export default AddExpense;
