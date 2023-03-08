
          <Box py="6">
            <Box>
              <Text fontSize="3xl" fontWeight="bold" textAlign="center">
                Rs {exp.amount}
              </Text>
            </Box>
            <Flex direction="row" justify="center" my="2">
              <Box bg="purple.400" borderRadius="full" px="6" py="1">
                <Text
                  fontSize="sm"
                  textAlign="center"
                  color="white"
                  fontWeight="bold"
                >
                  {exp.title}
                </Text>
              </Box>
            </Flex>
            <Box>
              <Text fontSize="md" textAlign="center" color="gray.400">
                {moment(exp.date).format("hA ddd, Do MMM YY")}
              </Text>
            </Box>
            {exp?.shop && (
              <Box>
                <Text textAlign="center" fontSize="lg">Shop: {exp.shop}</Text>
              </Box>
            )}
            <Box>
              <Text textAlign="center">{exp.description}</Text>
            </Box>
          </Box>
