'use client';

import {
  Stack,
  Button,
  Image,
  Center,
  Text,
} from '@chakra-ui/react';

export default function Question({
  fullName,
  imageSrc,
}) {
  return (
    <Center>
      <Stack direction="column" spacing={4}>
        <Image src={imageSrc} alt={fullName}></Image>
        <Text className="text-center" fontWeight="bold" fontSize="4xl">{ fullName }</Text>
        <Button>Rate</Button>
      </Stack>
    </Center>
  );
}