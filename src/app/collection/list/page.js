import { Providers } from "@/app/providers";
import SearchInput from "@/components/SearchInput";
import { Container, Divider } from "@chakra-ui/react";
import { CollectionList } from "../Collection.server";
import CollectionsListRenderer from "@/components/CollectionsList";
import FormCreateCollection from "@/components/FormCreateCollection";

export default function ListCollectionPage({ searchParams }) {
  const { q } = searchParams;

  return (
    <Providers>
      <Container className="my-4">
        <FormCreateCollection></FormCreateCollection>
        <Divider className="my-4"></Divider>
        <SearchInput withQuery initialValue={q}></SearchInput>
      </Container>
      <CollectionList
        Renderer={CollectionsListRenderer}
        filters={{ query: q }}
      ></CollectionList>
    </Providers>
  );
}