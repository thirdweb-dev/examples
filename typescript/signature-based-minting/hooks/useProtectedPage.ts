import { useWeb3 } from "@3rdweb/hooks";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function useProtectedPage() {
  const { address } = useWeb3();

  const router = useRouter();

  useEffect(() => {
    if (!address) {
      router.push("/");
    }
  }, [address]);
}
