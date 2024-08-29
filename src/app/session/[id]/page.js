export default function SessionPage({ params }) {
  const { id: sessionId } = params

  return (
    <div>Session: { sessionId }</div>
  )
}
