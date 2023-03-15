import { Box, Flex, Switch, Text, useColorMode } from "native-base";
import { useEffect } from "react";
import { useStore } from "../../store/Store";

const Settings = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { changeTheme } = useStore((state) => state);

  useEffect(() => {
    console.log(`Switching theme to ${colorMode} Mode!!!`);
    changeTheme(colorMode);
  }, [colorMode]);

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
