import React from "react";
import {
  Box,
  Flex,
  Heading,
  Button,
  Text,
  useColorModeValue,
  VStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
} from "@chakra-ui/react";
import { FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const cities = [
  { name: "Bangalore", value: "bangalore" },
  // Add more cities here in the future
];

export default function Home() {
  const navigate = useNavigate();

  const textColor = useColorModeValue("white", "whiteAlpha.900");

  const [selectedCity, setSelectedCity] = React.useState("bangalore");

  return (
    <Box
      minHeight="100vh"
      color={textColor}
      px={6}
      py={12}
      textAlign="center"
    >
      <VStack spacing={8}>
        <Heading as="h1" size="2xl" fontWeight="bold" textShadow="2px 2px #000000">
          Welcome to Metro Planner
        </Heading>
        <Text fontSize="lg" fontWeight="medium" maxWidth="600px">
          Plan your metro journeys with ease. Currently servicing the city of Bangalore.
        </Text>
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<FaChevronDown />}
            bg="gray.100"
            color="black"
            size="lg"
          >
            {selectedCity ? selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1) : "Select City"}
          </MenuButton>
          <MenuList
            maxH="400px"
            overflowY="auto"
            zIndex="popover"
            bg={useColorModeValue("white", "gray.800")}
            color={useColorModeValue("black", "white")}
          >
            <MenuGroup title="Available Cities">
              {cities.map((city) => (
                <MenuItem key={city.value} onClick={() => setSelectedCity(city.value)}>
                  {city.name}
                </MenuItem>
              ))}
            </MenuGroup>
          </MenuList>
        </Menu>
        <Flex justify="center" gap={6} wrap="wrap">
          <Button
            bg="teal.400"
            color="white"
            size="lg"
            borderRadius="full"
            boxShadow="lg"
            _hover={{ bg: "teal.500", color: "white" }}
            onClick={() => navigate(`/${selectedCity}/stations`)}
          >
            View Stations
          </Button>
          <Button
            bg="orange.400"
            color="white"
            size="lg"
            borderRadius="full"
            boxShadow="lg"
            _hover={{ bg: "orange.500", color: "white" }}
            onClick={() => navigate(`/${selectedCity}/route`)}
          >
            Plan a Route
          </Button>
        </Flex>
        <Text fontSize="md" mt={8} fontStyle="italic" fontWeight="light">
          More cities coming soon!
        </Text>
      </VStack>
    </Box>
  );
}
