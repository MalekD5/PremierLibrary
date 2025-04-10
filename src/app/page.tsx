import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Image from "next/image";
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await auth.api.getSession({
    headers: headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return (
    <div>
      {session.user?.name}
    </div>
  );
}
