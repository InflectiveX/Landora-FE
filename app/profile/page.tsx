'use client'

import UserProfile from '../../components/ui/UserProfile';
import { DashboardLayout } from '../../components/layout';

export default function ProfilePage() {
  return (
    <DashboardLayout>
      <UserProfile />
    </DashboardLayout>
  );
}
