import { NATIVE_TOKEN_ADDRESS } from "@thirdweb-dev/sdk";

export const nft = {
  name: "Access Pass",
  description: "This is the description for my cool NFT",
  image:
    "https://gateway.thirdweb.dev/ipfs/QmW7JuWarEUAuzmD5Yjc84ryx43Egf6YDDS2s5kY65zRX6/0.jpeg",
  id: "0",
  tokens: [
    {
      name: "MATIC",
      address: NATIVE_TOKEN_ADDRESS,
      price: 10,
    },
    {
      name: "USDC",
      address: "0xe11A86849d99F524cAC3E7A0Ec1241828e332C62",
      price: 3,
    },
  ],
};
