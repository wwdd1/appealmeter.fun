import { Providers } from "@/app/providers";
import { CollectionGetById } from "../Collection.server";
import Collection from "@/components/Collection";
import { Divider } from "@chakra-ui/react";
import SearchInput from "@/components/SearchInput";
import QuestionsGrid from "@/components/QuestionsGrid";
import { QuestionList } from "@/app/question/Question.server";
import { LISTED_ITEM_ACTIONS } from "@/utils/constants";
import { CollectionContextProvider } from "@/context/useCollectionContext";

export default function CollectionDetailsPage({ params, searchParams }) {
  const { id } = params;
  const { q } = searchParams;

  return (
    <Providers>
      <CollectionContextProvider>
        <div className="my-4 mx-8">
          <CollectionGetById
            Renderer={Collection}
            collectionId={id}
          ></CollectionGetById>
          <Divider className="my-4"></Divider>
          <SearchInput
            initialValue={q}
            withQuery={true}
          ></SearchInput>
          <QuestionList
            Renderer={QuestionsGrid}
            rendererProps={{
              renderFor: LISTED_ITEM_ACTIONS.EDIT,
            }}
            filters={{ query: q }}
          ></QuestionList>
        </div>
      </CollectionContextProvider>
    </Providers>
  );
}
