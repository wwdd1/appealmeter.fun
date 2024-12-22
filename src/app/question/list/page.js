import { Container } from "@chakra-ui/react";

import { Providers } from "@/app/providers";
import QuestionsGrid from "@/components/QuestionsGrid";
import { QuestionList } from "../Question.server";
import SearchInput from "@/components/SearchInput";

export default function ListQuestionPage({ searchParams }) {
  const { q } = searchParams;

  return (
    <Providers>
      <Container className="my-4">
        <SearchInput
          initialValue={q}
          withQuery={true}
        ></SearchInput>
      </Container>
      <QuestionList
        Renderer={QuestionsGrid}
        filters={{ query: q }}
      ></QuestionList>
    </Providers>
  );
}
