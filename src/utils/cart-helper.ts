// // utils/cart.ts
// export interface CartItem {
//   id: string;           // food._id
//   name: string;
//   price: number;
//   quantity: number;
//   image?: string;
// }

// const CART_COOKIE_NAME = "cart_items";
// const COOKIE_MAX_AGE_DAYS = 7;

// function getCookie(name: string): string | undefined {
//   if (typeof window === "undefined") return undefined;

//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop()?.split(";").shift();
//   return undefined;
// }

// function setCookie(name: string, value: string, days: number = COOKIE_MAX_AGE_DAYS) {
//   if (typeof window === "undefined") return;

//   const date = new Date();
//   date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
//   const expires = `expires=${date.toUTCString()}`;
//   document.cookie = `${name}=${value}; ${expires}; path=/; SameSite=Strict`;
// }

// export function getCart(): CartItem[] {
//   const cartJson = getCookie(CART_COOKIE_NAME);
//   if (!cartJson) return [];

//   try {
//     return JSON.parse(cartJson) as CartItem[];
//   } catch {
//     return [];
//   }
// }

// export function addToCart(food: { id: string; name: string; price: number; image?: string }, quantity = 1): CartItem[] {
//   const currentCart = getCart();

//   const existingIndex = currentCart.findIndex((item) => item.id === food.id);

//   let updatedCart: CartItem[];

//   if (existingIndex !== -1) {
//     // increment quantity
//     updatedCart = currentCart.map((item, idx) =>
//       idx === existingIndex ? { ...item, quantity: item.quantity + quantity } : item
//     );
//   } else {
//     // add new item
//     updatedCart = [
//       ...currentCart,
//       {
//         id: food.id,
//         name: food.name,
//         price: food.price,
//         quantity,
//         image: food.image,
//       },
//     ];
//   }

//   setCookie(CART_COOKIE_NAME, JSON.stringify(updatedCart));
//   return updatedCart;
// }

// export function updateItemQuantity(id: string, newQuantity: number): CartItem[] | null {
//   if (newQuantity < 1) {
//     return removeFromCart(id);
//   }

//   const currentCart = getCart();
//   const updatedCart = currentCart.map((item) =>
//     item.id === id ? { ...item, quantity: newQuantity } : item
//   );

//   setCookie(CART_COOKIE_NAME, JSON.stringify(updatedCart));
//   return updatedCart;
// }

// export function removeFromCart(id: string): CartItem[] {
//   const currentCart = getCart();
//   const updatedCart = currentCart.filter((item) => item.id !== id);

//   if (updatedCart.length === 0) {
//     // optional: remove cookie completely
//     if (typeof window !== "undefined") {
//       document.cookie = `${CART_COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
//     }
//   } else {
//     setCookie(CART_COOKIE_NAME, JSON.stringify(updatedCart));
//   }

//   return updatedCart;
// }

// export function clearCart(): void {
//   if (typeof window !== "undefined") {
//     document.cookie = `${CART_COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
//   }
// }

// "use server";

// import { cookies } from "next/headers";

// export interface CartItem {
//   id: string;
//   name: string;
//   price: number;
//   quantity: number;
//   image?: string;
// }

// const CART_KEY = "cart_items";

// export async function getCart(): Promise<CartItem[]> {
//   const cookieStore = await cookies();
//   const cart = cookieStore.get(CART_KEY);
//   return cart ? JSON.parse(cart.value) : [];
// }

// export async function addToCart(
//   food: Omit<CartItem, "quantity">,
//   qty: number = 1
// ) {
//   const cookieStore = await cookies();
//   const cart = await getCart();

//   const existing = cart.find(item => item.id === food.id);

//   if (existing) {
//     existing.quantity += qty;
//   } else {
//     cart.push({ ...food, quantity: qty });
//   }

//   cookieStore.set(CART_KEY, JSON.stringify(cart), {
//     path: "/",
//     httpOnly: false,
//   });
// }

// export async function updateQuantity(id: string, qty: number) {
//   const cookieStore = await cookies();
//   let cart = await getCart();

