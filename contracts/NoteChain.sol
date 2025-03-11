// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract NoteChain {
    struct Note {
        address owner;
        string content;
        uint256 timestamp;
    }

    Note[] public notes;

    event NoteAdded(address indexed owner, string content, uint256 timestamp);

    function addNote(string memory _content) public {
        notes.push(Note(msg.sender, _content, block.timestamp));
        emit NoteAdded(msg.sender, _content, block.timestamp);
    }

    function getNotes() public view returns (Note[] memory) {
        return notes;
    }
}