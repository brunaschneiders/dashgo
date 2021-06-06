import { Flex, Text, Box, Avatar } from "@chakra-ui/react";

export function Profile() {
  return (
    <Flex align="center">
      <Box mr="4" textAlign="right">
        <Text>Bruna Schneiders</Text>
        <Text color="gray.300" fontSize="small">
          bruna.schneiders@gmail.com
        </Text>
      </Box>

      <Avatar size="md" name="Bruna Schneiders" />
    </Flex>
  );
}