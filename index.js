const fs = require("fs");
const { calculateContractEmissions } = require("ethereum-emissions-calculator");
const { config } = require("dotenv");
const { resolve } = require("path");

const { getNumberOfDays } = require("./utils");

config({ path: resolve(__dirname, "./.env") });

let { etherscanAPIKey } = process.env;

async function fetchEmissions(contract, address, txType) {
  const emissions = await calculateContractEmissions({
    transactionType: txType,
    address,
    etherscanAPIKey,
  });
  console.log(
    "Total Emissions for",
    txType,
    "transactions on",
    contract,
    "is: ",
    emissions.kgCO2,
    "kgCO2",
    "over the last",
    await getNumberOfDays(
      emissions.lowestBlockNumber,
      emissions.highestBlockNumber
    ),
    "Days ",
    "Txs count",
    emissions.transactionsCount
  );
}

let data = fs.readFileSync("AaveV2DeployedContracts.json");
let AaveDeployedContracts = JSON.parse(data);

for (contract in AaveDeployedContracts) {
  fetchEmissions(contract, AaveDeployedContracts[contract], "erc20");
  fetchEmissions(contract, AaveDeployedContracts[contract], "eth");
}
