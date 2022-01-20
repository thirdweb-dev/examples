import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import useProtectedPage from "../hooks/useProtectedPage";

export default function Home() {
  useProtectedPage();

  const router = useRouter();

  return (
    <Flex flexDir="column" alignContent="center" textAlign="center">
      <Heading size="lg">Home</Heading>

      <Text>
        If you're a creator, click the creator button. If you're a claimer,
        click the claimer button.
      </Text>

      <Flex
        flexDir="row"
        sx={{
          button: {
            margin: "1rem",
          },
        }}
        justifyContent="center"
      >
        <Button colorScheme="blue" onClick={() => router.push("creator")}>
          Creator
        </Button>

        <Button colorScheme="green" onClick={() => router.push("claimer")}>
          Claimer
        </Button>
      </Flex>
    </Flex>
  );
}
