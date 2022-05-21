const main = async () => {
    const [owner, randomPerson] = await ethers.getSigners();
    const waveContractFactory = await ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy();
    await waveContract.deployed();
    console.log(`Deployed Wave Portal at ${waveContract.address}`);
    console.log(`Contract owner: ${owner.address}`);

    let waveCount;
    waveCount = await waveContract.getTotalWaves();

    let waveTxn = await waveContract.wave();
    await waveTxn.wait();

    waveCount = await waveContract.getTotalWaves();

    waveTxn = await waveContract.connect(randomPerson).wave();
    await waveTxn.wait();

    waveCount = await waveContract.getTotalWaves();
    await waveContract.getWavers();
}

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    }
    catch (e) {
        console.error(e);
        process.exit(1);
    }
}

runMain();