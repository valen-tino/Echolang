"use client"

import { useSession } from 'paket/hooks/use-session';
import React from 'react'

export default function AdminDashboard() {
    const { handleSignOut } = useSession();
    
    const onSignOut = async () => {
        await handleSignOut();
    }

  return (
    <div>
        Welcome to the admin dashboard.
        <h2>Log out?</h2>
        <button onClick={onSignOut}>Sign Out</button>
    </div>
  )
}
