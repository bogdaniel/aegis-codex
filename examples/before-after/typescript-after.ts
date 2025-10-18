import { z } from "zod";

const User = z.object({
  id: z.string(),
  email: z.string().email(),
});
export type User = z.infer<typeof User>;

export async function fetchUser(id: string): Promise<User> {
  const res = await fetch(`/api/users/${encodeURIComponent(id)}`);
  if (!res.ok) throw new Error(`Failed to fetch user: ${res.status}`);
  const json = await res.json();
  return User.parse(json);
}
