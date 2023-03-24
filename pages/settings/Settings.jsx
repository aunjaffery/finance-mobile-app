import {
  Box,
  Flex,
  Icon,
  Pressable,
  Switch,
  Text,
  useColorMode,
  useColorModeValue,
} from "native-base";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect } from "react";
import { FocusBar } from "../../services/FocusBar";
import { useStore } from "../../store/Store";
import { Platform } from "react-native";
import {
  export_database,
  import_database,
  showDox,
} from "../../services/database";

const Settings = ({ navigation }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { changeTheme } = useStore((state) => state);

  useEffect(() => {
    console.log(`Switching theme to ${colorMode} Mode!!!`);
    changeTheme(colorMode);
  }, [colorMode]);
  let iconBg = useColorModeValue("bg.200", "dark.200");
  let iconColor = useColorModeValue("black", "white");
  return (
    <Box>
      <FocusBar />
      <Box px="4" mt="4">
        <Flex
          direction="row"
          align="center"
          justify="space-between"
          mb={Platform.OS === "ios" ? 4 : 2}
          pl="2"
        >
          <Flex direction="row" align="center">
            <Box borderWidth={0} p="2" bg={iconBg} mr="2" borderRadius="md">
              <Icon
                name="dark_mode"
                as={<Ionicons name="moon" />}
                color={iconColor}
                size={15}
                textAlign="center"
              />
            </Box>
            <Text fontSize="sm">Dark Mode</Text>
          </Flex>
          <Switch
            colorScheme="emerald"
            onToggle={toggleColorMode}
            isChecked={colorMode === "dark" ? true : false}
            size={Platform.OS === "ios" ? "sm" : "md"}
          />
        </Flex>
        <Pressable
          p="2"
          mb="2"
          borderRadius="lg"
          _pressed={{
            bg: iconBg,
          }}
          onPress={() => navigation.push("Dummy")}
        >
          <Flex direction="row" align="center" justify="space-between">
            <Flex direction="row" align="center">
              <Box borderWidth={0} p="2" bg={iconBg} mr="2" borderRadius="md">
                <Icon
                  name="chatbox-ellipses-outline"
                  as={<Ionicons name="chatbox-ellipses-outline" />}
                  color={iconColor}
                  size={15}
                  textAlign="center"
                />
              </Box>
              <Text fontSize="sm">About me</Text>
            </Flex>
            <Icon
              name="chevron-forward"
              as={<Ionicons name="chevron-forward" />}
              color={iconColor}
              size={18}
              textAlign="center"
            />
          </Flex>
        </Pressable>
        <Pressable
          p="2"
          mb="2"
          borderRadius="lg"
          _pressed={{
            bg: iconBg,
          }}
          onPress={() => navigation.push("Terms")}
        >
          <Flex direction="row" align="center" justify="space-between">
            <Flex direction="row" align="center">
              <Box borderWidth={0} p="2" bg={iconBg} mr="2" borderRadius="md">
                <Icon
                  name="document-text-outline"
                  as={<Ionicons name="document-text-outline" />}
                  color={iconColor}
                  size={15}
                  textAlign="center"
                />
              </Box>
              <Text fontSize="sm">Terms of service</Text>
            </Flex>
            <Icon
              name="chevron-forward"
              as={<Ionicons name="chevron-forward" />}
              color={iconColor}
              size={18}
              textAlign="center"
            />
          </Flex>
        </Pressable>
        <Pressable
          p="2"
          mb="2"
          borderRadius="lg"
          _pressed={{
            bg: iconBg,
          }}
          onPress={import_database}
        >
          <Flex direction="row" align="center" justify="space-between">
            <Flex direction="row" align="center">
              <Box borderWidth={0} p="2" bg={iconBg} mr="2" borderRadius="md">
                <Icon
                  name="cloud-upload-outline"
                  as={<Ionicons name="cloud-upload-outline" />}
                  color={iconColor}
                  size={15}
                  textAlign="center"
                />
              </Box>
              <Text fontSize="sm">Import Database</Text>
            </Flex>
            <Icon
              name="chevron-forward"
              as={<Ionicons name="chevron-forward" />}
              color={iconColor}
              size={18}
              textAlign="center"
            />
          </Flex>
        </Pressable>
        <Pressable
          p="2"
          mb="2"
          borderRadius="lg"
          _pressed={{
            bg: iconBg,
          }}
          onPress={export_database}
        >
          <Flex direction="row" align="center" justify="space-between">
            <Flex direction="row" align="center">
              <Box borderWidth={0} p="2" bg={iconBg} mr="2" borderRadius="md">
                <Icon
                  name="cloud-upload-outline"
                  as={<Ionicons name="cloud-download-outline" />}
                  color={iconColor}
                  size={15}
                  textAlign="center"
                />
              </Box>
              <Text fontSize="sm">Export Database</Text>
            </Flex>
            <Icon
              name="chevron-forward"
              as={<Ionicons name="chevron-forward" />}
              color={iconColor}
              size={18}
              textAlign="center"
            />
          </Flex>
        </Pressable>
        <Pressable
          p="2"
          mb="2"
          borderRadius="lg"
          _pressed={{
            bg: iconBg,
          }}
          onPress={showDox}
        >
          <Flex direction="row" align="center" justify="space-between">
            <Flex direction="row" align="center">
              <Box borderWidth={0} p="2" bg={iconBg} mr="2" borderRadius="md">
                <Icon
                  name="cloud-upload-outline"
                  as={<Ionicons name="cloud-download-outline" />}
                  color={iconColor}
                  size={15}
                  textAlign="center"
                />
              </Box>
              <Text fontSize="sm">Show Dox</Text>
            </Flex>
            <Icon
              name="chevron-forward"
              as={<Ionicons name="chevron-forward" />}
              color={iconColor}
              size={18}
              textAlign="center"
            />
          </Flex>
        </Pressable>
      </Box>
    </Box>
  );
};

export default Settings;
