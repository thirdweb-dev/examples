import { Button } from "@chakra-ui/react";
import { useAddress } from "@thirdweb-dev/react";
import { ConnectWalletButton } from "./ConnectWallet";
import Link from "next/link";
export const CreateButton = () => {
  const address = useAddress();

  return address ? (
    <>
      <Link href={"/profile"}>
        <Button>Create Listing</Button>
      </Link>
    </>
  ) : (
    <ConnectWalletButton />
  );
};
