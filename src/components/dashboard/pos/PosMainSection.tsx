
import CategoryWiseFoodSection from "@/components/modules/CategoryWiseFoodSection"
import { Separator } from "@radix-ui/react-separator"
import PosCartSidebar from "./PosCartSidebar"
import PosCategoryNavbar from "./PosCategoryNavbar"
import { IFood } from "@/types"
import PosProductsSection from "./PosProductsSection"


function PosMainSection({foods}: any) {

    return (
        <section className=''>
            <Separator className='shadow sticky top-28 z-50' />
            <div className=" w-full mx-auto grid grid-cols-12 gap-4 mt-6 relative">
                {/* LEFT */}
                <div className="col-span-12 lg:col-span-8 relative">
                    <PosProductsSection foods={foods} />
                </div>

                {/* RIGHT */}
                <div className="hidden lg:block lg:col-span-4">
                    <PosCartSidebar />
                </div>
            </div>
        </section>

    )
}

export default PosMainSection