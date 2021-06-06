import { Flex, Text, Box, Avatar } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Bruna Schneiders</Text>
          <Text color="gray.300" fontSize="small">
            bruna.schneiders@gmail.com
          </Text>
        </Box>
      )}

      <Avatar size="md" name="Bruna Schneiders" />
    </Flex>
  );
}
