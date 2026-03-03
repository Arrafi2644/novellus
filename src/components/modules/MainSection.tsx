

// import { serverFetch } from '@/utils/server-fetch'
// import { ICategory, IFood } from '@/types'
// import ClientMainSection from './ClientMainSection'

// export const dynamic = 'force-dynamic'
// export enum CategoryStatus {
//   ACTIVE = "ACTIVE",
//   INACTIVE = "INACTIVE",
// }

// export default async function MainSection() {
//   const categoriesRes = await serverFetch.get("/category/all-categories?limit=300")
//   const foodsRes = await serverFetch.get("/food/all-foods?limit=500&status=ACTIVE")

//   const categoriesData = await categoriesRes.json()
//   const foodsData = await foodsRes.json()

//   const popular: ICategory = {
//     _id: "popular-foods1234",
//     title: "Popular",
//     slug: "popular",
//     description: "Most selling and trending foods",
//     image: "https://res.cloudinary.com/dog2ins5h/image/upload/v1769358386/5yc3j878m28-1769358383644-vegetarian-buddha-bowl-raw-vegetables-baked-potatoes-bowl-vegan-meal-healthy-detox-food-concept-webp.webp.webp",
//     status: CategoryStatus.ACTIVE
//   }

//   const showcaseCategories = [popular, ...(categoriesData.data || [])]

//   return (
//     <div className='relative' id='home-page-main-section'>

//     <ClientMainSection
//       categories={showcaseCategories}
//       foods={foodsData?.data || []}
//       />
//       </div>
//   )
// }

// --------------------------------------------------------------------
// "use client"

// import { ICategory, IFood } from '@/types'
// import ClientMainSection from './ClientMainSection'
// import { useFood } from '@/context/FoodContext'

// export const dynamic = 'force-dynamic'
// export enum CategoryStatus {
//   ACTIVE = "ACTIVE",
//   INACTIVE = "INACTIVE",
// }

// export default function MainSection() {
//    const { foods, categories, searchTerm } = useFood()

//   const popular: ICategory = {
//     _id: "popular-foods1234",
//     title: "Popular",
//     slug: "popular",
//     description: "Most selling and trending foods",
//     image: "https://res.cloudinary.com/dog2ins5h/image/upload/v1769358386/5yc3j878m28-1769358383644-vegetarian-buddha-bowl-raw-vegetables-baked-potatoes-bowl-vegan-meal-healthy-detox-food-concept-webp.webp.webp",
//     status: CategoryStatus.ACTIVE
//   }

//   const showcaseCategories = [ ...(categories || []), popular]

//   return (
//     <div className='relative' id='home-page-main-section'>

//     <ClientMainSection
//       categories={showcaseCategories}
//       foods={foods || []}
//       searchTerm={searchTerm}
//       />
//       </div>
//   )
// }


"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import ClientMainSection from './ClientMainSection'
import { ICategory, IFood } from '@/types'
import { useFood } from '@/context/FoodContext'
import { clearCart } from "@/utils/cart-helper"
import OrderCompleteDialog from "./OrderCompleteDialog"
import OrderFailedDialog from "./FailedOrderDialog"

export const dynamic = 'force-dynamic'
export enum CategoryStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export default function MainSection() {
  const { foods, categories, searchTerm } = useFood()
  const searchParams = useSearchParams()
  const router = useRouter()

  const [modalOpen, setModalOpen] = useState(false)
  const [failedModalOpen, setFailedModalOpen] = useState(false)
  const [order, setOrder] = useState<any>(null)

  // const popular: ICategory = {
  //   _id: "popular-foods1234",
  //   title: "Popular",
  //   slug: "popular",
  //   showOrder: 100,
  //   description: "Most selling and trending foods",
  //   image: "https://res.cloudinary.com/dog2ins5h/image/upload/v1769358386/5yc3j878m28-1769358383644-vegetarian-buddha-bowl-raw-vegetables-baked-potatoes-bowl-vegan-meal-healthy-detox-food-concept-webp.webp.webp",
  //   status: CategoryStatus.ACTIVE
  // }

  // const showcaseCategories = [...(categories || []), popular]
  const showcaseCategories = categories || []

  // -------------------------------
  // 🔹 Stripe / Payment Success Modal
  // -------------------------------
  useEffect(() => {
    const paymentSuccess = searchParams.get("paymentSuccess")
    const orderId = searchParams.get("orderId")

    if (paymentSuccess === "true" && orderId) {
      // Clear cart cookie
      clearCart()

      const fetchOrder = async () => {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order/${orderId}`)
          const data = await res.json()
          setOrder(data.data)
          setModalOpen(true)
        } catch (err) {
          console.error("Failed to fetch order", err)
        }
      }

      fetchOrder()
    }
    if (paymentSuccess === "false") {
      const fetchOrder = async () => {
        setFailedModalOpen(true)
      }

      fetchOrder()
    }

  }, [searchParams])

  const handleModalClose = () => {
    setModalOpen(false)
    router.replace("/")
  }

  const handleFailedModalClose = () => {
    setFailedModalOpen(false)
    router.replace("/")
  }

  return (
    <div className='relative' id='home-page-main-section'>
      <ClientMainSection
        categories={showcaseCategories}
        foods={foods || []}
        searchTerm={searchTerm}
      />

      {/* Order Complete Modal */}
      {order && (
        <OrderCompleteDialog
          open={modalOpen}
          onClose={handleModalClose}
          order={order}
        />
      )}

      <OrderFailedDialog
        open={failedModalOpen}
        onClose={handleFailedModalClose}
        errorMessage="Payment failed."
      />
    </div>
  )
}