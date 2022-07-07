//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract BuyMeACoffee {
    // Event to emit when creating a memo


    event NewMemo(
        address indexed from,
        uint256 timestamp,
        string name,
        string message
    );

    // Memo Struct
    struct Memo{
        address from;
        uint256 timestamp;
        string name;
        string message;
    }

    // Memos list received

    Memo[] memos;

    // contract deployer address
    address payable owner;

    // deploy logic
    constructor() {
        owner = payable(msg.sender);
    }

    function buyCoffee(string memory _name, string memory _message) public payable {
        require(msg.value > 0, "Amount should be greater than 0");

        memos.push(Memo(
            msg.sender,
            block.timestamp,
            _name,
            _message
        ));
        
        // Log event wuith the new created memo
        emit NewMemo(
            msg.sender,
            block.timestamp,
            _name,
            _message
        );
    }

    function withdrawTips() public {
        require(owner.send(address(this).balance));
    }

    function getMemos() public view returns(Memo[] memory){
        return memos;
    }

}
