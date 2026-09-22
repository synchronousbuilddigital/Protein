import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import Navbar from '../components/Navbar';
import { auth } from '@/lib/auth';
import AccountDashboard from './AccountDashboard';

export default async function AccountPage() {
  const reqHeaders = await headers();
  const session = await auth.api.getSession({
    headers: reqHeaders,
  });

  if (!session || !session.user) {
    redirect('/login');
  }

  const user = session.user;

  return (
    <div className="min-h-screen bg-[#FBF7F1] flex flex-col">
      <Navbar />
      <AccountDashboard user={user} />
    </div>
  );
}
