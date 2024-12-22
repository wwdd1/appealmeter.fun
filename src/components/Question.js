'use client';

import {
  Stack,
  Button,
  Image,
  Center,
  Text,
  Link,
  IconButton,
  HStack,
  Checkbox,
} from '@chakra-ui/react';
import { ExternalLinkIcon, DeleteIcon, AddIcon } from '@chakra-ui/icons';
import { createGoogleSearchLink, createInstagramProfileUrl } from '@/utils/url';

export default function Question({
  actionHandlers = {
    onRate: undefined,
    onDelete: undefined,
    onAdd: undefined,
  },
  fullName,
  imageSrc,
  instagram,
  googleSearchQuery,
}) {
  return (
    <Center>
      <Stack direction="column" spacing={4}>
        <Image
          className="border-solid border-4 p-2 bg-black"
          maxH={260}
          src={imageSrc}
          alt={fullName}
          objectFit="contain"
        ></Image>
        <Stack className="text-center">
          <Text fontWeight="bold" fontSize="4xl">{ fullName }</Text>
          <Link href={createInstagramProfileUrl(instagram)} isExternal>
            Instagram <ExternalLinkIcon mx="2px"></ExternalLinkIcon>
          </Link>
          <Link href={createGoogleSearchLink(googleSearchQuery)} isExternal>
            Google Images <ExternalLinkIcon mx="2px"></ExternalLinkIcon>
          </Link>
        </Stack>
        {
          actionHandlers.onRate && <Button>Rate</Button>
        }
        <HStack spacing={4} justify="center">
        {
          actionHandlers.onAdd && <IconButton
            onClick={actionHandlers.onAdd}
            aria-label="Add question to"
            size="lg"
            isRound={true}
            colorScheme="green"
            icon={<AddIcon/ >}
          ></IconButton>
        }
        {
          actionHandlers.onDelete && <IconButton
            aria-label="Delete question"
            size="lg"
            isRound={true}
            colorScheme="red"
            icon={<DeleteIcon/ >}
          ></IconButton>
        }
        </HStack>
      </Stack>
    </Center>
  );
}