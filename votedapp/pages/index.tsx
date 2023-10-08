import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Text,
  VStack,
  Input,
  Heading,
  StackDivider,
} from '@chakra-ui/react';
import { useContract, useContractWrite, useAddress } from '@thirdweb-dev/react';
import { VOTING_CONTRACT } from '../const/addresses';

const VotingApp = () => {
  const { contract } = useContract(VOTING_CONTRACT);
  const [candidates, setCandidates] = useState([]);
  const [newCandidateName, setNewCandidateName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [candidateIndex, setCandidateIndex] = useState(-1); // Track selected candidate index
  const address = useAddress();
  const { mutateAsync: applyAsCandidate } = useContractWrite(
    contract,
    'applyAsCandidate'
  );
  const { mutateAsync: vote } = useContractWrite(contract, 'vote');

  // Function to apply as a candidate
  const handleApplyAsCandidate = async () => {
    try {
      await applyAsCandidate({ args: [newCandidateName] });
      setNewCandidateName('');
      fetchCandidates();
    } catch (err) {
      console.error('Contract call failure', err);
    }
  };

  // Function to vote for a candidate
  const handleVote = async () => {
    if (candidateIndex >= 0) {
      try {
        await vote({ args: [candidateIndex] });
        console.info('Contract call success');
        fetchCandidates();
      } catch (err) {
        console.error('Contract call failure', err);
      }
    } else {
      console.error('Please select a candidate to vote for.');
    }
  };

  const fetchCandidates = async () => {
    setIsLoading(true);
    try {
      const candidateCount = await contract?.call('getCandidateCount');
      const candidates = [];

      for (let i = 0; i < candidateCount; i++) {
        const candidateData = await contract?.call('candidates', [i]);
        const name = candidateData[0];
        candidates.push({ name });
      }

      setCandidates(candidates);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  return (
    <Box p={4}>
      <Heading as="h1" mb={4}>
        Voting App
      </Heading>
      <VStack
        spacing={4}
        divider={<StackDivider borderColor="gray.200" />}
        align="stretch"
      >
        <Text fontWeight="bold">Apply as a Candidate:</Text>
        <Input
          type="text"
          placeholder="Enter your name"
          value={newCandidateName}
          onChange={(e) => setNewCandidateName(e.target.value)}
        />
        <Button
          colorScheme="teal"
          onClick={handleApplyAsCandidate}
          isLoading={isLoading}
        >
          Apply
        </Button>
        <Text fontWeight="bold">List of Candidates:</Text>
        {candidates.map((candidate, index) => (
          <Box key={index} display="flex" justifyContent="space-between">
            <Text>{candidate.name}</Text>
            <Button
              colorScheme="teal"
              onClick={() => {
                setCandidateIndex(index);
                handleVote();
              }}
            >
              Vote
            </Button>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default VotingApp;
