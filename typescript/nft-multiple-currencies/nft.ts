import { NATIVE_TOKEN_ADDRESS } from "@thirdweb-dev/sdk";

export const nft = {
  name: "Test",
  description: "Test",
  image:
    "https://ipfs.thirdweb.com/ipfs/QmPocpnbo2QQDHz3QAHFqCNSjwfdLmFtTTzoLMzKX88Ghs/0.jpg",
  id: "0",
  tokens: [
    {
      name: "MATIC",
      address: NATIVE_TOKEN_ADDRESS,
      price: 5,
    },
    {
      name: "USDC",
      address: "0xe11A86849d99F524cAC3E7A0Ec1241828e332C62",
      price: 5,
    },
  ],
};
