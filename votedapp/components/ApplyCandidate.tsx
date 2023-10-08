import React, { useState } from 'react';
import {
  Box,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { Web3Button } from '@thirdweb-dev/react';
import { VOTING_CONTRACT } from '../const/addresses';

export default function ApplyCandidate() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [candidateName, setCandidateName] = useState('');

  return (
    <Box>
      <Button onClick={onOpen}>Apply as Candidate</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Apply as a Candidate</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={8}>
              <Text>
                Enter your name to apply as a candidate in the election.
              </Text>
              <Box>
                <Text fontWeight="bold">Your Name:</Text>
                <Input
                  placeholder="Enter your name"
                  type="text"
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                />
              </Box>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Web3Button
              contractAddress={VOTING_CONTRACT}
              action={(contract) => contract.applyAsCandidate(candidateName)}
              onSuccess={() => {
                onClose();
                setCandidateName('');
                toast({
                  title: 'Application submitted.',
                  description:
                    'You have applied as a candidate in the election.',
                  status: 'success',
                  duration: 9000,
                  isClosable: true,
                });
              }}
            >
              Apply
            </Web3Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
