import AnnouncementBar from '@/components/modules/AnnouncementBar'
import Footer from '@/components/shared/Footer';
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
            <Footer />
            </UserProvider>
        </div>
    )
}
