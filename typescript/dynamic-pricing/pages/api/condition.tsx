import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";
import { NextApiRequest, NextApiResponse } from "next";


// This depend on your HTTP Server setup. In this example, we're using next.js
// api handlers.
export default function setCondition(req: NextApiRequest, res: NextApiResponse): Promise<any> {
    // the RPC URL to the blockchain that the nftDrop contract is deployed on.
    // "rinkeby" = rinkeby testnet,
    // "https://rpc-mumbai.maticvigil.com" = mumbai testnet.
    const rpcUrl = "rinkeby";
    const key = process.env.API_KEY!
    // setup a wallet using private key for the SDK.
    // the wallet must have MINTER role to mint the nftDrop.
    // you can assign MINTER role to the wallet through the nftDrop collection dashboard.
    const wallet = new ethers.Wallet(
       key,
        ethers.getDefaultProvider(rpcUrl)
    );

    // initialize the SDK and get the nftDrop Collection module
    // get the contract address (0x...) from your dashboard!
    const nftDrop = new ThirdwebSDK(wallet).getNFTDrop("0x82747Bd4e435C9D5cF2342c8361B19910259C264");

    // returning the HTTP response. This depends on the HTTP server framework.
    return new Promise<void>((resolve) => {
        // const mycondition = [
        //     {
        //         maxQuantity: 100, // limit how many mints for this presale
        //         price: 0.2, // sale price after all access NFTs have been claimed
        //     }
        // ]
        const date = new Date()

        nftDrop
            .claimConditions.update(1,{startTime: new Date()})
            .then((metadata) => {
                // Returning the nftDrop metadata to the client requested.
                // This depends on the HTTP server framework
                res.status(200).json(metadata);
                resolve();
            });
    })
};