'use server';

import crypto from 'crypto';
import { sql } from '@vercel/postgres';
import v from 'validator';
import z from 'zod';
import { CODE_DB_UNIQUE_VIOLATION } from '@/utils/constants';

const validator = z.object({
  id: z.string().uuid(),
  name: z.string().trim().min(3).max(255).transform(v.escape),
}).strict();
export default async function createCollection(prevState, form) {
  const formData = {
    id: crypto.randomUUID(),
    name: form.get('name'),
  };

  const validationResult = await validator.safeParseAsync(formData);
  if (!validationResult.success) {
    return {
      messages: validationResult.error.issues.map((issue =>
        `${issue.path[0]}.${issue.code}`
      ))
    };
  }

  try {
    const { data } = validationResult;
    await sql`
      INSERT INTO collection(id, name)
      VALUES(${data.id}, ${data.name});
    `;
  } catch (ex) {
    console.error(`[Error][createCollection]`, ex);

    if (ex.code && ex.code === CODE_DB_UNIQUE_VIOLATION) {
      return {
        messages: [
          "Collection with the same name already exists.",
        ],
      };
    }

    return {
      messages: [
        "Server error"
      ],
    };
  }

  return {
    alertStatus: 'success',
    messages: [
      "Collection saved.",
    ],
  };
}