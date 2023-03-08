import { Box, Flex, Switch, Text, useColorMode } from "native-base";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeTheme } from "../../store/system.silce";

const Settings = () => {
  const dispatch = useDispatch();
  const { colorMode, toggleColorMode } = useColorMode();

  console.log(`Switching theme to ${colorMode} Mode!!!`);
  useEffect(() => {
    dispatch(changeTheme(colorMode));
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