//   if (qty < 1) {
//     cart = cart.filter(item => item.id !== id);
//   } else {
//     cart = cart.map(item =>
//       item.id === id ? { ...item, quantity: qty } : item
//     );
//   }

//   if (cart.length === 0) {
//     cookieStore.delete(CART_KEY);
//   } else {
//     cookieStore.set(CART_KEY, JSON.stringify(cart), {
//       path: "/",
//       httpOnly: false,
//     });
//   }
// }

// // 
// export async function removeFromCart(id: string): Promise<CartItem[]> {
//   const cookieStore = await cookies();
//   let cart = await getCart();
//   cart = cart.filter(item => item.id !== id);

//   if (cart.length === 0) {
//     cookieStore.delete(CART_KEY);
//   } else {
//     cookieStore.set(CART_KEY, JSON.stringify(cart), {
//       path: "/",
//       httpOnly: false,
//     });
//   }

//   return cart; // <-- return updated cart
// }




// // ----------------------------------------------------------------------------------------------------
// export interface CartItem {
//   id: string;
//   name: string;
//   price: number;
//   category?: string;
//   quantity: number;
//   image?: string;
//   ingredients?: {
//     name: string,
//     price: number
//   }[]
// }

// const CART_KEY = "cart_items";

// export function getCart(): CartItem[] {
//   if (typeof window === "undefined") return [];
//   const cookie = document.cookie
//     .split("; ")
//     .find(row => row.startsWith(CART_KEY + "="));
//   if (!cookie) return [];
//   try {
//     return JSON.parse(cookie.split("=")[1]);
//   } catch {
//     return [];
//   }
// }

// function setCartCookie(cart: CartItem[]) {
//   if (typeof window === "undefined") return;
//   document.cookie = `${CART_KEY}=${JSON.stringify(cart)}; path=/; SameSite=Strict`;
// }

// export function addToCart(food: Omit<CartItem, "quantity">, qty = 1): CartItem[] {
//   const cart = getCart();
//   const existing = cart.find(i => i.id === food.id);
//   if (existing) existing.quantity += qty;
//   else cart.push({ ...food, quantity: qty });
//   setCartCookie(cart);
//   dispatchCartUpdate();           // ← add this
//   return cart;
// }

// export function updateQuantity(id: string, qty: number): CartItem[] {
//   let cart = getCart();
//   if (qty < 1) cart = cart.filter(i => i.id !== id);
//   else cart = cart.map(i => i.id === id ? { ...i, quantity: qty } : i);
//   setCartCookie(cart);
//   dispatchCartUpdate();
//   return cart;
// }

// export function removeFromCart(id: string): CartItem[] {
//   const cart = getCart().filter(i => i.id !== id);
//   setCartCookie(cart);
//   dispatchCartUpdate();
//   return cart;
// }

// export function clearCart(): void {
//   if (typeof window === "undefined") return;

//   // cart_items cookie expire করে দাও
//   document.cookie = `${CART_KEY}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict`;

//   // cart update event dispatch
//   dispatchCartUpdate();
// }


// export function removeIngredientFromCart(
//   itemId: string, 
//   ingredientName: string
// ): CartItem[] {
//   const cart = getCart();

//   const updatedCart = cart.map(item => {
//     if (item.id !== itemId) return item;

//     // ingredient remove করো
//     const updatedIngredients = item.ingredients?.filter(
//       ing => ing.name !== ingredientName
//     ) || [];

//     // নতুন item রিটার্ন করো (quantity অপরিবর্তিত থাকবে)
//     return {
//       ...item,
//       ingredients: updatedIngredients.length > 0 ? updatedIngredients : undefined,
//     };
//   });

//   // undefined ingredients array remove করতে পারো (optional)
//   const cleanCart = updatedCart.filter(item => item.ingredients !== undefined || true);

//   setCartCookie(cleanCart);
//   dispatchCartUpdate();

//   return cleanCart;
// }

// export function dispatchCartUpdate() {
//   if (typeof window !== "undefined") {
//     window.dispatchEvent(new Event("cart-updated"));
//   }
// }


// ----------------------------------------------------------------------------------------------------
// export interface CartItem {
//   id: string;
//   name: string;
//   price: number;
//   category?: string;
//   quantity: number;
//   image?: string;
//   ingredients?: {
//     name: string,
//     price: number
//   }[]
// }

