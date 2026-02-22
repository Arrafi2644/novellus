"use client";

import { useId, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Plus } from "lucide-react";

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

import { useCreateIngredientMutation } from "@/redux/features/ingredient/ingredient.api";

// Zod schema
const ingredientSchema = z.object({
  name: z.string().min(2, "Ingredient name is required"),
  price: z
    .number({ error: "Price must be a number" })
    .min(0, "Price must be positive"),
});

type IngredientFormValues = z.infer<typeof ingredientSchema>;

export default function CreateIngredientModal() {
  const id = useId();
  const [open, setOpen] = useState(false);

  const [createIngredient, { isLoading }] = useCreateIngredientMutation();

  const form = useForm<IngredientFormValues>({
    resolver: zodResolver(ingredientSchema),
    defaultValues: {
      name: "",
      price: 0,
    },
  });

  const onSubmit = async (data: IngredientFormValues) => {
    try {
      const res = await createIngredient({
        name: data.name,
        price: data.price,
      }).unwrap();

      if (res.success) {
        toast.success("Ingredient created successfully!");
        form.reset();
        setOpen(false);
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create ingredient");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="h-4 w-4" />
          Add Ingredient
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Ingredient</DialogTitle>
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
                      value={field.value}
                      onChange={(e) => field.onChange(Number(e.target.value))} // ✅ convert string → number
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-[#FF2B85] hover:bg-pink-600"
              disabled={isLoading}
            >
              {isLoading ? "Creating ingredient..." : "Create ingredient"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
