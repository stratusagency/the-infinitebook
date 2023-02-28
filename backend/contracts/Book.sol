// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Book {
    address[] public writers;
    mapping(address => string[]) public messages;

    function writeMessage(address writer, string memory message) public {
        // Add writer to the list if it's unknown
        if (!addressExists(writer)) writers.push(writer);

        // add its new message
        messages[writer].push(message);
    }

    function readMessage(address author) public view returns (string[] memory) {
        // Read all messages from an author
        return messages[author];
    }

    function getMessages() public view returns (string[] memory) {
        uint256 totalMessages = writers.length;
        for (uint256 i = 0; i < writers.length; i++) {
            totalMessages += messages[writers[i]].length;
        }

        // Recovering all messages existing
        string[] memory allMessages = new string[](totalMessages);
        uint256 index = 0;

        // Mapping each writer
        for (uint256 i = 0; i < writers.length; i++) {
            address writer = writers[i];
            string[] memory authorMessages = messages[writer];

            // Mapping each message of each writer
            for (uint256 j = 0; j < authorMessages.length; j++) {
                allMessages[index] = authorMessages[j];
                index++;
            }
        }

        return allMessages;
    }

    function addressExists(address addr) private view returns (bool) {
        for (uint256 i = 0; i < writers.length; i++) {
            if (writers[i] == addr) {
                return true;
            }
        }
        return false;
    }
}
