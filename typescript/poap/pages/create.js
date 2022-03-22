import Page from "../components/Page";
import {
  VStack,
  Button,
  Link,
  Input,
  FormLabel,
  Select,
  useToast,
} from "@chakra-ui/react";
import { useNFTCollection } from "@thirdweb-dev/react";
import { useState } from "react";
export default function Create() {
  const toast = useToast();
  const [contract, setContract] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  async function handleSubmit() {
    fetch("/api/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
        image,
        address: contract,
      }),
    }).then(() => {
      toast({
        title: "Success",
        description: "Contract added successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    });
  }
  return (
    <Page
      title={"Create Event"}
      subheading={"Add a new contract to start issuing NFTs"}
    >
      <Input
        placeholder="Contract Address"
        width={"2xl"}
        marginTop={"2"}
        onChange={(e) => setContract(e.target.value)}
      />
      <Input
        placeholder="Event Name"
        width={"2xl"}
        marginTop={"2"}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        placeholder="Event Description"
        width={"2xl"}
        marginTop={"2"}
        onChange={(e) => setDescription(e.target.value)}
      />
      {/* TODO: add image upload */}
      <Input
        placeholder="NFT Image URL"
        width={"2xl"}
        marginTop={"2"}
        onChange={(e) => setImage(e.target.value)}
      />
      <Button width={"2xl"} marginTop={"5"} onClick={handleSubmit}>
        Create Event
      </Button>
    </Page>
  );
}
