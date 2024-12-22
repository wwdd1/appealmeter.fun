'use client';

import { useState } from 'react';
import { Button, Card, CardBody, CardHeader, Input, Heading } from "@chakra-ui/react";
import Form from "@/components/Form";
import Question from "@/components/Question";
import createQuestion from '@/actions/createQuestion';

export default function FormCreateQuestion() {

  const [name, setName] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [instagram, setInstagram] = useState('');
  const [googleSearchQuery, setGoogleSearchQuery] = useState('');

  function setValue(e, hook) {
    hook(e.target.value)
  }

  return (
    <>
      <Form action={createQuestion}>
        <Input
          name="name"
          placeholder="Fullname"
          onInput={(e) => setValue(e, setName)}
        ></Input>
        <Input
          name="photo"
          placeholder="Photo
          url"
          onInput={(e) => setValue(e, setPhotoUrl)}
        ></Input>
        <Input
          name="instagram"
          placeholder="@instagram"
          onInput={(e) => setValue(e, setInstagram)}
        ></Input>
        <Input
          name="googleSearchQuery"
          placeholder="Google search query text"
          onInput={(e) => setValue(e, setGoogleSearchQuery)}
        ></Input>
        <Button type="submit">Create Question</Button>
      </Form>

      <Card className="max-w-[600px] mx-auto p-2">
        <CardHeader>
          <Heading size="md">Preview</Heading>
        </CardHeader>
        <CardBody>
          <Question
            isPreview={true}
            imageSrc={photoUrl}
            fullName={name}
            instagram={instagram}
            googleSearchQuery={googleSearchQuery}
          ></Question>
        </CardBody>
      </Card>
    </>
  );
}
