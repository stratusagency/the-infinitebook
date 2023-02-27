import { ethers } from "hardhat";

async function main() {
  const contract = await ethers.getContractFactory("Book");
  const interactContract = await contract.deploy();

  await interactContract.deployed();

  await interactContract
    .writeMessage(
      "0x375CA6c10a447e9F465d5Ed90d4C9CF53Ab35B1E",
      "hello world, this is stratusagency.eth!"
    )
    .then((message) => console.log(message.hash, "writeMessage"));

  await interactContract
    .readMessage("0x375CA6c10a447e9F465d5Ed90d4C9CF53Ab35B1E")
    .then((message) => console.log(message, "readMessage"));

  console.log("Smart Contract Deployed at " + interactContract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
