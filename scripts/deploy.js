import hardhat from "hardhat";

async function main() {
    const NoteChain = await hardhat.ethers.getContractFactory("NoteChain");
    const noteChain = await NoteChain.deploy();

    // Instead of `await noteChain.deployed()`, use `await noteChain.waitForDeployment()`
    await noteChain.waitForDeployment();

    console.log(`NoteChain deployed at: ${noteChain.target}`);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
