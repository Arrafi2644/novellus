// components/menu/ClientMenuPage.tsx

"use client"

import { useEffect, useRef, useState } from 'react'
import CategoryNavbar from './CategoryNavbar'
import CategoryWiseFoodSection from './CategoryWiseFoodSection'
import CartSidebar from './CartSidebar'
import { Separator } from '@/components/ui/separator'
import { ICategory, IFood } from '@/types'

type Props = {
  categories: ICategory[]
  foods: IFood[]
  searchTerm: string
}

export default function ClientMainSection({ categories, foods, searchTerm }: Props) {
  const sectionRef = useRef<HTMLDivElement | null>(null)

  // Scroll to section when searchTerm changes and is not empty
  useEffect(() => {
    if (searchTerm.trim().length > 0 && sectionRef.current) {
       const isMobile = window.innerWidth < 1024; // Tailwind's lg breakpoint = 1024px
    const headerOffset = isMobile ? 172 : 96; // mobile 120px, desktop 96px
      const elementPosition = sectionRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  }, [searchTerm]);
  return (
    <section ref={sectionRef} className='relative'>

      <CategoryNavbar
        categories={categories}
        foods={foods}
        searchTerm={searchTerm}
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