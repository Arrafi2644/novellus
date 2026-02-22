import FoodDetailCard from "./FoodDetailsCard"

export default function PosProductsSection({ foods }: any) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
     {foods?.map((food: any) => {
        return (
          <FoodDetailCard
            key={food._id}
            food={food}
          />
        );
      })}
    </div>
  )
}
