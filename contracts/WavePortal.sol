// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;
    address[] allWaves;

    constructor() {
        console.log("Smart contract!");
    }
    function wave() public {
        totalWaves++;
        allWaves.push(msg.sender);
        console.log("%s has waved! TotalWaves %s", msg.sender, totalWaves);
    }
    function getTotalWaves() public view returns (uint256) {
        console.log("We have %d total waves!", 0);
        return 0;
    }
    function getWavers() public view returns (uint256) {
        console.log("We have %d wavers!", allWaves.length);
    }
}