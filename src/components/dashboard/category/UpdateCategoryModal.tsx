"use client";

import { useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { useUpdateCategoryMutation } from "@/redux/features/category/category.api";


export enum CategoryStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

const categorySchema = z.object({
  title: z.string().min(2, "Category name is required"),
  description: z.string().optional(),
  image: z
    .any()
    .optional()
    .refine(
      (file) => !file || (file instanceof File && file.size > 0),
      "Invalid file"
    ),
  status: z.nativeEnum(CategoryStatus),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: {
    _id: string;
    title: string;
    description?: string;
    image?: string;
    status: CategoryStatus;
  };
};

export default function CategoryDetailsModal({
  open,
  onOpenChange,
  category,
}: Props) {
  const [updateCategory, { isLoading }] = useUpdateCategoryMutation();

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      title: "",
      description: "",
      image: undefined,
      status: CategoryStatus.ACTIVE,
    },
  });

  // Set default values when modal opens
  useEffect(() => {
    if (open) {
      form.reset({
        title: category.title,
        description: category.description || "",
        image: undefined,
        status: category.status || CategoryStatus.ACTIVE,
      });
    }
  }, [open, category, form]);

  const onSubmit = async (data: CategoryFormValues) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("status", data.status);
      if (data.description) formData.append("description", data.description);
      if (data.image) formData.append("image", data.image);

     const updateRes = await updateCategory({ id: category._id, formData }).unwrap();
console.log(updateRes)
      toast.success("Category updated successfully!");
      onOpenChange(false);
    } catch (error) {
      toast.error("Failed to update category");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg px-6 py-4 rounded-2xl border-0 shadow-2xl">
        <DialogHeader>
          <DialogTitle>Category Details & Update</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 px-6 py-4"
          >
            {/* Image on top */}
            {category.image && (
              <div className="flex justify-center">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-40 h-40 object-cover rounded-lg mb-4"
                />
              </div>
            )}

            {/* Category Name */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Category name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Optional description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Status */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={CategoryStatus.ACTIVE}>ACTIVE</SelectItem>
                        <SelectItem value={CategoryStatus.INACTIVE}>INACTIVE</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Image Upload */}
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Change Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => field.onChange(e.target.files?.[0])}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? "Updating..." : "Update Category"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
