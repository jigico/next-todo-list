export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const response = await fetch(`http://localhost:4000/todos/${id}`, {
    method: "DELETE"
  });
  const data = await response.json();
  return Response.json({ data });
}
