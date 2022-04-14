import { Box, SimpleGrid, Button, Flex, Image } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useAddress, useNFTCollection, useMetamask } from '@thirdweb-dev/react';

const Nfts = (props: any) => {
  // State to set when we are loading
  const [loading, setLoading] = useState(false);
  // State for nft metadata
  const [nftMetadata, setNftMetadata] = useState([null]);

  // useEffect hook to get NFTs from API
  useEffect(() => {
    fetch('/api/getNfts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setNftMetadata(data);
      });
  }, [loading]);

  // Use address and connect with metamask
  const address = useAddress();
  const connectWithMetamask = useMetamask();

  // You can find your contract address in your dashboard after you have created an NFT Collection contract
  const nftCollectionAddress = '0xB20B7AA964365A753Fb7412d98D76D139fd7Cbbd';

  // Connect to contract using the address
  const nftCollection = useNFTCollection(nftCollectionAddress);

  // Function which generates signature and mints NFT
  async function onClick(id: number) {
    try {
      connectWithMetamask();
      setLoading(true);
      // Call API to generate signature and payload for minting
      const response = await fetch('/api/getNfts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, address }),
      });

      if (response) {
        const data = await response.json();
        const mintInput = {
          signature: data.signature,
          payload: data.payload,
        };

        await nftCollection?.signature.mint(mintInput);

        alert('NFT successfully minted!');
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert('Failed to mint NFT!');
    }
  }

  return (
    <SimpleGrid justifyItems='center' columns={3} spacing={10}>
      {nftMetadata?.map((nft: any) => (
        <Box
          key={nftMetadata.indexOf(nft)}
          maxW='sm'
          borderWidth='1px'
          borderRadius='lg'
          overflow='hidden'
        >
          <Image src={nft?.url} alt='NFT image' />

          <Flex p='1rem' alignItems='center' flexDir='column'>
            <Box
              mt='1'
              fontWeight='bold'
              lineHeight='tight'
              fontSize='20'
              isTruncated
              m='0.5rem'
            >
              {nft?.name}
            </Box>

            <Box fontSize='16' m='0.5rem'>
              {nft?.description}
            </Box>
            <Box fontSize='16' m='0.5rem'>
              {nft?.price}
            </Box>
            {loading ? (
              <p>Minting... You will need to approve 1 transaction</p>
            ) : nft?.minted ? (
              <b>This NFT has already been minted</b>
            ) : (
              <Button
                colorScheme='purple'
                m='0.5rem'
                onClick={() => onClick(nft?.id)}
              >
                Mint
              </Button>
            )}
          </Flex>
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default Nfts;
