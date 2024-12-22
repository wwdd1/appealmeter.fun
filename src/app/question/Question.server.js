import 'server-only';
import { sql } from '@vercel/postgres';
import withRenderer from '@/components/hoc/withRenderer';

async function RenderQuestionList({ Renderer, rendererProps, filters }) {
  let rows = [];
  if (filters.query) {
    const nameFilterQuery = `%${filters.query.trim()}%`;
    const result = await sql`SELECT * from question WHERE name ILIKE ${nameFilterQuery}`;
    rows = result.rows;
  } else {
    const result = await sql`SELECT * from question`;
    rows = result.rows;
  }

  return <Renderer questions={rows} {...rendererProps}></Renderer>;
}

export const QuestionList = withRenderer(RenderQuestionList);
