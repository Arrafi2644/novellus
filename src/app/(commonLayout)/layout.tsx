import AnnouncementBar from '@/components/modules/AnnouncementBar'
import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/Navbar'
import { FoodProvider } from '@/context/FoodContext';
import { UserProvider } from '@/context/UserContext';
import { serverFetch } from '@/utils/server-fetch';
import React from 'react'

export default async function CommonLayout({ children }: { children: React.ReactNode }) {
    const categoriesRes = await serverFetch.get("/category/all-categories?limit=300")
    const foodsRes = await serverFetch.get("/food/all-foods?limit=500&status=ACTIVE")

    const categoriesData = await categoriesRes.json()
    const foodsData = await foodsRes.json()

    return (
        <div>
            <UserProvider>
                <FoodProvider foods={foodsData?.data || []} categories={categoriesData?.data || []}>
                    <AnnouncementBar />
                    <Navbar />
                    <main>
                        {children}
                    </main>
                    <Footer />
                </FoodProvider>
            </UserProvider>
        </div>
    )
}
