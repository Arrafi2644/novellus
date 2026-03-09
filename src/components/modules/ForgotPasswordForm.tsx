"use client"

import { useState } from "react"
import { toast } from "sonner"

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

// Validation schema
const schema = z.object({
  email: z.string().email("Enter a valid email")
})

type FormData = z.infer<typeof schema>

interface Props {
  isOpen: boolean
  onClose: () => void
}

export function ForgotPasswordForm({ isOpen, onClose }: Props) {
  const [loading, setLoading] = useState(false)

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" }
  })

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true)

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        }
      )

      const result = await res.json()

      if (result.success) {
        toast.success("Reset link sent to your email")
        onClose()
      } else {
        toast.error(result.message)
      }

    } catch {
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">

        {/* Title and description must be direct children for Radix UI */}
        <DialogTitle className="text-2xl font-bold text-center mb-2">
          Forgot Password
        </DialogTitle>
        <DialogDescription className="text-center text-gray-700 mb-4">
          Enter your email to receive a password reset link.
        </DialogDescription>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-[#FF2B85] hover:bg-pink-600"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>

          </form>
        </Form>

      </DialogContent>
    </Dialog>
  )
}