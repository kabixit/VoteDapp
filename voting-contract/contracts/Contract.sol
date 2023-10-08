// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Voting {
    struct Candidate {
        string name;
        uint voteCount;
    }

    Candidate[] public candidates;
    mapping(address => bool) public voters;
    mapping(address => bool) public candidateApplications; // Track candidate applications

    constructor() {
        // Initialize the contract with an empty list of candidates
    }

    function applyAsCandidate(string memory candidateName) public {
        require(!voters[msg.sender], "You cannot apply as a candidate after voting.");
        require(!candidateApplications[msg.sender], "You already applied as a candidate.");
        
        candidates.push(Candidate(candidateName, 0));
        candidateApplications[msg.sender] = true;
    }

    function vote(uint candidateIndex) public {
        require(!voters[msg.sender], "You already voted.");
        require(candidateIndex < candidates.length, "Invalid candidate index.");

        candidates[candidateIndex].voteCount++;
        voters[msg.sender] = true;
    }

    // Function to get the count of candidates
    function getCandidateCount() public view returns (uint) {
        return candidates.length;
    }
}
