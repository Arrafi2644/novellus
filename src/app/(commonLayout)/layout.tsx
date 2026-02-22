import AnnouncementBar from '@/components/modules/AnnouncementBar'
import Navbar from '@/components/shared/Navbar'
import { UserProvider } from '@/context/UserContext';
import React from 'react'

export default async function CommonLayout({ children }: { children: React.ReactNode }) {


    return (
        <div>
            <UserProvider>
            <AnnouncementBar />
            <Navbar/>
            <main>
                {children}
            </main>
            </UserProvider>
        </div>
    )
}
