export default function parseUrl(url) {
  if (url.includes("ipfs://")) {
    return url.replace("ipfs://", "https://ipfs.io/ipfs/");
  } else {
    return url;
  }
}
