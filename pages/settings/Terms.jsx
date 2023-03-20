import { Box, ScrollView, Text } from "native-base";
import { Platform } from "react-native";
const Terms = () => {
  let size = Platform.OS === "ios" ? "md" : "sm";
  return (
    <Box mt="6" px="6">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box mb="6">
          <Text fontSize={size} color="gray.500">
            Permission is hereby granted, free of charge, to any person
            obtaining a copy of this software and associated documentation files
            (the "Software"), to deal in the Software without restriction,
            including without limitation the rights to use, copy, modify, merge,
            publish, distribute, sublicense, and/or sell copies of the Software,
            and to permit persons to whom the Software is furnished to do so,
            subject to the following conditions:
          </Text>
          <Text mt="4" fontSize={size} color="gray.500">
            The above copyright notice and this permission notice shall be
            included in all copies or substantial portions of the Software.
          </Text>
          <Text mt="4" fontSize={size} color="gray.500">
            THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
            EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
            MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
            NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
            BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
            ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
            CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
            SOFTWARE.
          </Text>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default Terms;
