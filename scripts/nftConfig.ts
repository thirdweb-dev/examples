import editionDrop from './getContract';

const nftConfig = async () => {
  const claimConditions = [
    {
      startTime: new Date(),
      maxQuantity: 1000,
      price: 0.01,
    },
  ];
  try {
    await editionDrop.claimConditions.set('0', claimConditions); // 1 refers to token id
    console.log('🎉 Successfully added the claim condition!');
  } catch (error) {
    console.log('Failed to set claim condition. Error: ', error);
  } 
};

nftConfig();