export interface CartItem {
  id: string;
  name: string;
  price: number;               // selected variant-এর final price (offerPrice থাকলে সেটা)
  selectedSize: string;        // "Normal" | "XL"
  quantity: number;
  image?: string;
  category?: string;

  // Extra / customization
  extraIngredients: Array<{
    name: string;
    price: number;
    _id: string;
  }>;

  defaultIngredients: Array<{
    name: string;
    price: number;
    _id: string;
  }>;

  extrasTotal: number;
}

const CART_KEY = "cart_items";

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  const cookie = document.cookie
    .split("; ")
    .find(row => row.startsWith(CART_KEY + "="));
  if (!cookie) return [];
  try {
    return JSON.parse(cookie.split("=")[1]);
  } catch {
    return [];
  }
}

function setCartCookie(cart: CartItem[]) {
  if (typeof window === "undefined") return;
  document.cookie = `${CART_KEY}=${JSON.stringify(cart)}; path=/; SameSite=Strict`;
}

export function addToCart(food: Omit<CartItem, "quantity">, qty = 1): CartItem[] {
  const cart = getCart();
  const existing = cart.find(i => i.id === food.id);
  if (existing) existing.quantity += qty;
  else cart.push({ ...food, quantity: qty });
  setCartCookie(cart);
  dispatchCartUpdate();           // ← add this
  return cart;
}

export function updateQuantity(id: string, qty: number): CartItem[] {
  let cart = getCart();
  if (qty < 1) cart = cart.filter(i => i.id !== id);
  else cart = cart.map(i => i.id === id ? { ...i, quantity: qty } : i);
  setCartCookie(cart);
  dispatchCartUpdate();
  return cart;
}

export function removeFromCart(id: string): CartItem[] {
  const cart = getCart().filter(i => i.id !== id);
  setCartCookie(cart);
  dispatchCartUpdate();
  return cart;
}

export function clearCart(): void {
  if (typeof window === "undefined") return;

  // cart_items cookie expire করে দাও
  document.cookie = `${CART_KEY}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict`;

  // cart update event dispatch
  dispatchCartUpdate();
}

// -----------------------------------------------------
// export function removeIngredientFromCart(
//   itemId: string, 
//   ingredientName: string
// ): CartItem[] {
//   const cart = getCart();

//   const updatedCart = cart.map(item => {
//     if (item.id !== itemId) return item;

//     // ingredient remove করো
//     const updatedIngredients = item.extraIngredients?.filter(
//       ing => ing.name !== ingredientName
//     ) || [];

//     // নতুন item রিটার্ন করো (quantity অপরিবর্তিত থাকবে)
//     return {
//       ...item,
//       extraIngredients: updatedIngredients.length > 0 ? updatedIngredients : undefined,
//     };
//   });

//   // undefined ingredients array remove করতে পারো (optional)
//   const cleanCart = updatedCart.filter(item => item.extraIngredients !== undefined || true);

//   setCartCookie(cleanCart);
//   dispatchCartUpdate();

//   return cleanCart;
// }
// -----------------------------------------------------


export function removeIngredientFromCart(
  itemId: string,
  ingredientName: string
): CartItem[] {
  const cart = getCart();

  const updatedCart = cart.map(item => {
    if (item.id !== itemId) return item;

    const updatedExtraIngredients = item.extraIngredients?.filter(
      ing => ing.name !== ingredientName
    ) || [];

    const newExtrasTotal = updatedExtraIngredients.reduce(
      (sum, ing) => sum + ing.price,
      0
    );

    return {
      ...item,
      // extraIngredients: updatedExtraIngredients,   // undefined না দিয়ে [] রাখা হলো
      // extrasTotal: newExtrasTotal,

      extraIngredients: updatedExtraIngredients, // ❗ undefined নয়, [] রাখা
      extrasTotal: newExtrasTotal,
    };
  });

  setCartCookie(updatedCart);
  dispatchCartUpdate();

  return updatedCart;
}

export function dispatchCartUpdate() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("cart-updated"));
  }
}