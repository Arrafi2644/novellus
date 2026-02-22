/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useUpdateUserMutation } from "@/redux/features/user/user.api";
import { toast } from "sonner";
import { IUser } from "@/types";

// Zod Schema
const updateUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .optional()
    .or(z.literal("")), // Allow empty string (won't be sent)
  role: z.enum(["OWNER", "SELLER" , "USER"]),
});

type TUpdateUser = z.infer<typeof updateUserSchema>;

interface UpdateUserModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: {
    _id: string;
    name: string;
    role: "OWNER" | "SELLER" | "USER";
    phone?: string;
  };
}

export default function UpdateUserModal({
  open,
  onOpenChange,
  user,
}: UpdateUserModalProps) {
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const form = useForm<TUpdateUser>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: "",
      password: "",
      role: "USER" as const,
    },
  });

  // Reset form when modal opens or user changes
  useEffect(() => {
    if (open && user) {
      form.reset({
        name: user.name || "",
        password: "",
        role: user.role || "USER",
      });
    }
  }, [user, open, form]);

  const onSubmit = async (data: TUpdateUser) => {
    try {
      const payload: Partial<IUser> = {
        name: data.name,
        role: data.role,
      };

      // Only include password if provided and not empty
      if (data.password && data.password.trim() !== "") {
        payload.password = data.password;
      }

      await updateUser({ id: user._id, data: payload }).unwrap();

      toast.success("User updated successfully");
      onOpenChange(false);
      form.reset();
    } catch (err: any) {
      console.error("Update user error:", err);
      toast.error(err?.data?.message || "Failed to update user");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader className="text-center">
          <DialogTitle className="text-center">Update User</DialogTitle>
          <DialogDescription className="text-center">
            Update user information
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Role Field */}
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="SELLER">SELLER</SelectItem>
                      <SelectItem value="USER">USER</SelectItem>
                      <SelectItem value="OWNER">OWNER</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password (optional)</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Leave empty to keep current password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Updating..." : "Update User"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}