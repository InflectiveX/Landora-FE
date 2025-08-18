'use client'

import TransactionHistory from '../../components/ui/TransactionHistory';
import { DashboardLayout } from '../../components/layout';

export default function TransactionsPage() {
  return (
    <DashboardLayout>
      <TransactionHistory />
    </DashboardLayout>
  );
}
