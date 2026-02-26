

import { serverFetch } from '@/utils/server-fetch'
import { ICategory, IFood } from '@/types'
import ClientMainSection from './ClientMainSection'

export const dynamic = 'force-dynamic'
export enum CategoryStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export default async function MainSection() {
  const categoriesRes = await serverFetch.get("/category/all-categories?limit=300")
  const foodsRes = await serverFetch.get("/food/all-foods?limit=500&status=ACTIVE")

  const categoriesData = await categoriesRes.json()
  const foodsData = await foodsRes.json()

  const popular: ICategory = {
    _id: "popular-foods1234",
    title: "Popular",
    slug: "popular",
    description: "Most selling and trending foods",
    image: "https://res.cloudinary.com/dog2ins5h/image/upload/v1769358386/5yc3j878m28-1769358383644-vegetarian-buddha-bowl-raw-vegetables-baked-potatoes-bowl-vegan-meal-healthy-detox-food-concept-webp.webp.webp",
    status: CategoryStatus.ACTIVE
  }

  const showcaseCategories = [popular, ...(categoriesData.data || [])]

  return (
    <div className='relative' id='home-page-main-section'>

    <ClientMainSection
      categories={showcaseCategories}
      foods={foodsData?.data || []}
      />
      </div>
  )
}