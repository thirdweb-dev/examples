export default function parseUrl(url) {
  if (url.includes("ipfs://")) {
    return url.replace("ipfs://", "https://ipfs.thirdweb.com/ipfs/");
  } else {
    return url;
  }
}
