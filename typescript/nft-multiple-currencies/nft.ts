import { NATIVE_TOKEN_ADDRESS } from "@thirdweb-dev/sdk";

export const nft = {
  name: "My cool NFT",
  description: "This is the description for my cool NFT",
  image:
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
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
