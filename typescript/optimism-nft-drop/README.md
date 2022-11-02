# Optimism NFT Drop

Create a claimable NFT drop on the optimism chain!

## Setup

To run the project, first clone this repository, and then run one of the following commands to install the dependencies:

```bash
npm install
# or
yarn install
```

You can run the project with one of the following commands:

```bash
npm run dev
# or
yarn dev
```

Finally, go to the [addresses file in the consts folder](consts/addresses.ts) and replace the addresses with your own.

Now, you can navigate to [http://localhost:3000](http://localhost:3000) to visit the client side page where you can connect a wallet, sign-in with eth and view the payload, and use the payload to authenticate with the backend.

## How It Works

Using the `useContractMetadata` hook we get the metadata for the contract which we can render:

```tsx
const { contract: nftDrop } = useContract(dropAddress);

const { data: contractMetadata, isLoading } = useContractMetadata(nftDrop);
```

We then render the details:

```tsx
   <MediaRenderer
        src={contractMetadata.image}
        alt={contractMetadata.name}
        style={{
          width: "200px",
        }}
      />
      <p>{contractMetadata.name}</p>
```

Finally, we use the `Web3Button` component for claiming functionality:

```tsx
<Web3Button
  contractAddress={dropAddress}
  action={(contract) => {
    contract.erc721.claim(quality);
  }}
  accentColor="#f213a4"
>
  Claim
</Web3Button>
```

## Join our Discord!

For any questions, suggestions, join our discord at [https://discord.gg/thirdweb](https://discord.gg/thirdweb).
