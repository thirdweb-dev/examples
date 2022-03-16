import { useAddress } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function useProtectedPage() {
  const address = useAddress();

  const router = useRouter();

  useEffect(() => {
    if (!address) {
      router.replace("/");
    }
  }, [address]);
}
