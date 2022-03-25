import { useAddress } from "@thirdweb-dev/react";
import { Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Connect from "../components/Connect";
export default function LandingPage() {
  const address = useAddress();

  const router = useRouter();

  useEffect(() => {
    if (address) {
      router.replace("/home");
    }
  }, [address]);

  return (
    <div>
      <Heading size="lg">Connect your wallet to get started!</Heading>
      <Connect />
    </div>
  );
}
