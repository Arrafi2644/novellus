"use client"

import { createContext, useContext, useState } from "react"
import { ICategory, IFood } from "@/types"

type FoodContextType = {
  foods: IFood[]
  categories: ICategory[]
  searchTerm: string
  setSearchTerm: (term: string) => void
}

const FoodContext = createContext<FoodContextType | null>(null)

export function FoodProvider({
  children,
  foods,
  categories
}: {
  children: React.ReactNode
  foods: IFood[]
  categories: ICategory[]
}) {

  const [searchTerm, setSearchTerm] = useState("")

  console.log(searchTerm)

  return (
    <FoodContext.Provider value={{
      foods,
      categories,
      searchTerm,
      setSearchTerm
    }}>
      {children}
    </FoodContext.Provider>
  )
}

export function useFood() {
  const context = useContext(FoodContext)
  if (!context) {
    throw new Error("useFood must be used inside FoodProvider")
  }
  return context
}