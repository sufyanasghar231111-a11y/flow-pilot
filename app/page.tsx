import { getCurrentUser } from "@/libs/auth/getCurrentUser";

export default async function Home() {
  await getCurrentUser()
  return (
    <div>

    </div>
  );
}
