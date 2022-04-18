import { NATIVE_TOKEN_ADDRESS } from "@thirdweb-dev/sdk";

export const nft = {
  name: "My cool NFT",
  description: "This is the description for my cool NFT",
  image: "ipfs://QmRdoPRtfb6MHLQgsBsC5WVDAf7BZijykYUefEmt6UrTTn/0.png",
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
      price: 7,
    },
  ],
};
