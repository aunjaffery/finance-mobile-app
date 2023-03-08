import moment from "moment";
import { Box, Flex, Modal, Text, useColorModeValue } from "native-base";

export const ExpenseDetail = ({ isOpen, onClose, exp }) => {
  const borderColor = useColorModeValue("muted.200", "muted.700");
  const secTextColor = useColorModeValue("gray.500", "gray.400");
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      animationPreset="slide"
      size="full"
      _backdrop={{ bg: "none" }}
    >
      <Modal.Content
        mb={0}
        mt="auto"
        bg={useColorModeValue("white", "dark.200")}
        borderTopRadius={24}
        borderColor="gray.200"
        borderWidth={useColorModeValue(1, 0)}
        borderBottomWidth={0}
      >
        <Modal.CloseButton />
        <Modal.Body>
          <Box pt="2" mx="2" pb="6">
            <Flex flex={1} direction="row" justify="center" mb="2">
              <Box bg="indigo.400" borderRadius="full" px="5" py="1">
                <Text
                  fontSize="md"
                  textAlign="center"
                  color="white"
                  fontWeight="bold"
                >
                  {exp.title}
                </Text>
              </Box>
            </Flex>
            <Flex
              direction="row"
              align="center"
              justify="center"
              mt="1"
              borderBottomWidth={1}
              borderColor={borderColor}
            >
              <Flex flex={1}>
                <Text fontSize="md">Expense</Text>
              </Flex>
              <Flex flex={2} align="flex-end">
                <Text fontSize="xl" fontWeight="bold" noOfLines={1}>
                  Rs{" "}
                  {exp.amount &&
                    exp.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </Text>
              </Flex>
            </Flex>
            <Flex
              direction="row"
              align="center"
              justify="center"
              mt="2"
              borderBottomWidth={1}
              borderColor={borderColor}
            >
              <Flex flex={1}>
                <Text fontSize="md">Date</Text>
              </Flex>
              <Flex flex={2} align="flex-end">
                <Text fontSize="sm" textAlign="center" color={secTextColor}>
                  {moment(exp.date).format("hA ddd, Do MMM YY")}
                </Text>
              </Flex>
            </Flex>
            <Flex
              direction="row"
              align="center"
              justify="center"
              mt="2"
              borderBottomWidth={1}
              borderColor={borderColor}
            >
              <Flex flex={1}>
                <Text fontSize="md">Shop</Text>
              </Flex>
              <Flex flex={2} align="flex-end">
                <Text fontSize="md" textAlign="center" color={secTextColor}>
                  {exp.shop ? exp.shop : "Unknown"}
                </Text>
              </Flex>
            </Flex>
            <Flex direction="row" justify="flex-start" mt="2">
              <Flex flex={1}>
                <Text fontSize="md">Description</Text>
              </Flex>
              <Flex
                flex={2}
                borderColor="red.300"
                borderWidth={0}
                align="flex-end"
              >
                <Text fontSize="sm" color={secTextColor}>
                  {exp.description}
                </Text>
              </Flex>
            </Flex>
          </Box>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};
