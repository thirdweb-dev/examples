## Intro
Build an app with NEXTJS:
1. App is token gated. Meaning only if you hold an access NFT are you able to access the website
2. Once you access the app you can claim an NFT. 
3. Once all **access** NFTs are claimed the price of the NFT in the app goes up.

Contracts used:
1. NFT DROP used for access NFTS
2. NFT DROP used for NFT in the app (behind the gate)

Claim condition Logic:
1. Claim condition is adjusted when an API call is made.
2. API call checks if access NFTS equals certain amound. If yes, it makes the call to adjust the claim condition.
3. Check for access NFT is made at frontend, claim condition ajdusted is at backend.

## Getting Started

First, intall the required dependencies:

```bash
npm install
# or
yarn install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

On `pages/_app.tsx`, you'll find our `ThirdwebProvider` wrapping your app, this is necessary for our hooks to work.

on `pages/index.tsx`, you'll find the `useMetamask` hook that we use to connect the user's wallet to MetaMask, `useDisconnect` that we use to disconnect it, and `useAddress` to check the user's wallet address once connected. 

## Learn More

To learn more about thirdweb and Next.js, take a look at the following resources:

- [thirdweb React Documentation](https://docs.thirdweb.com/react) - learn about our React SDK.
- [thirdweb TypeScript Documentation](https://docs.thirdweb.com/react) - learn about our JavaScript/TypeScript SDK.
- [thirdweb Portal](https://docs.thirdweb.com/react) - check our guides and development resources.
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

You can check out [the thirdweb GitHub organization](https://github.com/thirdweb-dev) - your feedback and contributions are welcome!

## Join our Discord!

For any questions, suggestions, join our discord at [https://discord.gg/thirdweb](https://discord.gg/thirdweb).