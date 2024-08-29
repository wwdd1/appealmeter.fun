'use client'

import { Box } from "@chakra-ui/react";

import { Providers } from "./providers";
import Question from "@/components/Question";

export default function Home() {
  return (
    <Providers>
      <Box className="mt-4">
        <Question
          imageSrc="https://bit.ly/dan-abramov"
          fullName="Dan Abramov"
        ></Question>
      </Box>
    </Providers>
  )
}