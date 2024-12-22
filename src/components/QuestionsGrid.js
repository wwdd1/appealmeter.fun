'use client';

import { Container, SimpleGrid, Alert, Card } from "@chakra-ui/react";
import Question from "@/components/Question";
import { LISTED_ITEM_ACTIONS } from "@/utils/constants";
import { bindParameterToCallbackMap } from "@/utils/callback";
import { useCollectionContext } from "@/context/useCollectionContext";

function findQuestionAndCall(questions, next) {
  return (queryId) => {
    const question = questions.find(question => question.id === queryId);
    if (question) {
      return next(question);
    }
    return null;
  }
}

export default function QuestionsGrid({
  questions,
  renderFor = LISTED_ITEM_ACTIONS.VIEW,
}) {
  const questionActionHandlers = {};

  if (!questions || questions.length === 0) {
    return (
      <Container className="my-4">
        <Alert>No questions found.</Alert>
      </Container>
    );
  }

  if (renderFor === LISTED_ITEM_ACTIONS.EDIT) {
    const {
      addQuestion
    } = useCollectionContext();

    questionActionHandlers.onAdd = findQuestionAndCall(questions, addQuestion);
    // questionActionHandlers.onDelete = questionDeleteHandler;
  }

  return (
    <SimpleGrid columns={2} spacing='40px' className="m-4">
      {
        questions.map(question => (
          <Card key={question.id} className="p-6">
            <Question
              actionHandlers={bindParameterToCallbackMap(question.id, questionActionHandlers)}
              fullName={question.name}
              imageSrc={question.photo}
              instagram={question.instagram}
              googleSearchQuery={question.google_search_q}
            ></Question>
          </Card>
        ))
      }
    </SimpleGrid>
  );
}
