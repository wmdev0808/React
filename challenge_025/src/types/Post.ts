export default interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface PostInput {
  title: FormDataEntryValue | null;
  body: FormDataEntryValue | null;
}
