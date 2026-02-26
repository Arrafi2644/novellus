"use client"
import React, { useEffect, useState } from 'react';
import { MapPin, ShoppingCart, User, ChevronDown } from 'lucide-react';
import { Button } from '../ui/button';
import { LoginForm, SignupForm } from '../auth';
import Image from 'next/image';
import logo from "../../../public/assets/logo-112.jpeg"
import { getCart } from '@/utils/cart-helper';
import AllCarts from '../modules/AllCarts';
import { NavbarDropdown } from '../modules/NavbarDropdown';
import { useUser } from '@/context/UserContext';
import Link from 'next/link';

export default function Navbar() {
    const { user, logout } = useUser();

    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isSignupOpen, setIsSignupOpen] = useState(false);
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


    return (
        <>
            <nav className="w-full bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="flex items-center justify-between h-26 font-medium lg:h-26 relative">


                        <div className='lg:hidden'>
                            {
                                user ?
                                    <NavbarDropdown user={user} onLogout={logout} />
                                    :
                                    < button
                                        className=" p-2 border-2 rounded-full cursor-pointer transition-all duration-300 hover:scale-105 hover:bg-pink-500"
                                        onClick={() => setIsLoginOpen(true)}
                                    >
                                        <User className="w-6 h-6 text-gray-900" />
                                    </button>
                            }
                        </div>
                        <Link href="/">
                            <Image
                                src={logo}
                                alt='logo'
                                height={80}
                                width={120}
                                className='object-cover'

                            />
                        </Link>

                        {/* Desktop Address */}
                        <div className="hidden lg:flex items-center gap-2 flex-1 max-w-md mx-8 text-gray-900">
                            <MapPin className="w-5 h-5 shrink-0" />
                            <span className="text-sm truncate">Via carlo Marchesetti 21/2A, 34142, Trieste, Italia</span>
                        </div>

                        {/* Mobile & Desktop Cart Icon */}
                        <button onClick={() => setIsCartOpen(true)} className=" block lg:hidden p-2 hover:bg-gray-50 not-visited:rounded-lg transition-all duration-300 hover:scale-105 relative">

                            <ShoppingCart className="w-6 h-6 text-gray-900" />
                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#FF2B85] text-white text-xs rounded-full flex items-center justify-center">
                                {cartCount}
                            </span>
                        </button>
                        {/* Desktop Actions */}
                        <div className="hidden lg:flex items-center gap-3 justify-center">
                            {/* Mobile & Desktop Cart Icon */}
                            <button onClick={() => setIsCartOpen(true)} className="p-2 mr-2 mt-2 hidden lg:block hover:bg-gray-50 not-visited:rounded-lg transition-all duration-300 hover:scale-105 relative">
                                <ShoppingCart className="w-6 h-6 text-gray-900" />
                                <span

                                    className="absolute -top-1 -right-1 w-5 h-5 bg-[#FF2B85] text-white text-xs rounded-full flex items-center justify-center">
                                    {cartCount}
                                </span>

                            </button>
                            {
                                user ?
                                    <NavbarDropdown user={user} onLogout={logout} />
                                    :
                                    <div className='flex items-center gap-3'>
                                        <Button
                                            onClick={() => setIsLoginOpen(true)}
                                            variant="outline"
                                            className="px-6 py-2 cursor-pointer text-gray-900 font-medium hover:bg-[#FF2B85] border-gray-900 hover:text-white hover:scale-105 rounded-lg transition-all duration-300"
                                        >
                                            Log in
                                        </Button>
                                        <Button
                                            onClick={() => setIsSignupOpen(true)}
                                            className="px-6 py-2 bg-[#FF2B85] cursor-pointer text-white font-medium rounded-lg hover:bg-pink-500 hover:scale-105 transition-all whitespace-nowrap duration-300"
                                        >
                                            Sign Up
                                        </Button>
                                    </div>
                            }
                        </div>

                    </div>

                    {/* Mobile Address */}
                    <div className="lg:hidden flex items-center justify-center gap-2 pb-3 text-gray-900 text-sm">
                        <MapPin className="w-4 h-4 shrink-0" />
                        <span className="truncate">Via carlo Marchesetti 21/2A, 34142, Trieste, Italia</span>
                    </div>
                </div>
            </nav >

            {/* Login Modal */}
            < LoginForm
                isOpen={isLoginOpen}
                onClose={() => setIsLoginOpen(false)
                }
                onSwitchToSignup={() => setIsSignupOpen(true)}
            />

            {/* Signup Modal */}
            <SignupForm
                isOpen={isSignupOpen}
                onClose={() => setIsSignupOpen(false)}
                onSwitchToLogin={() => setIsLoginOpen(true)}
            />

            {/* Cart Sidebar */}
            <AllCarts
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                cartItems={cartItems}
            />
        </>
    );
};
