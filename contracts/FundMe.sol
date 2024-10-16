// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "./PriceConvertor.sol";

error NotOwner();

contract FundMe {
    using PriceConvertor for uint256;

    uint256 public constant MINIMUM_USD = 50 * 1e18

    address[] public funders;
    mapping (address => uint256) public addressToAmountFunded;

    address public i_owner;

    constructor(){
        i_owner = msg.sender;
    }

    function fundMe() public payable {

        require(msg.value.getConversionRate() >= MINIMUM_USD, "Didn't send enough");

        funders.push(msg.sender);
        addressToAmountFunded[msg.sender] = msg.value;
    }

    function withdraw() public onlyOwner { 
        for(uint256 funderIndex = 0; funderIndex < funders.length; funderIndex++) {
            address funder = funders[funderIndex];
            addressToAmountFunded[funder] = 0;
        }

        // reset the array
        funders = new address[](0);

        // send eth
        (bool callSuccess, ) = payable(msg.sender).call{value: address(this).balance}("");
        require(callSuccess, 'Call Fails');
    }

    modifier onlyOwner {
        if(msg.sender != i_owner) revert NotOwner()
        _;
    }

    receive() external payable {
        fund();
    }

    fallback() external payable {
        fund();
    }
}