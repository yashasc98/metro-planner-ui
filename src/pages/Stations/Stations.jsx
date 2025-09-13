import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchStations } from "../../redux/features/stationsSlice";
import {
    Box,
    Heading,
    Text,
    Spinner,
    Alert,
    AlertIcon,
    SimpleGrid,
    Card,
    CardHeader,
    CardBody,
    Input,
    InputGroup,
    InputLeftElement,
    Badge,
    useColorModeValue,
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import StationsMap from "../../components/StationsMap";

export default function Stations() {
    const { city } = useParams();
    const dispatch = useDispatch();
    const { items: stations, loading, error } = useSelector((state) => state.stations);
    const [searchTerm, setSearchTerm] = useState("");

    const lineColors = {
        purple: { light: "purple.100", dark: "purple.700" },
        green: { light: "green.100", dark: "green.700" },
        blue: { light: "blue.100", dark: "blue.700" },
        red: { light: "red.100", dark: "red.700" },
        yellow: { light: "yellow.100", dark: "yellow.500" },
        pink: { light: "pink.100", dark: "pink.600" },
        orange: { light: "orange.100", dark: "orange.600" },
    };

    const inputBg = useColorModeValue("white", "gray.700");
    const textColor = useColorModeValue("gray.800", "whiteAlpha.900");

    useEffect(() => {
        if (city) {
            dispatch(fetchStations(city));
        }
    }, [city, dispatch]);

    // Filter stations based on search term
    const filteredStations = useMemo(() => {
        return stations.filter((station) =>
            station.name?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [stations, searchTerm]);

    if (loading) {
        return (
            <Box textAlign="center" mt={16}>
                <Spinner size="xl" thickness="4px" color="blue.500" />
            </Box>
        );
    }

    if (error) {
        return (
            <Alert status="error" mt={8} borderRadius="md">
                <AlertIcon />
                {error}
            </Alert>
        );
    }

    return (
        <Box p={{ base: 4, md: 8 }} minH="100vh">
            <Heading
                mb={6}
                textTransform="capitalize"
                textAlign="center"
                fontSize={{ base: "2xl", md: "3xl" }}
                color={textColor}
            >
                Metro Stations in {city}
            </Heading>

            {filteredStations.length > 0 && (
                <Box mb={6} borderRadius="md" overflow="hidden">
                    <StationsMap stations={filteredStations} />
                </Box>
            )}

            <InputGroup mb={6} maxW="400px" mx="auto">
                <InputLeftElement pointerEvents="none" children={<FiSearch color="gray" />} />
                <Input
                    placeholder="Search stations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    bg={inputBg}
                    shadow="sm"
                    color={textColor}
                />
            </InputGroup>

            {filteredStations.length === 0 ? (
                <Text textAlign="center" mt={8} fontSize="lg" color={textColor}>
                    No stations found for "{searchTerm || city}".
                </Text>
            ) : (
                <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
                    {filteredStations.map((station) => (
                        <Card
                            key={station.id}
                            borderWidth="1px"
                            shadow="md"
                            bg={useColorModeValue(
                                lineColors[station.line]?.light || "gray.100",
                                lineColors[station.line]?.dark || "gray.700"
                            )}
                            _hover={{
                                transform: "scale(1.05)",
                                transition: "0.3s",
                                shadow: useColorModeValue("lg", "dark-lg"),
                            }}
                            borderRadius="md"
                            overflow="hidden"
                        >
                            <CardHeader pb={2}>
                                <Heading size="md" color={textColor}>
                                    {station.name}
                                </Heading>
                            </CardHeader>
                            <CardBody pt={0}>
                                <Text fontSize="sm" color={textColor}>Line: {station.line}</Text>
                                <Text fontSize="sm" color={textColor}>
                                    Location:{" "}
                                    {station.latitude !== undefined && station.longitude !== undefined
                                        ? `${station.latitude.toFixed(3)}, ${station.longitude.toFixed(3)}`
                                        : "N/A"}
                                </Text>
                                <Text fontSize="sm" color={textColor}>Code: {station.code || "N/A"}</Text>
                                <Badge
                                    mt={2}
                                    colorScheme={station.active === "y" ? "green" : "red"}
                                    variant="solid"
                                    fontSize="0.75rem"
                                >
                                    {station.active === "y" ? "Active" : "Inactive"}
                                </Badge>
                            </CardBody>
                        </Card>
                    ))}
                </SimpleGrid>
            )}
        </Box>
    );
}
