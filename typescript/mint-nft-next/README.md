## thirdweb-sdk-example

A starter project with:

- Web App: [Next.js](https://nextjs.org/), [Chakra UI](https://chakra-ui.com/) and [useDApp](https://github.com/EthWorks/useDApp).
- Thirdweb SDK

#### Environment Variables

```
PRIVATE_KEY=<wallet private key with minter role>
NEXT_PUBLIC_RPC_URL=<alchemy / infura / rpc url. defaults to Polygon Mumbai public rpc if left empty>
NEXT_PUBLIC_NFT_MODULE_ADDRESS=<NFT module address from thirdweb.com>
```

## Usage (pseudocode)

### Client Side (React):

Fetching all NFTs available in the module. [Source](https://github.com/thirdweb-dev/nftlabs-sdk-example/blob/5dcd73001061ef0680c46fd91861dac893928a6e/components/SwordList.tsx#L12-L29)

```ts
const sdk = new ThirdwebSDK(library.getSigner());
const nft = sdk.getNFTModule(
  process.env.NEXT_PUBLIC_NFT_MODULE_ADDRESS as string
);
...
const tokens = await nft.getAll();
```

### Server Side (REST API Handler):

Minting NFTs with random properties.
[Source](https://github.com/thirdweb-dev/nftlabs-sdk-example/blob/5dcd73001061ef0680c46fd91861dac893928a6e/pages/api/mint_sword.ts#L42-L64)

```ts
// connect to wallet with minter permission
const sdk = new ThirdwebSDK(
  new ethers.Wallet(
    process.env.PRIVATE_KEY as string,
    ethers.getDefaultProvider(process.env.NEXT_PUBLIC_RPC_URL)
  )
);

const nft = sdk.getNFTModule(
  process.env.NEXT_PUBLIC_NFT_MODULE_ADDRESS as string
);

...
const token = await nft.mintTo(account, {
  name: `${type} sword - ${rarity}`,
  description: `The special ${type} sword crafted for ${account}`,
  image: image,
  properties: {
    type: type,
    rarity: rarity,
    element: sample(["fire", "water", "earth", "lightning", "wind"]),
    attack: getRandomInt(10, 30),
  },
})
```
