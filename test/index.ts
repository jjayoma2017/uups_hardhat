/* eslint-disable prettier/prettier */
// import { expect } from "chai";
// import { ethers } from "hardhat";

// describe("Greeter", function () {
//   it("Should return the new greeting once it's changed", async function () {
//     const Greeter = await ethers.getContractFactory("Greeter");
//     const greeter = await Greeter.deploy("Hello, world!");
//     await greeter.deployed();

//     expect(await greeter.greet()).to.equal("Hello, world!");

//     const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

//     // wait until the transaction is mined
//     await setGreetingTx.wait();

//     expect(await greeter.greet()).to.equal("Hola, mundo!");
//   });
// });
// import hre from 'hardhat'
import assert from 'assert'
import { ethers, upgrades } from 'hardhat'

before('get factories', async function () {
  this.Mars = await ethers.getContractFactory('Mars')
  this.MarsV2 = await ethers.getContractFactory('MarsV2')
  this.MarsV3 = await ethers.getContractFactory('MarsV3')
})

it('goes to mars', async function () {
  const mars = await upgrades.deployProxy(this.Mars, { kind: 'uups' })

  assert((await mars.name()) === 'Mars')

  // const marsV2 = await upgrades.upgradeProxy(mars, this.MarsV2)
  // assert((await marsV2.version()) === 'v2!')
  const marsV2 = await upgrades.upgradeProxy(mars, this.MarsV2)
  assert((await marsV2.version()) === 'v2!')
  await marsV2.setFee(2)

  const marsV3 = await upgrades.upgradeProxy(marsV2, this.MarsV3)
  assert((await marsV3.version()) === 'v3!')

  console.log(await marsV3.getFee())
  console.log(marsV3)

  // await marsV3.setFee(2)
  // assert((await marsV3.getFee()) === 0)
})
