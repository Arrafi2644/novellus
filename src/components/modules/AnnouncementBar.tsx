"use client"
import { Typewriter } from 'react-simple-typewriter'

export default function AnnouncementBar() {
  return (
    <div className='bg-[#FF2B85] text-white font-semibold text-center py-4 px-2 md:px-4 lg:px-6'>
        {/* <p>Get 20% Off On Your First Order</p> */}
        <h2 className=" font-semibold">
              Get{' '}
              <span className="text-white">

                <Typewriter
                  words={[
                    "20% Off On Your First Order",
                    "Free Delivery Over 7€"
                  ]}
                  loop={0} // 0 = infinite
                  cursor
                  cursorStyle="|"
                  typeSpeed={100}
                  deleteSpeed={60}
                  delaySpeed={4000}
                />
              </span>
            </h2>
    </div>
  )
}
