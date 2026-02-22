"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import Image from 'next/image'
import logo from "../../../public/assets/logo-112.jpeg"
import { loginUser } from '@/utils/loginUser'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useUser } from '@/context/UserContext'


const loginSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    rememberMe: z.boolean().optional(),
})

type LoginFormValues = z.infer<typeof loginSchema>

interface LoginFormProps {
    isOpen: boolean
    onClose: () => void
    onSwitchToSignup: () => void
}

export function LoginForm({ isOpen, onClose, onSwitchToSignup }: LoginFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    const { login } = useUser();
    const router = useRouter();
    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: ''
        },
    })

    const onSubmit = async (data: LoginFormValues) => {
        setIsLoading(true)
        const res = await loginUser(data);
        console.log("login res ", res)
        if (res.success) {
            toast.success("Login successful!");
            login(res.user.user);
            if(res.user.user.role === "USER") {
                router.push("/customer/dashboard/my-orders");
            } else if((res.user.user.role === "SELLER") || (res.user.user.role === "OWNER")) {
                router.push("/staff/dashboard");
            } else {
                router.push("/");
            }
            setIsLoading(false)
            onClose();
        } else {
            toast.error(res.message || "Login failed!");
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
                <DialogHeader className="text-center flex items-center">
                    {/* Logo */}
                    <Image
                        src={logo}
                        alt='logo'
                        height={60}
                        width={100}
                        className='object-cover'

                    />

                    {/* Title */}
                    <DialogTitle className="text-2xl font-bold text-gray-800">Welcome back</DialogTitle>
                    <DialogDescription className="text-gray-800 font-medium">
                        Log in to continue to FoodNest
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email address</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="Enter your email"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Enter your password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex items-center justify-end">

                            <a href="#" className="text-sm text-[#FF2B85] hover:text-pink-600 font-medium">
                                Forgot password?
                            </a>
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-[#FF2B85] hover:bg-pink-600"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Logging in...' : 'Log in'}
                        </Button>
                    </form>
                </Form>

                {/* Register Link */}
                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        Do not have an account?{' '}
                        <button
                            onClick={() => {
                                onClose()
                                onSwitchToSignup()
                            }}
                            className="text-[#FF2B85] hover:text-pink-600 font-medium"
                        >
                            Sign up
                        </button>
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    )
}