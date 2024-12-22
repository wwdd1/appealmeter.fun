'use server';

import crypto from 'crypto';
import { sql } from "@vercel/postgres";
import v from 'validator';
import z from 'zod';

const validator = z.object({
  id: z.string().uuid(),
  name: z.string().trim().min(3).max(255).transform(v.escape),
  photo: z.string().trim().min(20),
  instagram: z.string().trim().min(3).max(255).transform(v.escape),
  google_search_q: z.string().trim().min(3).max(255).transform(v.escape),
}).strict();

export default async function createQuestion(prevState, form) {
  const formData = {
    id: crypto.randomUUID(),
    name: form.get('name'),
    photo: form.get('photo'),
    instagram: form.get('instagram'),
    google_search_q: form.get('googleSearchQuery'),
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
    const { status, headers } = await fetch(formData.photo, {
      method: 'HEAD',
    });
    const mimeType = headers.get('content-type');
    if (status !== 200 || !mimeType.startsWith('image/')) {
      return {
        messages: ["Photo url is invalid."],
      };
    }
  } catch (ex) {
    console.error(`[Error][createQuestion]`, ex);
    return {
      messages: ["Photo url is invalid."],
    };
  }

  try {
    const { data } = validationResult;
    await sql`
      INSERT INTO question(id, name, photo, instagram, google_search_q)
      VALUES(${data.id}, ${data.name}, ${data.photo}, ${data.instagram}, ${data.google_search_q});
    `;
  } catch (ex) {
    console.error(`[Error][createQuestion]`, ex);
    return {
      messages: [
        "Server error"
      ],
    };
  }

  return {
    alertStatus: 'success',
    messages: [
      "Question saved.",
    ],
  };
}
