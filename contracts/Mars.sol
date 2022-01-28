// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract Mars is Initializable,ERC20Upgradeable,UUPSUpgradeable,OwnableUpgradeable  {
    function initialize() public initializer {
         __ERC20_init("Mars", "MARS");
        __Ownable_init();
        _mint(msg.sender, 10000000 * 10 ** decimals());
        
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyOwner{}
}

contract MarsV2 is Mars{
    uint private  fee;
    function setFee(uint val) external {
        fee = val;
    }
    function getFee() external  view  returns(uint){
        return fee;
    }
    function version() public virtual  pure  returns(string memory){
        return "v2!";
    }
}

contract MarsV3 is MarsV2{
    function  version() public override pure  returns(string memory){
        return "v3!";
    }
}