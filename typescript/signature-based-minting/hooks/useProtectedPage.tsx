import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAddress } from "@thirdweb-dev/react";

export function useProtectedPage() {
  const address = useAddress();
  const router = useRouter();
  useEffect(() => {
    if (!address) {
      router.replace("/");
    } else {
      console.log(address);
    }
  }, [address, router]);
}
