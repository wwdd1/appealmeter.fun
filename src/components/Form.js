'use client';

import { useFormState } from "react-dom";
import { Stack, Card, Alert, List, ListItem, AlertDescription } from "@chakra-ui/react";

export default function Form({ children, action }) {

  const [state, formAction] = useFormState(action, {
    messages: [],
  });

  return (
    <form className="my-4" action={formAction}>
      <Card className="max-w-[600px] mx-auto p-2">
        {
          state.messages.length > 0 &&
          <Alert status={state.alertStatus || 'error'} className="mb-4">
            <AlertDescription>
              <List>
                {
                  state.messages.map(msg => (
                    <ListItem key={msg}>{ msg }</ListItem>
                  ))
                }
              </List>
            </AlertDescription>
          </Alert>
        }
        <Stack>
          { children }
        </Stack>
      </Card>
    </form>
  )
}
