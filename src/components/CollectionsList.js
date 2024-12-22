'use client';

import NextLink from "next/link";
import {
  Container,
  Link,
  Alert,
  List,
  ListItem,
  Button,
  ButtonGroup,
  IconButton,
} from "@chakra-ui/react";
import { ArrowForwardIcon, DeleteIcon } from "@chakra-ui/icons";

export default function CollectionsList({ collections }) {
  if (!collections || collections.length === 0) {
    return (
      <Container className="my-4">
        <Alert>No collections found.</Alert>
      </Container>
    );
  }

  return (
    <Container>
      <List spacing={3}>
        {
          collections.map(collection => (
            <ListItem key={collection.id}>
              <ButtonGroup isAttached>
                <Link as={NextLink} href={`/collection/${collection.id}`}>
                  <Button
                    leftIcon={<ArrowForwardIcon/>}
                    variant="ghost"
                  >
                    { collection.name }
                  </Button>
                </Link>
                <IconButton
                  icon={<DeleteIcon />}
                  color="red"
                  variant="ghost"
                ></IconButton>
              </ButtonGroup>
            </ListItem>
          ))
        }
      </List>
    </Container>
  );
}