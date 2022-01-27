// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "./HederaTokenService.sol";
import "./HederaResponseCodes.sol";

/**
 * v0.1.0
 * Author(s): Alex Braz
 *
 * @title Generic Token Creator
 * 
 */
contract Token {

    address owner;
    uint256 initialSupply = 1000;
    uint256 totalSupply = 1000;
    bytes32 public tokenName;
    bytes32 public tokenSymbol;
    string public version = "1.0";
    uint8 decimals = 2;
    mapping (address => uint256) public balances;
    mapping (address => mapping (address => uint256)) public allowed;
    uint256 constant private MAX_UINT256 = 2**256 - 1;

    event Transfer(address indexed from, address indexed to, uint value);
    event Approval(address indexed sender, address indexed spender, uint value);

    constructor(bytes32 _tokenName, bytes32 _tokenSymbol) {
        tokenName = _tokenName;
        tokenSymbol = _tokenSymbol;
        balances[msg.sender] = initialSupply;
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(
            msg.sender == owner,
            "Only owner can call this function."
        );
        _;
    }

    function transfer(address _to, uint256 _value) public onlyOwner returns (bool success) {
        require(balances[msg.sender] >= _value);
        balances[msg.sender] -= _value;
        balances[_to] += _value;
        emit Transfer(msg.sender, _to, _value); //solhint-disable-line indent, no-unused-vars
        return true;
    }
 
    function balanceOf(address _owner) public onlyOwner view returns (uint256 balance) {
        if (msg.sender != owner) return 0;

        return balances[_owner];
    }

    function myBalance() public view returns (uint256 balance) {
        return balances[msg.sender];
    }

    function destroy() public onlyOwner payable{
        selfdestruct(payable(owner));
    }

}