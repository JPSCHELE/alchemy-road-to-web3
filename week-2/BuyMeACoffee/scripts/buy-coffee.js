// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

// Ether balance of a given address
async function getBalance(address) {
  const balanceBigInt = await hre.waffle.provider.getBalance(address);
  return hre.ethers.utils.formatEther(balanceBigInt);
}

// Logs ether balances for a list of addresses
async function printBalances(addresses) {
  let idx = 0 ;
  for (const address of addresses) {
    console.log(`addresses ${idx} balance`, await getBalance(address));
    idx++;
  }
}

// Log the memos stored on-chain
async function printMemos(memos) {
  for (const memo of memos) {
    const timestamp = memo.timestamp;
    const tipper = memo.name;
    const tipperAddress = memo.from;
    const message = memo.message;
    console.log(`At ${timestamp}, ${tipper} (${tipperAddress}) said: "${message}"`);

  }
}

async function main() {
  // get example account
  const [owner, tipper , tipper2, tipper3 ] = await hre.ethers.getSigners();
  // get contract to deploy & deploy
  const BuyMeACoffee = await hre.ethers.getContractFactory("BuyMeACoffee");
  const buyMeACoffee = await BuyMeACoffee.deploy();
  await buyMeACoffee.deployed();
  console.log("BuyMeACoffee deployed to", buyMeACoffee.address);

  // check balances before coffee purchase
  const addresses = [owner.address, tipper.address, buyMeACoffee.address];
  console.log("== start ==");
  await printBalances(addresses);
  // buy the owner a few coffees
  const tip = {value: hre.ethers.utils.parseEther("1")};
  await buyMeACoffee.connect(tipper).buyCoffee("Malaya", "Hola", tip);
  await buyMeACoffee.connect(tipper2).buyCoffee("Malaya2", "Hola2", tip);
  await buyMeACoffee.connect(tipper3).buyCoffee("Malaya3", "Hola3", tip);

  console.log("== Bought cafe==");
  await printBalances(addresses);

  // Withdrwaw funds

  await buyMeACoffee.connect(owner).withdrawTips();

  console.log("==AFTER WITHDRAW==");
  await printBalances(addresses);

  console.log("== memos==");

  const memos = await buyMeACoffee.getMemos();
  await printMemos(memos);
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
