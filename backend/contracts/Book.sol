// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Book {
    mapping(address => string[]) public messages;

    function writeMessage(address writer, string memory message) public {
        messages[writer].push(message);
    }

    function readMessage(address author) public view returns (string[] memory) {
        return messages[author];
    }
}
