import { useAddress, useProvider } from "@thirdweb-dev/react";

import { Profiler, useCallback, useEffect, useState } from "react";
import { Button, useToast, Spinner, Input } from "@chakra-ui/react";

export default function Profile() {
  const address = useAddress();
  const provider = useProvider();
  const [jwt, setJwt] = useState(null);
  const [username, setUsername] = useState(null);

  const toast = useToast();

  const getChallenge = useCallback(async () => {
    try {
      const request = await fetch("/api/challenge", {
        method: "POST",
        body: JSON.stringify({
          address,
        }),
      });

      if (request.status !== 200) {
        throw new Error(
          `Failed to fetch challenge, status code = ${request.status}`
        );
      }

      const { challenge } = await request.json();
      toast({
        status: "success",
        title: "Got challenge = " + challenge,
      });
      return challenge;
    } catch (err) {
      toast({
        status: "error",
        title: "Failed to fetch the challenge",
        description: err.message,
      });
    }
  }, [address]);

  const getJwt = useCallback(async () => {
    const challenge = await getChallenge();
    const signer = provider.getSigner();
    console.log("Signer = ", signer);

    const signedChallenge = await signer.signMessage(challenge);

    try {
      const request = await fetch("/api/jwt", {
        method: "POST",
        body: JSON.stringify({
          address,
          signedChallenge: signedChallenge,
        }),
      });

      if (request.status !== 200) {
        throw new Error(`Failed to fetch jwt, status code = ${request.status}`);
      }

      const { token } = await request.json();
      console.log("Got token = ", token);

      setJwt(token);
    } catch (err) {
      toast({
        status: "error",
        title: "Failed to fetch the JWT",
      });
    }
  }, [getChallenge, provider, address]);

  const updateUsername = useCallback(async () => {
    try {
      const request = await fetch("/api/updateProfile", {
        method: "POST",
        body: JSON.stringify({
          username,
        }),
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      if (request.status !== 200) {
        throw new Error(
          `Failed to update profile, status code = ${request.status}`
        );
      }

      toast({
          status: 'success',
          title: 'Updated profile'
      })
    } catch (err) {
      toast({
        status: "error",
        title: "Failed to update profile",
        description: err.message,
      });
    }
  }, [username, jwt]);

  useEffect(() => {
    if (jwt !== null) {
      return;
    }

    (async () => {
      await getJwt();
    })();
  }, [jwt]);

  useEffect(() => {
    if (username !== null || jwt === null) {
      return;
    }

    (async () => {
      const request = await fetch("/api/user", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      if (request.status === 200) {
        const { username: newUsername } = await request.json();
        setUsername(newUsername ? newUsername : "");
      }
    })();
  }, [username, jwt]);

  if (!jwt) {
    return <Spinner size="lg" color="black"></Spinner>;
  }

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f5f5f5",
      }}
    >
      <h1>Your address = {address}</h1>

      <div
        style={{
          marginTop: "20px",
        }}
      >
        <span>Username = </span>
        <Input
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
        ></Input>
      </div>

      <Button
        onClick={async () => {
          await updateUsername();
        }}
      >
        Click ME!
      </Button>
    </div>
  );
}