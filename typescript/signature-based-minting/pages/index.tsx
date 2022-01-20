import { useWeb3 } from "@3rdweb/hooks";
import { Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function LandingPage() {
  const { address } = useWeb3();

  const router = useRouter();

  useEffect(() => {
    if (address) {
      router.push("/home");
    }
  }, [address]);

  return (
    <div>
      <Heading size="lg">Connect your wallet to get started!</Heading>
    </div>
  );
}
