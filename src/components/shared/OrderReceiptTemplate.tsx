
// "use client";

// import { format } from "date-fns";
// import Image from "next/image";
// import logo from "../../../public/assets/logo-112.png";

// interface OrderReceiptTemplateProps {
//   order: any;
// }

// export const OrderReceiptTemplate = ({ order }: OrderReceiptTemplateProps) => {
//   if (!order) return null;

//   return (
//     <div className="flex flex-col px-1">
//       <div className="flex flex-col items-center mt-2">
//         <div>
//           <Image src={logo} alt="Pizzeria Novellus" width={80} height={80} />
//         </div>
//         <h2 className="text-[16px] font-bold uppercase tracking-tighter">
//           Pizzeria Novellus
//         </h2>
//         <p className="text-[10px] italic">Delicious Pizza Ordering App</p>
//       </div>

//       <div className="w-full border-b border-black my-1"></div>

//       <div className="w-full space-y-1">
//         <div className="flex justify-between font-bold">
//           <span>ORDER ID:</span>
//           <span>#{order.customOrderId || order._id.slice(-6)}</span>
//         </div>

        // <div className="border-t border-black border-dotted pt-1 flex flex-wrap justify-between gap-2">
        //   <p className="font-bold">CUSTOMER:</p>
        //   <p className="capitalize text-[13px]">{order.user?.name || "Guest Customer"}</p>
        // </div>

        // <div className="pt-1 flex flex-wrap justify-between gap-2">
        //   <p className="font-bold">PHONE:</p>
        //   <p className="capitalize text-[13px]">{order.user?.phone || "N/A"}</p>
        // </div>

        // <div className="pt-1 flex flex-wrap justify-between gap-2">
        //   <p className="font-bold">EMAIL:</p>
        //   <p className="capitalize text-[13px]">{order.user?.email || "N/A"}</p>
        // </div>

        // <div className="pt-1 pb-1 flex flex-wrap justify-between gap-2">
        //   <p className="font-bold">DELIVERY TO:</p>
        //   {order.deliveryAddress && (
        //     <p className="text-[12px] leading-tight font-semibold">
        //       {order.deliveryAddress}
        //     </p>
        //   )}
        // </div>

//         <div className="border-t border-black border-dotted pt-1 pb-1 flex flex-wrap justify-between gap-2">
//           <p className="font-bold">DELIVERY OPTION:</p>
//           <p className="font-bold uppercase text-[11px] border border-black px-1 inline-block mb-1">
//             {order.deliveryOption}
//           </p>
//         </div>
//       </div>

//       <div className="w-full border-b-2 border-black my-1"></div>

//       <div className="w-full">
//         <div className="flex justify-between font-bold mb-1 border-b border-black">
//           <span>ITEM</span>
//           <span>PRICE</span>
//         </div>

//         {order.foods?.map((item: any, idx: number) => (
//           <div key={idx} className="mb-2">
//             <div className="flex justify-between items-start">
//               <span className="w-[70%] capitalize font-bold text-[13px]">
//                 {item.quantity}x {item.food.name}
//               </span>
//               <span className="w-[30%] text-right font-bold">
//                 €{item.lineTotal.toFixed(2)}
//               </span>
//             </div>

//             {item.ingredients?.length > 0 && (
//               <div className="text-[10px] text-black pl-1 italic leading-none mt-1">
//                 + {item.ingredients.map((ing: any) => ing.name).join(", ")}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>

//       <div className="w-full border-b-2 border-black my-1"></div>

//       <div className="w-full space-y-1">
//         <div className="flex justify-between text-[15px] font-bold py-1 border-y border-black">
//           <span>GRAND TOTAL</span>
//           <span>€{order.totalPrice.toFixed(2)}</span>
//         </div>

//         <div className="text-[11px] flex justify-between pt-1">
//           <span>Payment:</span>
//           <span className="font-bold uppercase">{order.payment?.paymentMethod}</span>
//         </div>
//       </div>

//       <div className="w-full border-b border-black my-2"></div>

//       <p className="text-[10px] text-center font-bold">
//         {format(new Date(order.createdAt), "dd MMM yyyy, hh:mm a")}
//       </p>
//       <p className="text-center mt-3 font-extrabold text-[14px]">*** THANK YOU ***</p>

//       <div className="h-12 text-center text-[10px] pt-2">. . . . . . . . . . . . . . . .</div>
//     </div>
//   );
// };