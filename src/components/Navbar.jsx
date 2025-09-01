// Navbar.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  IconButton,
  useColorMode,
  useColorModeValue,
  Button,
  VStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  PopoverHeader,
  PopoverCloseButton,
  useDisclosure,
  HStack,
  Text,
} from "@chakra-ui/react";
import { FiMap, FiSun, FiMoon, FiChevronDown, FiChevronLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const cities = [
  {
    name: "Bangalore",
    routes: [
      { label: "Stations", path: "/Bangalore/stations" },
      { label: "Route Planner", path: "/Bangalore/route" },
    ],
  }
];

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const bg = useColorModeValue("blue.500", "gray.800");
  const textColor = useColorModeValue("white", "whiteAlpha.900");
  const iconColor = useColorModeValue("white", "whiteAlpha.900");

  // Popover open state
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Panel state inside popover: 'cities' | 'routes'
  const [panel, setPanel] = useState("cities");
  const [selectedCity, setSelectedCity] = useState(cities[0]);

  useEffect(() => {
    if (!isOpen) {
      setPanel("cities");
    }
  }, [isOpen]);

  // When user picks a city, show its routes inside the popover
  const openCity = (city) => {
    setSelectedCity(city);
    setPanel("routes");
  };

  const handleRouteClick = (path) => {
    onClose();          // close popover
    navigate(path);     // navigate to route
  };

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

          {/* Popover-based Cities dropdown (click to open) */}
          <Popover
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            placement="bottom-start"
            closeOnBlur={true}   // ensures click outside closes it
            isLazy
          >
            <PopoverTrigger>
              <Button
                onClick={isOpen ? onClose : onOpen}   // toggle manually
                rightIcon={<FiChevronDown />}
                colorScheme="blue"
              >
                {selectedCity?.name ?? "Select city"}
              </Button>
            </PopoverTrigger>

            <PopoverContent minW="220px" _focus={{ boxShadow: "none" }} pt={8}>
              {/* Add pt={8} to push content down so the X button has room */}
              <PopoverArrow />
              <PopoverCloseButton zIndex="1" /> {/* ensures it's above content */}

              <PopoverBody p={2}>
                {panel === "cities" ? (
                  <VStack align="stretch" spacing={1}>
                    {cities.map((city) => (
                      <Button
                        key={city.name}
                        variant="ghost"
                        justifyContent="flex-start"
                        onClick={() => openCity(city)}
                      >
                        {city.name}
                      </Button>
                    ))}
                  </VStack>
                ) : (
                  <Box>
                    <HStack justify="space-between" align="center" mb={2}>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setPanel("cities")}
                        leftIcon={<FiChevronLeft />}
                      >
                        Back
                      </Button>
                      <Text fontWeight="semibold">{selectedCity.name}</Text>
                      <Box w="40px" /> {/* spacer for symmetry */}
                    </HStack>

                    <VStack align="stretch" spacing={1}>
                      {selectedCity.routes.map((route) => (
                        <Button
                          key={route.path}
                          variant="ghost"
                          justifyContent="flex-start"
                          onClick={() => handleRouteClick(route.path)}
                        >
                          {route.label}
                        </Button>
                      ))}
                    </VStack>
                  </Box>
                )}
              </PopoverBody>
            </PopoverContent>
          </Popover>
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
