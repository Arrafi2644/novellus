// components/menu/ClientMenuPage.tsx

"use client"

import { useState } from 'react'
import CategoryNavbar from './CategoryNavbar'
import CategoryWiseFoodSection from './CategoryWiseFoodSection'
import CartSidebar from './CartSidebar'
import { Separator } from '@/components/ui/separator'
import { ICategory, IFood } from '@/types'

type Props = {
  categories: ICategory[]
  foods: IFood[]
}

export default function ClientMainSection({ categories, foods }: Props) {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <section className='relative'>
      <CategoryNavbar
        categories={categories}
        foods={foods}
        onSearch={setSearchTerm}
      />

      <Separator className="shadow sticky top-62 lg:top-42 z-50" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 grid grid-cols-12 gap-6 mt-8">
        <div className="col-span-12 lg:col-span-8 relative">
          <CategoryWiseFoodSection
            categories={categories}
            foods={foods}
            searchTerm={searchTerm}
          />
        </div>

        <div className="hidden lg:block lg:col-span-4">
          <CartSidebar />
        </div>
      </div>
    </section>
  )
}