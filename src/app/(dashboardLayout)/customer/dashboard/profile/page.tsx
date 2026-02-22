
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useUserInfoQuery, useChangePasswordMutation } from "@/redux/features/auth/auth.api";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User, Key } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;

export default function ProfilePage() {
  const { data: userData, isLoading } = useUserInfoQuery(undefined);
  const [changePassword, { isLoading: isChanging }] = useChangePasswordMutation();

  // Modal state
  const [open, setOpen] = useState(false);

  // Form setup with zod
  const form = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onChange", // real-time validation
  });

  const onSubmit = async (values: ChangePasswordFormValues) => {
    try {
      await changePassword({
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      }).unwrap();

      toast.success("Password changed successfully!");

      // Reset & close
      form.reset();
      setOpen(false);
    } catch (err: any) {
      const errorMsg =
        "Failed to change password. Please try again.";

      toast.error(errorMsg);
    }
  };

  return (
    <div className="w-full mx-auto p-4 md:p-6 max-w-4xl space-y-6">
      <h1 className="text-3xl font-bold">Profile</h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Personal Information</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="mt-6 space-y-6">
          {/* Avatar & Name */}
          <div className="flex items-center gap-6">
            <Avatar className="h-18 w-18">
              <AvatarImage
                className="object-cover"
                src={
                  userData?.data?.picture ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    userData?.data?.name || "User"
                  )}&background=random`
                }
                alt={userData?.data?.name || "User"}
              />
              <AvatarFallback>
                <User className="h-10 w-10" />
              </AvatarFallback>
            </Avatar>

            <div>
              <h2 className="text-2xl font-semibold">
                {userData?.data?.name || "User Name"}
              </h2>
              <p className="text-muted-foreground">{userData?.data?.role}</p>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Name</p>
              <p className="text-lg">{userData?.data?.name || "—"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              <p className="text-lg">{userData?.data?.email || "—"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Phone</p>
              <p className="text-lg">{userData?.data?.phone || "—"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Address</p>
              <p className="text-lg">{userData?.data?.address || "—"}</p>
            </div>
          </div>

          {/* Change Password Button */}
          <div className="pt-4">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Key className="h-4 w-4" />
                  Change Password
                </Button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-md">
                <DialogHeader className="text-center">
                  <DialogTitle className="text-2xl font-bold text-gray-800">
                    Change Password
                  </DialogTitle>
                  <DialogDescription className="text-gray-600">
                    Enter your current and new password
                  </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-5 py-4"
                  >
                    {/* Current Password */}
                    <FormField
                      control={form.control}
                      name="oldPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Enter current password"
                              {...field}
                              disabled={isChanging}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* New Password */}
                    <FormField
                      control={form.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Enter new password"
                              {...field}
                              disabled={isChanging}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Confirm Password */}
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm New Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Confirm new password"
                              {...field}
                              disabled={isChanging}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Buttons */}
                    <div className="flex justify-end gap-3 pt-2">
                      <DialogClose asChild>
                        <Button
                          type="button"
                          variant="outline"
                          disabled={isChanging}
                        >
                          Cancel
                        </Button>
                      </DialogClose>

                      <Button
                        type="submit"
                        className="bg-[#FF2B85] hover:bg-pink-600"
                        disabled={isChanging || !form.formState.isValid}
                      >
                        {isChanging ? "Changing..." : "Change Password"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}