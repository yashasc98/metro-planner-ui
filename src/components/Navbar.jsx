import { Box, Flex, Heading, IconButton, useColorMode, useColorModeValue, Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { FiMap, FiSun, FiMoon, FiChevronDown } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import React from "react";

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();

  const bg = useColorModeValue("blue.500", "gray.800");
  const textColor = useColorModeValue("white", "whiteAlpha.900");
  const iconColor = useColorModeValue("white", "whiteAlpha.900");

  return (
    <Box bg={bg} px={6} py={4} shadow="md" zIndex="1000" position="relative">
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
          <Heading size="md" color={textColor} mr={6}>
            Metro Planner
          </Heading>

          <Menu>
            <MenuButton as={Button} rightIcon={<FiChevronDown />} colorScheme="blue">
              Cities
            </MenuButton>
            <MenuList>
              <MenuItem>
                <Flex direction="column">
                  <Button
                    variant="ghost"
                    justifyContent="flex-start"
                    onClick={() => navigate("/bangalore/stations")}
                  >
                    Bangalore - Stations
                  </Button>
                  <Button
                    variant="ghost"
                    justifyContent="flex-start"
                    onClick={() => navigate("/bangalore/route")}
                  >
                    Bangalore - Route
                  </Button>
                </Flex>
              </MenuItem>
            </MenuList>
          </Menu>
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
