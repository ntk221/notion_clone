import React from "react";
import {
  Box,
  Flex,
  Text,
  VStack,
  Stack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from "@chakra-ui/react";

type SideBarProps = {
  username: string;
  notes: string[];
  onNoteClick: (note: string) => void;
};

const SideBar: React.FC<SideBarProps> = ({
  username,
  notes,
  onNoteClick,
}) => {
  return (
    <Box w="250px" h="100vh" borderRight="1px" borderColor="gray.200" px="4">
      <Flex alignItems="center" mt="4">
        <Text fontSize="xl" fontWeight="bold">
          {username}
        </Text>
      </Flex>
      <Box mt="8">
        <Stack mt="4">
          {notes.length > 0 ? (
            <Accordion allowToggle>
              <AccordionItem>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                        Notes
                    </Box>
                  </AccordionButton>
                <AccordionPanel pb={4}>
                  <VStack>
                    {notes.map((note) => (
                      <Text
                        key={note}
                        as="button"
                        color="blue.500"
                        onClick={() => onNoteClick(note)}
                      >
                        {note}
                      </Text>
                    ))}
                  </VStack>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          ) : (
            <Text color="gray.400">No notes yet.</Text>
          )}
        </Stack>
      </Box>
    </Box>
  );
};

export default SideBar;