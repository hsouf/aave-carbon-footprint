const ethers = require("ethers");
const { config } = require("dotenv");
const { resolve } = require("path");
config({ path: resolve(__dirname, "./.env") });

let { INFURA_KEY } = process.env;
module.exports.getNumberOfDays = async (startBlock, endBlock) => {
  const provider = new ethers.providers.JsonRpcProvider(
    `https://mainnet.infura.io/v3/${INFURA_KEY}`
  );

  const start = (await provider.getBlock(startBlock)).timestamp;

  const end = (await provider.getBlock(endBlock)).timestamp;

  return parseInt((end - start) / 86400);
};
