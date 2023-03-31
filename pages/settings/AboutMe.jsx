import {
  Box,
  Flex,
  Icon,
  ScrollView,
  Text,
  useColorModeValue,
} from "native-base";
import Feather from "@expo/vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";
const AboutMe = () => {
  let iconSize = 22;
  const iconMargin = 4;
  const secTextColor = useColorModeValue("gray.500", "gray.400");
  const iconColor = useColorModeValue("indigo.400", "indigo.400");

  return (
    <Box mt="6" px="6">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Flex justify="center" align="flex-start">
          <Text fontSize="3xl" fontWeight="semibold">
            Aun Jaffery
          </Text>
          <Text fontSize="sm" color={secTextColor}>
            software developer, Pakistan
          </Text>
        </Flex>
        <Flex mt="6" align="flex-start" ml="2">
          <Flex direction="row" align="center">
            <Icon
              name="mail"
              as={<Feather name="mail" />}
              color={iconColor}
              size={iconSize}
              textAlign="center"
            />
            <Text ml={iconMargin}>AunJafery@gmail.com</Text>
          </Flex>
          <Flex direction="row" align="center" mt="4">
            <Icon
              name="github"
              as={<Feather name="github" />}
              color={iconColor}
              size={iconSize}
              textAlign="center"
            />
            <Text ml={iconMargin}>github.com/aunjaffery</Text>
          </Flex>
          <Flex direction="row" align="center" mt="4">
            <Icon
              name="gitlab"
              as={<Feather name="gitlab" />}
              color={iconColor}
              size={iconSize}
              textAlign="center"
            />
            <Text ml={iconMargin}>gitlab.com/aunox</Text>
          </Flex>
          <Flex direction="row" align="center" mt="4">
            <Icon
              name="gitlab"
              as={<Entypo name="linkedin" />}
              color={iconColor}
              size={iconSize}
              textAlign="center"
            />
            <Text ml={iconMargin}>linkedin.com/in/aunjaffery</Text>
          </Flex>
        </Flex>
      </ScrollView>
    </Box>
  );
};

export default AboutMe;
