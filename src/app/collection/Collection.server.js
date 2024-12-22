import { sql } from '@vercel/postgres';

export async function CollectionList({ Renderer, filters }) {

  if (!Renderer) {
    throw new TypeError("Renderer component is not defined.");
  }

  let rows = [];
  if (filters.query) {
    const nameFilterQuery = `%${filters.query.trim()}%`;
    const result = await sql`SELECT * FROM collection WHERE name ILIKE ${nameFilterQuery} ORDER BY name DESC`;
    rows = result.rows;
  } else {
    const result = await sql`SELECT * FROM collection ORDER BY name DESC`;
    rows = result.rows;
  }

  return <Renderer collections={rows}></Renderer>;
}

export async function CollectionGetById({ Renderer, collectionId }) {
  if (!collectionId) {
    return "Collection id is not valid.";
  }

  if (!Renderer) {
    throw new TypeError("Renderer component is not defined.");
  }

  const result = await sql`
    SELECT
      c.id as id,
      c.name as name,
      array_to_json(array_agg(q.*)) as questions
    FROM collection c
      LEFT JOIN collection_question cq ON c.id = cq.collection_id
      LEFT JOIN question q ON q.id = cq.question_id
    WHERE c.id = ${collectionId}
    GROUP BY c.id, c.name;
  `;
  const [collection] = result.rows.map((collection) => {
    collection.questions = collection.questions.filter(q => q);
    return collection;
  });

  console.dir({ collection }, { depth: 8 })

  return <Renderer collection={collection}></Renderer>;
}
