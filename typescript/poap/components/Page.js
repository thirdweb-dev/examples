import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import WalletConnect from "./walletConnect";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@chakra-ui/react";
import { useAddress } from "@thirdweb-dev/react";
export default function Page({
  title,
  heading,
  subheading,
  children,
  hideNav,
}) {
  const address = useAddress();
  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {!hideNav ? (
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink href="#">{title}</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        ) : null}

        <h1 className={styles.title}>{title ? title : heading}</h1>
        <p className={styles.description}>
          {address ? subheading : "Connect your wallet to go ahead"}
        </p>
        {address ? children : <WalletConnect />}
      </main>
    </div>
  );
}
