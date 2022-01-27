// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;


/// @title A Token Generator for Campaign
/// @author Alex Braz
/// @notice Generates a custom Token for any campaign
/// @dev v1.0 basic ERC-21 
contract Token {

    address owner;
    uint256 initialSupply;
    uint256 inContractSupply;
    string public tokenName;
    string public tokenSymbol;
    string public compaignName;
    string public version = "1.0";
    uint8 decimals = 2;
    mapping (address => uint256) public balances;
    mapping (address => mapping (address => uint256)) public allowed;
    uint256 constant private MAX_UINT256 = 2**256 - 1;

    event Transfer(address indexed from, address indexed to, uint value);
    event Approval(address indexed sender, address indexed spender, uint value);
    event Balance(address indexed from, uint256 value);

    constructor(string memory _tokenName, string memory _tokenSymbol, uint256 _initialSupply ) {
        tokenName = _tokenName;
        tokenSymbol = _tokenSymbol;
        balances[msg.sender] = initialSupply;
        owner = msg.sender;
        initialSupply = _initialSupply;
        inContractSupply = _initialSupply;
    }

    modifier onlyOwner {
        require(
            msg.sender == owner,
            "Only owner can call this function."
        );
        _;
    }

    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balances[msg.sender] >= _value);
        balances[msg.sender] -= _value;
        balances[_to] += _value;
        emit Transfer(msg.sender, _to, _value); //solhint-disable-line indent, no-unused-vars
        return true;
    }
 
    function balanceOf(address _owner) public onlyOwner view returns (uint256 balance) {
        return balances[_owner];
    }

    function getBalance(address _owner) public returns (uint256 balance) {
        uint256 result = balances[_owner];
        emit Balance(msg.sender, result);
        return result;
    }

    function myBalance() public view returns (uint256 balance) {
        return balances[msg.sender];
    }

    function destroy() public onlyOwner payable{
        selfdestruct(payable(owner));
    }

}