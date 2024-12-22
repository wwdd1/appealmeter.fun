'use client';

import { useCollectionContext } from "@/context/useCollectionContext";
import { Heading, List, ListItem } from "@chakra-ui/react";
import { useState } from "react";

export default function Collection({ collection }) {

  if (!collection) {
    throw new Error("Collection not found"); 
  }

  const { questions } = useCollectionContext();

  return (
    <>
      <Heading>{ collection.name }</Heading>
      <List>
        {
          questions.map((question) => (
            <ListItem key={question.id}>
              { question.name }
            </ListItem>
          ))
        }
      </List>
    </>
  );
}