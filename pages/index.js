import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      router.replace(token ? '/dashboard' : '/login');
    } catch {
      router.replace('/login');
    }
  }, [router]);
  return null;
}
