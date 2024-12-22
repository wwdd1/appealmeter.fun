'use client';

import { useCallback, useRef, useState } from "react";
import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useSearchContext } from "@/context/useSearchContext";
import { useRouter } from "next/navigation";

function replaceSearchQuery(router, q) {
  const { location } = window;
  const url = new URL(location.pathname, location.origin);
  url.searchParams.append('q', q);
  router.replace(url.toString());
}

export default function SearchInput({ initialValue = '', withQuery = false }) {

  let setFilters;
  if (!withQuery) {
    const searchContext = useSearchContext();
    setFilters = searchContext.setFilters;
  }

  const inputRef = useRef(null);
  const [query, setQuery] = useState(initialValue);
  const [isClear, setClear] = useState(!!query);
  const router = useRouter();

  const onKeyDown = useCallback((e) => {
    switch (e.code) {
      case "Enter":
        if (!withQuery) {
          setFilters({ query });
        } else {
          replaceSearchQuery(router, query);
        }
        break;
    }
  }, [query]);

  const onInput = useCallback((e) => {
    const { value } = e.target
    setQuery(value);
    setClear(!!value);
  }, []);

  const onClickClear = useCallback(() => {
    inputRef.current.value = '';
    setQuery('');
    setClear(false);
    replaceSearchQuery(router, '');
  }, []);

  return (
    <InputGroup>
      <Input
        value={query}
        ref={inputRef}
        onKeyDown={onKeyDown}
        onInput={onInput}
        placeholder="Search"
      ></Input>
      <InputRightElement width="4.5rem">
      {
        isClear &&
        <Button
          h="1.75rem"
          size="xs"
          onClick={onClickClear}
        >
          clear
        </Button>
      }
      </InputRightElement>
    </InputGroup>
  )
}