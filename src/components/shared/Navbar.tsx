
"use client"

import React, { useEffect, useState } from 'react';
import { MapPin, ShoppingCart, User } from 'lucide-react';
import { Button } from '../ui/button';
import { LoginForm, SignupForm } from '../auth';
import Image from 'next/image';
import logo from "../../../public/assets/logo-112.jpeg"
import { getCart } from '@/utils/cart-helper';
import AllCarts from '../modules/AllCarts';
import { NavbarDropdown } from '../modules/NavbarDropdown';
import { useUser } from '@/context/UserContext';
import { useFood } from '@/context/FoodContext';   // ✅ Context import
import Link from 'next/link';
import SearchInput from '../modules/SearchInput';
import { ForgotPasswordForm } from '../modules/ForgotPasswordForm';

export default function Navbar() {

    const { user, logout } = useUser();
    const { foods, setSearchTerm } = useFood();   // ✅ Global foods + search

    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isSignupOpen, setIsSignupOpen] = useState(false);
    const [isForgotOpen, setIsForgotOpen] = useState(false);
    const [cartItems, setCartItems] = useState(() => getCart());
    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        const handleCartUpdate = () => {
            setCartItems(getCart());
        };

        window.addEventListener("cart-updated", handleCartUpdate);
        handleCartUpdate();

        return () => {
            window.removeEventListener("cart-updated", handleCartUpdate);
        };
    }, []);

    const cartCount = cartItems.length;

    console.log("user in navbar ", user)

    return (
        <>
            <nav className="w-full bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="flex items-center justify-between h-24 font-medium relative">

                        {/* Mobile user/login */}
                        <div className='lg:hidden'>
                            {user ? (
                                <NavbarDropdown user={user} onLogout={logout} />
                            ) : (
                                <button
                                    className="p-2 border-2 rounded-full transition-all duration-300 hover:scale-105 hover:bg-pink-500"
                                    onClick={() => setIsLoginOpen(true)}
                                >
                                    <User className="w-6 h-6 text-gray-900" />
                                </button>
                            )}
                        </div>

                        {/* Logo */}
                        <Link href="/">
                            <Image
                                src={logo}
                                alt='logo'
                                height={70}
                                width={110}
                                className='object-cover'
                            />
                        </Link>

                        {/* Desktop Address + Search */}
                        <div className="hidden lg:flex items-center gap-6 flex-1 mx-8 justify-center">

                            {/* Address */}
                            <div className="flex items-center gap-2 max-w-md text-gray-900">
                                <MapPin className="w-5 h-5 shrink-0" />
                                <span className="text-sm truncate">
                                    Via carlo Marchesetti 21/2A, 34142, Trieste, Italia
                                </span>
                            </div>

                            {/* Search */}
                            <div className="flex-1 max-w-max">
                                <SearchInput
                                    foods={foods}
                                    onSearch={setSearchTerm}
                                />
                            </div>
                        </div>

                        {/* Mobile Cart */}
                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="block lg:hidden p-2 hover:bg-gray-50 rounded-lg transition-all duration-300 hover:scale-105 relative"
                        >
                            <ShoppingCart className="w-6 h-6 text-gray-900" />
                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#FF2B85] text-white text-xs rounded-full flex items-center justify-center">
                                {cartCount}
                            </span>
                        </button>

                        {/* Desktop Actions */}
                        <div className="hidden lg:flex items-center gap-4">

                            {/* Cart */}
                            <button
                                onClick={() => setIsCartOpen(true)}
                                className="p-2 hover:bg-gray-50 rounded-lg transition-all duration-300 hover:scale-105 relative"
                            >
                                <ShoppingCart className="w-6 h-6 text-gray-900" />
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#FF2B85] text-white text-xs rounded-full flex items-center justify-center">
                                    {cartCount}
                                </span>
                            </button>

                            {user ? (
                                <NavbarDropdown user={user} onLogout={logout} />
                            ) : (
                                <div className='flex items-center gap-3'>
                                    <Button
                                        onClick={() => setIsLoginOpen(true)}
                                        variant="outline"
                                        className="px-6 py-2 text-gray-900 hover:bg-[#FF2B85] border-gray-900 hover:text-white hover:scale-105 rounded-lg transition-all duration-300"
                                    >
                                        Log in
                                    </Button>
                                    <Button
                                        onClick={() => setIsSignupOpen(true)}
                                        className="px-6 py-2 bg-[#FF2B85] text-white rounded-lg hover:bg-pink-500 hover:scale-105 transition-all duration-300"
                                    >
                                        Sign Up
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
 {/* Mobile Search */}
                    <div className="lg:hidden pb-3 ">
                        <SearchInput
                            foods={foods}
                            onSearch={setSearchTerm}
                        />
                    </div>
                    {/* Mobile Address */}
                    <div className="lg:hidden flex items-center justify-center gap-2 pb-2 text-gray-900 text-sm">
                        <MapPin className="w-4 h-4 shrink-0" />
                        <span className="truncate">
                            Via carlo Marchesetti 21/2A, 34142, Trieste, Italia
                        </span>
                    </div>

                   

                </div>
            </nav>

            {/* Modals */}
         <LoginForm
    isOpen={isLoginOpen}
    onClose={() => setIsLoginOpen(false)}
    onSwitchToSignup={() => setIsSignupOpen(true)}
    onSwitchToForgot={() => setIsForgotOpen(true)} // <-- pass here
/>

<ForgotPasswordForm
    isOpen={isForgotOpen}
    onClose={() => setIsForgotOpen(false)}
/>

            <SignupForm
                isOpen={isSignupOpen}
                onClose={() => setIsSignupOpen(false)}
                onSwitchToLogin={() => setIsLoginOpen(true)}
            />

            <AllCarts
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                cartItems={cartItems}
            />
        </>
    );
}