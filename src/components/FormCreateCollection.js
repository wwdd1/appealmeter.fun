'use client';

import { Input, Button } from "@chakra-ui/react";
import Form from "@/components/Form";
import createCollection from "@/actions/createCollection";

export default function FormCreateCollection() {
  return (
    <Form action={createCollection}>
      <Input
        name="name"
        placeholder="Name"
      ></Input>
      <Button type="submit">Create Collection</Button>
    </Form>
  );
}