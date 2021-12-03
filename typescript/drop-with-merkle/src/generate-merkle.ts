import { ThirdwebSDK } from "@3rdweb/sdk";
import { SHA256 } from "crypto-js";
import parse from "csv-parser";
import { ethers } from "ethers";
import { createReadStream } from "fs";
import { MerkleTree } from "merkletreejs";
import path from "path";

const DROP_MODULE_ADDRESS = "<YOUR_DROP_MODULE_ADDRESS>";
const APP_MODULE_ADDRESS = "<YOUR_APP_MODULE_ADDRESS>";
const RPC_URL = "https://rpc-mumbai.maticvigil.com";

const addressListFilePath = path.join(__dirname, "./whitelisted-addresses.csv");

/**
 * This example:
 *
 * 1. Loads addresses from a CSV
 * 2. Generates a merkle tree for the list of addresses and spits out the root
 * 3. Demonstrates how to check if a given address is valid and contained in the merkle tree
 * 4. Deploys a drop module with the merkle root condition
 */
const run = async () => {
  console.log("Generating merkle for file", addressListFilePath);

  const addresses = await loadAddress();
  console.log("Addresses = ", addresses);

  const tree = generateMerkleRoot(addresses);
  const root = tree.getRoot().toString("hex");
  console.log(
    "Root (this is what you would use in the claim condition) = ",
    root
  );

  console.log(checkAddress(tree, "0xE79ee09bD47F4F5381dbbACaCff2040f2FbC5803"));
  console.log(checkAddress(tree, "0x99703159fbE079e1a48B53039a5e52e7b2d9E559"));

  createDropModuleWithMerkleCondition(tree.getHexRoot());
};

/**
 * Loads the address to be used in the merkle tree from a CSV file.
 *
 * @returns - The list of addresses in the CSV file
 */
const loadAddress = async (): Promise<string[]> => {
  const addresses = await new Promise<string[]>((resolve, reject) => {
    const data: any[] = [];
    createReadStream(addressListFilePath)
      .pipe(parse())
      .on("data", (r) => {
        data.push(r);
      })
      .on("error", (err) => {
        reject(err);
      })
      .on("end", () => resolve(data.map((d) => d["Address"])));
  });
  return addresses;
};

/**
 * Once we have the addresses, we need to create the merkle root, which will be
 * used in the claim condition for the drop.
 *
 * @param addresses
 */
const generateMerkleRoot = (addresses: string[]): MerkleTree => {
  const tree = new MerkleTree(addresses, SHA256, {
    sortPairs: true,
    hashLeaves: true,
  });
  return tree;
};

/**
 * This is an example function showing how to check if a given address is valid
 * and contained in the merkle tree we created.
 *
 * @param tree - The merkle tree we created
 * @param address - The address to check
 */
function checkAddress(tree: MerkleTree, address: string) {
  console.log(`Checking if ${address} is a valid address in the tree`);
  const hashed = SHA256(address).toString();
  const root = tree.getRoot().toString("hex");
  const proof = tree.getProof(hashed);
  return tree.verify(proof, hashed, root);
}

/**
 * Example of deploying a drop module and applying the merkle root condition.
 *
 * @param root - The merkle root to apply to the module (hex value)
 */
const createDropModuleWithMerkleCondition = async (root: string) => {
  let sdk: ThirdwebSDK;
  if (process.env.PKEY) {
    sdk = new ThirdwebSDK(
      new ethers.Wallet(process.env.PKEY, ethers.getDefaultProvider(RPC_URL))
    );
  } else {
    sdk = new ThirdwebSDK(RPC_URL);
  }

  const appModule = sdk.getAppModule(APP_MODULE_ADDRESS);

  // TODO: We should modify this interface and remove some of the required parameters
  const dropModule = await appModule.deployDropModule({
    name: "Merkle Tree Example",
    baseTokenUri: "",
    maxSupply: 100,
    primarySaleRecipientAddress: "0x0000000000000000000000000000000000000000",
    sellerFeeBasisPoints: 0,
  });

  await dropModule.setPublicMintConditions([
    {
      merkleRoot: root,
      // Infinite supply using this condition
      maxMintSupply: ethers.constants.MaxUint256,
    },
  ]);
};

/**
 * This is the example claim function that provides a merkle proof
 * to the claim function which permits the claim if the proof is valid
 * given the root that way applied in the public mint condition.
 */
const exampleClaimFunction = async () => {
  const sdk: ThirdwebSDK = new ThirdwebSDK(RPC_URL);
  const dropModule = sdk.getDropModule(DROP_MODULE_ADDRESS);

  // TODO: Jake => how do we pass in the proof?
  const claim = await dropModule.claim(1);
  console.log(claim);
};

run()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(-1);
  });
