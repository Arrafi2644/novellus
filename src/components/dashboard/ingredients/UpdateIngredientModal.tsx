"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { useUpdateIngredientMutation } from "@/redux/features/ingredient/ingredient.api";
import { IIngredient } from "@/types";

// Zod schema for update
const ingredientSchema = z.object({
  name: z.string().min(2, "Ingredient name is required"),
  price: z
    .number({error: "Price must be a number" })
    .min(0, "Price must be positive"),
});

type IngredientFormValues = z.infer<typeof ingredientSchema>;

type UpdateIngredientModalProps = {
  ingredient: IIngredient;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function UpdateIngredientModal({
  ingredient,
  open,
  onOpenChange,
}: UpdateIngredientModalProps) {
  const [updateIngredient, { isLoading }] = useUpdateIngredientMutation();

  const form = useForm<IngredientFormValues>({
    resolver: zodResolver(ingredientSchema),
    defaultValues: {
      name: ingredient.name,
      price: ingredient.price,
    },
  });

  // Update form values whenever ingredient changes
  useEffect(() => {
    form.reset({
      name: ingredient.name,
      price: ingredient.price,
    });
  }, [ingredient]);

  const onSubmit = async (data: IngredientFormValues) => {
    try {
      const res = await updateIngredient({
        id: ingredient._id!,
        body: {
          name: data.name,
          price: data.price,
        },
      }).unwrap();

      if (res.success) {
        toast.success("Ingredient updated successfully!");
        onOpenChange(false);
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update ingredient");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Ingredient</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ingredient Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Cheese" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Price */}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="e.g. 50"
                      {...field}
                      onChange={(e) =>
                        field.onChange(Number(e.target.value))
                      } // convert string → number
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Updating..." : "Update Ingredient"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
