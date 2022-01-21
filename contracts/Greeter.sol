// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

contract Greeter{
    address private owner ;
    string private greeting = "";
    event GreeterUpdated(string greeting);
    constructor() public {
        owner = msg.sender;
        greeting='';
    }
    modifier onlyOwner(){
        require(owner == msg.sender,'Ownable: owner should match');
        _;
    }
    function setGreeting(string memory newGreeting) public onlyOwner returns(string memory){
        greeting = newGreeting ;
        emit GreeterUpdated(greeting) ;
        return newGreeting ;
    }
    function getGreeting() public view onlyOwner returns(string memory){
        return greeting ;
    }
    function getOwner() public view returns(address){
        return owner;
    }
    
}
