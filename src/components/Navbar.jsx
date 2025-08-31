import { Box, Flex, Heading, IconButton, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { FiMap, FiSun, FiMoon } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();

  const bg = useColorModeValue("blue.500", "gray.800");
  const textColor = useColorModeValue("white", "whiteAlpha.900");
  const iconColor = useColorModeValue("white", "whiteAlpha.900");

  return (
    <Box bg={bg} px={6} py={4} shadow="md">
      <Flex align="center" justify="space-between">
        <Flex align="center">
          <IconButton
            icon={<FiMap />}
            aria-label="App Icon"
            variant="ghost"
            color={iconColor}
            fontSize="2xl"
            mr={3}
            onClick={() => navigate("/")}
          />
          <Heading size="md" color={textColor}>
            Metro Planner
          </Heading>
        </Flex>

        <IconButton
          icon={colorMode === "light" ? <FiMoon /> : <FiSun />}
          aria-label="Toggle Dark Mode"
          onClick={toggleColorMode}
          variant="ghost"
          color={iconColor}
          fontSize="xl"
        />
      </Flex>
    </Box>
  );
}
