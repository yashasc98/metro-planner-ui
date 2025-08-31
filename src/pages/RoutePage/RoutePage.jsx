import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
    Box,
    Heading,
    Text,
    Spinner,
    Alert,
    AlertIcon,
    VStack,
    HStack,
    Circle,
    Badge,
    useColorModeValue,
    Select,
    Button,
    Flex,
} from "@chakra-ui/react";
import { FaTrain } from "react-icons/fa";
import StationsMap from "../../components/StationsMap";

export default function RoutePage() {
    const { city } = useParams(); // since route is now /:city/route
    const [stations, setStations] = useState([]);
    const [route, setRoute] = useState([]);
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const lineColors = {
        purple: { light: "purple.100", dark: "purple.700" },
        green: { light: "green.100", dark: "green.700" },
        blue: { light: "blue.100", dark: "blue.700" },
        red: { light: "red.100", dark: "red.700" },
        yellow: { light: "yellow.100", dark: "yellow.600" },
        pink: { light: "pink.100", dark: "pink.600" },
        orange: { light: "orange.100", dark: "orange.600" },
    };

    const pageBg = useColorModeValue("gray.50", "gray.900");
    const textColor = useColorModeValue("gray.800", "whiteAlpha.900");

    // Load all stations for dropdowns
    useEffect(() => {
        const fetchStations = async () => {
            try {
                const res = await axios.get(
                    `https://metro-planner.onrender.com/stations`
                );
                setStations(res.data || []);
            } catch (err) {
                setError(
                    err.response?.data?.message ||
                    err.message ||
                    "Failed to load stations."
                );
            }
        };
        fetchStations();
    }, []);

    // Fetch route only when FROM + TO selected
    const fetchRoute = async () => {
        if (!from || !to) return;
        try {
            setLoading(true);
            setError(null);
            const res = await axios.get(
                `https://metro-planner.onrender.com/stations`
            );
            setRoute(res.data || []);
        } catch (err) {
            setError(
                err.response?.data?.message || err.message || "Failed to load route."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box p={{ base: 4, md: 8 }} bg={pageBg} minH="100vh">
            <Heading
                mb={6}
                textAlign="center"
                fontSize={{ base: "2xl", md: "3xl" }}
                color={textColor}
            >
                Route Planner – {city}
            </Heading>

            {/* Station selectors */}
            <Flex
                justify="center"
                gap={4}
                wrap="wrap"
                mb={8}
                align="center"
                bg={useColorModeValue("white", "gray.800")}
                p={4}
                borderRadius="md"
                shadow="sm"
            >
                <Select
                    placeholder="Select FROM"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    w="200px"
                >
                    {stations.map((s) => (
                        <option key={s.id} value={s.code}>
                            {s.name}
                        </option>
                    ))}
                </Select>

                <Select
                    placeholder="Select TO"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    w="200px"
                >
                    {stations.map((s) => (
                        <option key={s.id} value={s.code}>
                            {s.name}
                        </option>
                    ))}
                </Select>

                <Button
                    colorScheme="blue"
                    onClick={fetchRoute}
                    isDisabled={!from || !to}
                >
                    Find Route
                </Button>
            </Flex>

            {loading && (
                <Box textAlign="center" mt={8}>
                    <Spinner size="xl" thickness="4px" color="blue.500" />
                </Box>
            )}

            {error && (
                <Alert status="error" mt={8} borderRadius="md">
                    <AlertIcon />
                    {error}
                </Alert>
            )}

            {!loading && !error && route.length > 0 && (
                <>
                    <Box mb={8} borderRadius="md" overflow="hidden">
                        <StationsMap stations={route} />
                    </Box>

                    <VStack
                        align="stretch"
                        spacing={4}
                        divider={
                            <Box borderLeft="2px solid" borderColor="gray.400" ml="20px" />
                        }
                    >
                        {route.map((station, index) => (
                            <HStack
                                key={station.id || index}
                                align="center"
                                p={4}
                                borderRadius="md"
                                bg={useColorModeValue(
                                    lineColors[station.line]?.light || "gray.100",
                                    lineColors[station.line]?.dark || "gray.700"
                                )}
                                shadow="sm"
                                spacing={4}
                            >
                                <Circle size="40px" bg="blue.500" color="white">
                                    {index + 1}
                                </Circle>
                                <Box flex="1">
                                    <Text fontWeight="bold" fontSize="lg" color={textColor}>
                                        {station.name}
                                    </Text>
                                    <Text fontSize="sm" color={textColor}>
                                        Line: {station.line} | Code: {station.code || "N/A"}
                                    </Text>
                                    <Badge
                                        mt={1}
                                        colorScheme={station.active === "y" ? "green" : "red"}
                                        variant="solid"
                                        fontSize="0.75rem"
                                    >
                                        {station.active === "y" ? "Active" : "Inactive"}
                                    </Badge>
                                </Box>
                                <FaTrain
                                    color={useColorModeValue("gray.700", "white")}
                                    size={20}
                                />
                            </HStack>
                        ))}
                    </VStack>
                </>
            )}

            {!loading && !error && route.length === 0 && from && to && (
                <Text textAlign="center" mt={8} fontSize="lg" color={textColor}>
                    No route found between {from} and {to}.
                </Text>
            )}
        </Box>
    );
}
