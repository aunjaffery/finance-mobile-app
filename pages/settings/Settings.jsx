import { Box, Flex, Switch, Text, useColorMode } from "native-base";
import { useEffect } from "react";
import { expByDay } from "../../services/database";
import { useStore } from "../../store/Store";
import { logger } from "react-native-logs";

const Settings = () => {
  var log = logger.createLogger();
  const { colorMode, toggleColorMode } = useColorMode();
  const { changeTheme } = useStore((state) => state);

  useEffect(() => {
    console.log(`Switching theme to ${colorMode} Mode!!!`);
    changeTheme(colorMode);
    fn();
  }, [colorMode]);

  const fn = async () => {
    let data = {
      start: "2023-02-01 00:00:00",
      end: "2023-03-30 00:00:00",
    };
    try {
      let rsp = await expByDay(data);
      log.info(rsp);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box>
      <Box px="4">
        <Flex direction="row" align="center" justify="space-between">
          <Text>Dark Mode</Text>
          <Switch
            colorScheme="emerald"
            onToggle={toggleColorMode}
            isChecked={colorMode === "dark" ? true : false}
          />
        </Flex>
      </Box>
    </Box>
  );
};

export default Settings;
