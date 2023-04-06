export async function action({ request }: { request: Request }) {
  const data = await request.formData();
  console.log(data.get("email"));

  // send to backend server etc.
  return null;
}
