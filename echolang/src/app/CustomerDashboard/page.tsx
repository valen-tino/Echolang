"use client"

import React from 'react'
import { useSession } from 'paket/hooks/use-session';
import { useRouter } from 'next/navigation';

export default function CustomerDashboard() {
    const { handleSignOut } = useSession();
    const router = useRouter();

    const onSignOut = async () => {
        await handleSignOut();
        router.push('/login');
    }

  return (
    <div>
        Welcome to the customer dashboard.
        <h2>Log out?</h2>
        <button onClick={onSignOut}>Sign Out</button>
    </div>
  )
}
