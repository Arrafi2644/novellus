
// // /* eslint-disable @typescript-eslint/no-explicit-any */
// // "use client";

// // import { useForm, useFieldArray } from "react-hook-form";
// // import { zodResolver } from "@hookform/resolvers/zod";
// // import * as z from "zod";
// // import { Button } from "@/components/ui/button";
// // import {
// //   Form,
// //   FormControl,
// //   FormField,
// //   FormItem,
// //   FormLabel,
// //   FormMessage,
// // } from "@/components/ui/form";
// // import { Input } from "@/components/ui/input";
// // import { Textarea } from "@/components/ui/textarea";
// // import {
// //   Select,
// //   SelectContent,
// //   SelectItem,
// //   SelectTrigger,
// //   SelectValue,
// // } from "@/components/ui/select";
// // import { toast } from "sonner";
// // import { Trash2, Plus, Upload, X } from "lucide-react";
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // import { useState } from "react";
// // import Image from "next/image";
// // import { useCreateFoodMutation } from "@/redux/features/food/food.api"; // adjust path
// // import { useRouter } from "next/navigation";
// // import { Spinner } from "@/components/ui/spinner";
// // import { useGetAllCategoriesQuery } from "@/redux/features/category/category.api";

// // export enum FoodStatus {
// //   ACTIVE = "ACTIVE",
// //   INACTIVE = "INACTIVE",
// // }

// // const foodSchema = z.object({
// //   name: z.string().min(2, "Name must be at least 2 characters"),
// //   category: z.string().min(1, "Category is required"),
// //   description: z.string().min(10, "Description must be at least 10 characters").max(500),
// //   price: z.number().min(0, "Price cannot be negative"),
// //   offerPrice: z.number().min(0, "Offer price cannot be negative").optional(),
// //   image: z.instanceof(File, { message: "Food image is required" }),
// //   status: z.nativeEnum(FoodStatus),
// //   ingredients: z
// //     .array(
// //       z.object({
// //         name: z.string().min(1, "Ingredient name is required"),
// //         price: z.number().min(0),
// //         quantity: z.number().min(0.01, "Quantity must be positive"),
// //         unit: z.string().min(1, "Unit is required (e.g. gm, ml, pcs)"),
// //       })
// //     )
// //     .optional(),
// //   totalStock: z.number().min(0, "Stock cannot be negative"),
// //   unit: z.string().min(1, "Unit is required (e.g. plate, bowl, piece)"),
// // });

// // type FoodFormValues = z.infer<typeof foodSchema>;

// // interface FileUploadProps {
// //   value?: File;
// //   onChange: (file: File | undefined) => void;
// //   accept?: string;
// //   label?: string;
// // }

// // function FileUpload({ value, onChange, accept = "image/*", label = "Upload Image" }: FileUploadProps) {
// //   const [preview, setPreview] = useState<string>("");

// //   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const file = e.target.files?.[0];
// //     if (file) {
// //       onChange(file);
// //       const reader = new FileReader();
// //       reader.onloadend = () => setPreview(reader.result as string);
// //       reader.readAsDataURL(file);
// //     }
// //   };

// //   const handleRemove = () => {
// //     onChange(undefined);
// //     setPreview("");
// //   };

// //   return (
// //     <div className="space-y-2">
// //       {preview ? (
// //         <div className="relative w-full h-48 border rounded-lg overflow-hidden group">
// //           <Image src={preview} alt="Preview" fill className="object-cover" />
// //           <Button
// //             type="button"
// //             variant="destructive"
// //             size="icon"
// //             className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
// //             onClick={handleRemove}
// //           >
// //             <X className="h-4 w-4" />
// //           </Button>
// //         </div>
// //       ) : (
// //         <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
// //           <div className="flex flex-col items-center justify-center pt-5 pb-6">
// //             <Upload className="w-10 h-10 mb-3 text-gray-400" />
// //             <p className="mb-2 text-sm text-gray-500">
// //               <span className="font-semibold">{label}</span>
// //             </p>
// //             <p className="text-xs text-gray-500">PNG, JPG, WEBP (MAX. 5MB)</p>
// //           </div>
// //           <input type="file" className="hidden" accept={accept} onChange={handleFileChange} />
// //         </label>
// //       )}
// //       {value && (
// //         <p className="text-xs text-gray-500">
// //           Selected: {value.name} ({(value.size / 1024).toFixed(2)} KB)
// //         </p>
// //       )}
// //     </div>
// //   );
// // }

// // export default function CreateFoodForm() {
// //   const [createFood, { isLoading }] = useCreateFoodMutation();
// //    const { data, isError } = useGetAllCategoriesQuery(undefined)
// //   const router = useRouter();

// //   console.log(data)
// //   const form = useForm<FoodFormValues>({
// //     resolver: zodResolver(foodSchema),
// //     defaultValues: {
// //       name: "",
// //       category: "",
// //       description: "",
// //       price: 0,
// //       offerPrice: undefined,
// //       image: undefined,
// //       status: FoodStatus.ACTIVE,
// //       ingredients: [],           // empty by default
// //       totalStock: 0,
// //       unit: "plate",
// //     },
// //   });

// //   const { fields: ingredients, append: appendIngredient, remove: removeIngredient } =
// //     useFieldArray({
// //       control: form.control,
// //       name: "ingredients",
// //     });

// //   const onSubmit = async (data: FoodFormValues) => {
// //     try {
// //       const formData = new FormData();

// //       const payload = {
// //         name: data.name,
// //         category: data.category,
// //         description: data.description,
// //         price: data.price,
// //         offerPrice: data.offerPrice,
// //         status: data.status,
// //         ingredients: data.ingredients?.length ? data.ingredients : undefined,
// //         totalStock: data.totalStock,
// //         unit: data.unit,
// //       };

// //       formData.append("data", JSON.stringify(payload));

// //       if (data.image) {
// //         formData.append("image", data.image);
// //       }

// //       const res = await createFood(formData).unwrap();

// //       if (res.success) {
// //         toast.success("Food item created successfully!");
// //         form.reset();
// //         router.push("/dashboard/food-management");
// //       }
// //     } catch (error) {
// //       toast.error("Failed to create food item");
// //       console.error(error);
// //     }
// //   };

// //   return (
// //     <div className="container mx-auto p-6">
// //       <h1 className="text-3xl font-bold mb-6 text-[#002047]">Create New Food Item</h1>

// //       <Form {...form}>
// //         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" noValidate>
// //           {/* Basic Information */}
// //           <Card>
// //             <CardHeader>
// //               <CardTitle>Basic Information</CardTitle>
// //             </CardHeader>
// //             <CardContent className="grid gap-6 sm:grid-cols-2">
// //               <FormField
// //                 control={form.control}
// //                 name="name"
// //                 render={({ field }) => (
// //                   <FormItem>
// //                     <FormLabel>Food Name</FormLabel>
// //                     <FormControl>
// //                       <Input placeholder="e.g. Chicken Biryani" {...field} />
// //                     </FormControl>
// //                     <FormMessage />
// //                   </FormItem>
// //                 )}
// //               />

// //               <FormField
// //                 control={form.control}
// //                 name="category"
// //                 render={({ field }) => (
// //                   <FormItem>
// //                     <FormLabel>Category</FormLabel>
// //                     <Select onValueChange={field.onChange} defaultValue={field.value}>
// //                       <FormControl>
// //                         <SelectTrigger>
// //                           <SelectValue placeholder="Select category" />
// //                         </SelectTrigger>
// //                       </FormControl>
// //                       <SelectContent>
// //                         <SelectItem value="Appetizers">Appetizers</SelectItem>
// //                         <SelectItem value="Main Course">Main Course</SelectItem>
// //                         <SelectItem value="Burgers">Burgers</SelectItem>
// //                         <SelectItem value="Pizza">Pizza</SelectItem>
// //                         <SelectItem value="Pasta">Pasta</SelectItem>
// //                         <SelectItem value="Desserts">Desserts</SelectItem>
// //                         <SelectItem value="Beverages">Beverages</SelectItem>
// //                         <SelectItem value="Salads">Salads</SelectItem>
// //                         <SelectItem value="Soups">Soups</SelectItem>
// //                         <SelectItem value="Sides">Sides</SelectItem>
// //                       </SelectContent>
// //                     </Select>
// //                     <FormMessage />
// //                   </FormItem>
// //                 )}
// //               />

// //               <FormField
// //                 control={form.control}
// //                 name="status"
// //                 render={({ field }) => (
// //                   <FormItem>
// //                     <FormLabel>Status</FormLabel>
// //                     <Select onValueChange={field.onChange} defaultValue={field.value}>
// //                       <FormControl>
// //                         <SelectTrigger>
// //                           <SelectValue placeholder="Select status" />
// //                         </SelectTrigger>
// //                       </FormControl>
// //                       <SelectContent>
// //                         <SelectItem value={FoodStatus.ACTIVE}>Active</SelectItem>
// //                         <SelectItem value={FoodStatus.INACTIVE}>Inactive</SelectItem>
// //                       </SelectContent>
// //                     </Select>
// //                     <FormMessage />
// //                   </FormItem>
// //                 )}
// //               />

// //               <FormField
// //                 control={form.control}
// //                 name="unit"
// //                 render={({ field }) => (
// //                   <FormItem>
// //                     <FormLabel>Serving Unit</FormLabel>
// //                     <FormControl>
// //                       <Input placeholder="e.g. plate, bowl, piece, kg" {...field} />
// //                     </FormControl>
// //                     <FormMessage />
// //                   </FormItem>
// //                 )}
// //               />
// //             </CardContent>
// //           </Card>

// //           {/* Pricing & Stock */}
// //           <Card>
// //             <CardHeader>
// //               <CardTitle>Pricing & Stock</CardTitle>
// //             </CardHeader>
// //             <CardContent className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
// //               <FormField
// //                 control={form.control}
// //                 name="price"
// //                 render={({ field }) => (
// //                   <FormItem>
// //                     <FormLabel>Regular Price (৳)</FormLabel>
// //                     <FormControl>
// //                       <Input
// //                         type="number"
// //                         {...field}
// //                         onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
// //                       />
// //                     </FormControl>
// //                     <FormMessage />
// //                   </FormItem>
// //                 )}
// //               />

// //               <FormField
// //                 control={form.control}
// //                 name="offerPrice"
// //                 render={({ field }) => (
// //                   <FormItem>
// //                     <FormLabel>Offer Price (৳) - optional</FormLabel>
// //                     <FormControl>
// //                       <Input
// //                         type="number"
// //                         {...field}
// //                         value={field.value ?? ""}
// //                         onChange={(e) => field.onChange(parseFloat(e.target.value) || undefined)}
// //                       />
// //                     </FormControl>
// //                     <FormMessage />
// //                   </FormItem>
// //                 )}
// //               />

// //               <FormField
// //                 control={form.control}
// //                 name="totalStock"
// //                 render={({ field }) => (
// //                   <FormItem>
// //                     <FormLabel>Total Available Stock</FormLabel>
// //                     <FormControl>
// //                       <Input
// //                         type="number"
// //                         {...field}
// //                         onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
// //                       />
// //                     </FormControl>
// //                     <FormMessage />
// //                   </FormItem>
// //                 )}
// //               />
// //             </CardContent>
// //           </Card>

// //           {/* Image & Description */}
// //           <Card>
// //             <CardHeader>
// //               <CardTitle>Image & Description</CardTitle>
// //             </CardHeader>
// //             <CardContent className="space-y-6">
// //               <FormField
// //                 control={form.control}
// //                 name="image"
// //                 render={({ field }) => (
// //                   <FormItem>
// //                     <FormLabel>Food Image</FormLabel>
// //                     <FormControl>
// //                       <FileUpload
// //                         value={field.value}
// //                         onChange={field.onChange}
// //                         label="Upload food image"
// //                       />
// //                     </FormControl>
// //                     <FormMessage />
// //                   </FormItem>
// //                 )}
// //               />

// //               <FormField
// //                 control={form.control}
// //                 name="description"
// //                 render={({ field }) => (
// //                   <FormItem>
// //                     <FormLabel>Description</FormLabel>
// //                     <FormControl>
// //                       <Textarea rows={5} placeholder="Detailed description..." {...field} />
// //                     </FormControl>
// //                     <FormMessage />
// //                   </FormItem>
// //                 )}
// //               />
// //             </CardContent>
// //           </Card>

// //           {/* Ingredients - Optional */}
// //           <Card>
// //             <CardHeader>
// //               <CardTitle>Ingredients (Optional)</CardTitle>
// //             </CardHeader>
// //             <CardContent>
// //               {ingredients.length > 0 ? (
// //                 <div className="space-y-5">
// //                   {ingredients.map((item, index) => (
// //                     <div
// //                       key={item.id}
// //                       className="grid gap-4 sm:grid-cols-5 items-end border rounded-lg p-4 relative"
// //                     >
// //                       <Button
// //                         type="button"
// //                         variant="destructive"
// //                         size="icon"
// //                         className="absolute top-2 right-2"
// //                         onClick={() => removeIngredient(index)}
// //                       >
// //                         <X className="h-4 w-4" />
// //                       </Button>

// //                       <FormField
// //                         control={form.control}
// //                         name={`ingredients.${index}.name`}
// //                         render={({ field }) => (
// //                           <FormItem className="sm:col-span-2">
// //                             <FormLabel>Name</FormLabel>
// //                             <FormControl>
// //                               <Input placeholder="e.g. Chicken" {...field} />
// //                             </FormControl>
// //                             <FormMessage />
// //                           </FormItem>
// //                         )}
// //                       />

// //                       <FormField
// //                         control={form.control}
// //                         name={`ingredients.${index}.price`}
// //                         render={({ field }) => (
// //                           <FormItem>
// //                             <FormLabel>Price (৳)</FormLabel>
// //                             <FormControl>
// //                               <Input
// //                                 type="number"
// //                                 {...field}
// //                                 onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
// //                               />
// //                             </FormControl>
// //                             <FormMessage />
// //                           </FormItem>
// //                         )}
// //                       />

// //                       <FormField
// //                         control={form.control}
// //                         name={`ingredients.${index}.quantity`}
// //                         render={({ field }) => (
// //                           <FormItem>
// //                             <FormLabel>Qty</FormLabel>
// //                             <FormControl>
// //                               <Input
// //                                 type="number"
// //                                 step="0.01"
// //                                 {...field}
// //                                 onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
// //                               />
// //                             </FormControl>
// //                             <FormMessage />
// //                           </FormItem>
// //                         )}
// //                       />

// //                       <FormField
// //                         control={form.control}
// //                         name={`ingredients.${index}.unit`}
// //                         render={({ field }) => (
// //                           <FormItem>
// //                             <FormLabel>Unit</FormLabel>
// //                             <FormControl>
// //                               <Input placeholder="gm, ml, pcs" {...field} />
// //                             </FormControl>
// //                             <FormMessage />
// //                           </FormItem>
// //                         )}
// //                       />
// //                     </div>
// //                   ))}
// //                 </div>
// //               ) : (
// //                 <div className="text-center py-8 text-muted-foreground">
// //                   No ingredients added yet
// //                 </div>
// //               )}

// //               <Button
// //                 type="button"
// //                 variant="outline"
// //                 className="mt-4"
// //                 onClick={() => appendIngredient({ name: "", price: 0, quantity: 1, unit: "" })}
// //               >
// //                 <Plus className="h-4 w-4 mr-2" /> Add Ingredient
// //               </Button>
// //             </CardContent>
// //           </Card>

// //           {/* Submit */}
// //           <div className="flex justify-end gap-4 pt-6">
// //             <Button type="button" variant="outline" onClick={() => form.reset()}>
// //               Reset Form
// //             </Button>
// //             <Button type="submit" disabled={isLoading} className="px-8">
// //               {isLoading ? (
// //                 <span className="flex items-center gap-2">
// //                   <Spinner />
// //                   Creating...
// //                 </span>
// //               ) : (
// //                 "Create Food Item"
// //               )}
// //             </Button>
// //           </div>
// //         </form>
// //       </Form>
// //     </div>
// //   );
// // }

// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { useForm, useFieldArray } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { toast } from "sonner";
// import { Trash2, Plus, Upload, X } from "lucide-react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { useState } from "react";
// import Image from "next/image";
// import { useCreateFoodMutation } from "@/redux/features/food/food.api";
// import { useGetAllCategoriesQuery } from "@/redux/features/category/category.api";
// import { useRouter } from "next/navigation";
// import { Spinner } from "@/components/ui/spinner";

// export enum FoodStatus {
//   ACTIVE = "ACTIVE",
//   INACTIVE = "INACTIVE",
// }

// const foodSchema = z.object({
//   name: z.string().min(2, "Name must be at least 2 characters"),
//   category: z.string().min(1, "Category is required"),
//   description: z.string().min(10, "Description must be at least 10 characters").max(500),
//   price: z.number().min(0, "Price cannot be negative"),
//   offerPrice: z.number().min(0, "Offer price cannot be negative").optional(),
//   image: z.instanceof(File, { message: "Food image is required" }),
//   status: z.nativeEnum(FoodStatus),
//   ingredients: z
//     .array(
//       z.object({
//         name: z.string().min(1, "Ingredient name is required"),
//         price: z.number().min(0),
//         quantity: z.number().min(0.01, "Quantity must be positive"),
//         unit: z.string().min(1, "Unit is required (e.g. gm, ml, pcs)"),
//       })
//     )
//     .optional(),
//   totalStock: z.number().min(0, "Stock cannot be negative"),
//   unit: z.string().min(1, "Unit is required (e.g. plate, bowl, piece)"),
// });

// type FoodFormValues = z.infer<typeof foodSchema>;

// interface FileUploadProps {
//   value?: File;
//   onChange: (file: File | undefined) => void;
//   accept?: string;
//   label?: string;
// }

// function FileUpload({ value, onChange, accept = "image/*", label = "Upload Image" }: FileUploadProps) {
//   const [preview, setPreview] = useState<string>("");

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       onChange(file);
//       const reader = new FileReader();
//       reader.onloadend = () => setPreview(reader.result as string);
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleRemove = () => {
//     onChange(undefined);
//     setPreview("");
//   };

//   return (
//     <div className="space-y-2">
//       {preview ? (
//         <div className="relative w-full h-48 border rounded-lg overflow-hidden group">
//           <Image src={preview} alt="Preview" fill className="object-cover" />
//           <Button
//             type="button"
//             variant="destructive"
//             size="icon"
//             className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
//             onClick={handleRemove}
//           >
//             <X className="h-4 w-4" />
//           </Button>
//         </div>
//       ) : (
//         <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
//           <div className="flex flex-col items-center justify-center pt-5 pb-6">
//             <Upload className="w-10 h-10 mb-3 text-gray-400" />
//             <p className="mb-2 text-sm text-gray-500">
//               <span className="font-semibold">{label}</span>
//             </p>
//             <p className="text-xs text-gray-500">PNG, JPG, WEBP (MAX. 5MB)</p>
//           </div>
//           <input type="file" className="hidden" accept={accept} onChange={handleFileChange} />
//         </label>
//       )}
//       {value && (
//         <p className="text-xs text-gray-500">
//           Selected: {value.name} ({(value.size / 1024).toFixed(2)} KB)
//         </p>
//       )}
//     </div>
//   );
// }

// export default function CreateFoodForm() {
//   const [createFood, { isLoading }] = useCreateFoodMutation();
//   const { data, isLoading: isCategoriesLoading, isError } = useGetAllCategoriesQuery({});

//   const router = useRouter();

//   const categories = data?.data || []; // assuming response shape: { success: true, data: [...] }

//   const form = useForm<FoodFormValues>({
//     resolver: zodResolver(foodSchema),
//     defaultValues: {
//       name: "",
//       category: "",
//       description: "",
//       price: 0,
//       offerPrice: undefined,
//       image: undefined,
//       status: FoodStatus.ACTIVE,
//       ingredients: [],
//       totalStock: 0,
//       unit: "plate",
//     },
//   });

//   const { fields: ingredients, append: appendIngredient, remove: removeIngredient } =
//     useFieldArray({
//       control: form.control,
//       name: "ingredients",
//     });

//   const onSubmit = async (data: FoodFormValues) => {
//     try {
//       const formData = new FormData();
//       const payload = {
//         name: data.name,
//         category: data.category,           // this will be the _id
//         description: data.description,
//         price: data.price,
//         offerPrice: data.offerPrice,
//         status: data.status,
//         ingredients: data.ingredients?.length ? data.ingredients : undefined,
//         totalStock: data.totalStock,
//         unit: data.unit,
//       };

//       formData.append("data", JSON.stringify(payload));
//       if (data.image) {
//         formData.append("image", data.image);
//       }

//       const res = await createFood(formData).unwrap();
//       if (res.success) {
//         toast.success("Food item created successfully!");
//         form.reset();
//         router.push("/staff/dashboard/owner/product-management");
//       }
//     } catch (error) {
//       toast.error("Failed to create food item");
//       console.error(error);
//     }
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6 text-[#002047]">Create New Food Item</h1>

//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" noValidate>
//           {/* Basic Information */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Basic Information</CardTitle>
//             </CardHeader>
//             <CardContent className="grid gap-6 sm:grid-cols-2">
//               <FormField
//                 control={form.control}
//                 name="name"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Food Name</FormLabel>
//                     <FormControl>
//                       <Input placeholder="e.g. Chicken Biryani" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="category"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Category</FormLabel>
//                     <Select
//                       onValueChange={field.onChange}
//                       defaultValue={field.value}
//                       disabled={isCategoriesLoading || isError || categories.length === 0}
//                     >
//                       <FormControl>
//                         <SelectTrigger>
//                           <SelectValue placeholder={
//                             isCategoriesLoading
//                               ? "Loading categories..."
//                               : isError || categories.length === 0
//                               ? "No categories available"
//                               : "Select category"
//                           } />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         {categories.map((cat: any) => (
//                           <SelectItem key={cat._id} value={cat._id}>
//                             {cat.title}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="status"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Status</FormLabel>
//                     <Select onValueChange={field.onChange} defaultValue={field.value}>
//                       <FormControl>
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select status" />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         <SelectItem value={FoodStatus.ACTIVE}>Active</SelectItem>
//                         <SelectItem value={FoodStatus.INACTIVE}>Inactive</SelectItem>
//                       </SelectContent>
//                     </Select>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="unit"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Serving Unit</FormLabel>
//                     <FormControl>
//                       <Input placeholder="e.g. plate, bowl, piece, kg" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </CardContent>
//           </Card>

//           {/* ──────────────────────────────────────────────── */}
//           {/* The rest remains unchanged: Pricing & Stock, Image & Description, Ingredients, Submit */}
//           {/* ──────────────────────────────────────────────── */}

//           <Card>
//             <CardHeader>
//               <CardTitle>Pricing & Stock</CardTitle>
//             </CardHeader>
//             <CardContent className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//               <FormField
//                 control={form.control}
//                 name="price"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Regular Price (৳)</FormLabel>
//                     <FormControl>
//                       <Input
//                         type="number"
//                         {...field}
//                         onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="offerPrice"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Offer Price (৳) - optional</FormLabel>
//                     <FormControl>
//                       <Input
//                         type="number"
//                         {...field}
//                         value={field.value ?? ""}
//                         onChange={(e) => field.onChange(parseFloat(e.target.value) || undefined)}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="totalStock"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Total Available Stock</FormLabel>
//                     <FormControl>
//                       <Input
//                         type="number"
//                         {...field}
//                         onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader>
//               <CardTitle>Image & Description</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <FormField
//                 control={form.control}
//                 name="image"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Food Image</FormLabel>
//                     <FormControl>
//                       <FileUpload
//                         value={field.value}
//                         onChange={field.onChange}
//                         label="Upload food image"
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="description"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Description</FormLabel>
//                     <FormControl>
//                       <Textarea rows={5} placeholder="Detailed description..." {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader>
//               <CardTitle>Ingredients (Optional)</CardTitle>
//             </CardHeader>
//             <CardContent>
//               {ingredients.length > 0 ? (
//                 <div className="space-y-5">
//                   {ingredients.map((item, index) => (
//                     <div
//                       key={item.id}
//                       className="grid gap-4 sm:grid-cols-5 items-end border rounded-lg p-4 relative"
//                     >
//                       <Button
//                         type="button"
//                         variant="destructive"
//                         size="icon"
//                         className="absolute top-2 right-2"
//                         onClick={() => removeIngredient(index)}
//                       >
//                         <X className="h-4 w-4" />
//                       </Button>

//                       <FormField
//                         control={form.control}
//                         name={`ingredients.${index}.name`}
//                         render={({ field }) => (
//                           <FormItem className="sm:col-span-2">
//                             <FormLabel>Name</FormLabel>
//                             <FormControl>
//                               <Input placeholder="e.g. Chicken" {...field} />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />

//                       <FormField
//                         control={form.control}
//                         name={`ingredients.${index}.price`}
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel>Price (৳)</FormLabel>
//                             <FormControl>
//                               <Input
//                                 type="number"
//                                 {...field}
//                                 onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
//                               />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />

//                       <FormField
//                         control={form.control}
//                         name={`ingredients.${index}.quantity`}
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel>Qty</FormLabel>
//                             <FormControl>
//                               <Input
//                                 type="number"
//                                 step="0.01"
//                                 {...field}
//                                 onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
//                               />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />

//                       <FormField
//                         control={form.control}
//                         name={`ingredients.${index}.unit`}
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel>Unit</FormLabel>
//                             <FormControl>
//                               <Input placeholder="gm, ml, pcs" {...field} />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="text-center py-8 text-muted-foreground">
//                   No ingredients added yet
//                 </div>
//               )}

//               <Button
//                 type="button"
//                 variant="outline"
//                 className="mt-4"
//                 onClick={() => appendIngredient({ name: "", price: 0, quantity: 1, unit: "" })}
//               >
//                 <Plus className="h-4 w-4 mr-2" /> Add Ingredient
//               </Button>
//             </CardContent>
//           </Card>

//           <div className="flex justify-end gap-4 pt-6">
//             <Button type="button" variant="outline" onClick={() => form.reset()}>
//               Reset Form
//             </Button>
//             <Button type="submit" disabled={isLoading} className="px-8">
//               {isLoading ? (
//                 <span className="flex items-center gap-2">
//                   <Spinner />
//                   Creating...
//                 </span>
//               ) : (
//                 "Create Food Item"
//               )}
//             </Button>
//           </div>
//         </form>
//       </Form>
//     </div>
//   );
// }


// ----------------------------------------------------------------------------------------------------
/* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { toast } from "sonner";
// import { Upload, X, Check, ChevronsUpDown } from "lucide-react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { useState, useEffect } from "react";
// import Image from "next/image";
// import { useCreateFoodMutation } from "@/redux/features/food/food.api";
// import { useGetAllCategoriesQuery } from "@/redux/features/category/category.api";
// import { useGetAllIngredientsQuery } from "@/redux/features/ingredient/ingredient.api";
// import { useRouter } from "next/navigation";
// import { Spinner } from "@/components/ui/spinner";
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "@/components/ui/command";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { Badge } from "@/components/ui/badge";
// import { cn } from "@/lib/utils";

// export enum FoodStatus {
//   ACTIVE = "ACTIVE",
//   INACTIVE = "INACTIVE",
// }

// const foodSchema = z.object({
//   name: z.string().min(2, { message: "Name must be at least 2 characters" }),
//   category: z.string().min(1, { message: "Category is required" }),
//   description: z
//     .string()
//     .min(10, { message: "Description must be at least 10 characters" })
//     .max(500, { message: "Description cannot exceed 500 characters" }),
//   price: z.number().min(0, { message: "Price cannot be negative" }),
//   offerPrice: z.number().min(0, { message: "Offer price cannot be negative" }).optional(),
//   image: z.instanceof(File, { message: "Food image is required" }),
//   status: z.nativeEnum(FoodStatus),
//   ingredients: z.array(z.string()).optional(), // array of ingredient ObjectIds
//   totalStock: z.number().min(0, { message: "Stock cannot be negative" }),
//   unit: z.string().min(1, { message: "Unit is required (e.g. plate, bowl, piece)" }),
// });

// type FoodFormValues = z.infer<typeof foodSchema>;

// interface FileUploadProps {
//   value?: File;
//   onChange: (file: File | undefined) => void;
//   accept?: string;
//   label?: string;
// }

// function FileUpload({ value, onChange, accept = "image/*", label = "Upload Image" }: FileUploadProps) {
//   const [preview, setPreview] = useState<string>("");

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       onChange(file);
//       const reader = new FileReader();
//       reader.onloadend = () => setPreview(reader.result as string);
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleRemove = () => {
//     onChange(undefined);
//     setPreview("");
//   };

//   return (
//     <div className="space-y-2">
//       {preview ? (
//         <div className="relative w-full h-48 border rounded-lg overflow-hidden group">
//           <Image src={preview} alt="Preview" fill className="object-cover" />
//           <Button
//             type="button"
//             variant="destructive"
//             size="icon"
//             className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
//             onClick={handleRemove}
//           >
//             <X className="h-4 w-4" />
//           </Button>
//         </div>
//       ) : (
//         <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
//           <div className="flex flex-col items-center justify-center pt-5 pb-6">
//             <Upload className="w-10 h-10 mb-3 text-gray-400" />
//             <p className="mb-2 text-sm text-gray-500">
//               <span className="font-semibold">{label}</span>
//             </p>
//             <p className="text-xs text-gray-500">PNG, JPG, WEBP (MAX. 5MB)</p>
//           </div>
//           <input type="file" className="hidden" accept={accept} onChange={handleFileChange} />
//         </label>
//       )}

//       {value && (
//         <p className="text-xs text-gray-500">
//           Selected: {value.name} ({(value.size / 1024).toFixed(2)} KB)
//         </p>
//       )}
//     </div>
//   );
// }

// export default function CreateFoodForm() {
//   const [createFood, { isLoading: isCreating }] = useCreateFoodMutation();
//   const { data: categoriesData, isLoading: isCategoriesLoading, isError: categoriesError } =
//     useGetAllCategoriesQuery({});
//   const { data: ingredientsData, isLoading: isIngredientsLoading } = useGetAllIngredientsQuery({});

//   const router = useRouter();

//   const categories = categoriesData?.data || [];
//   const allIngredients = ingredientsData?.data || [];

//   const form = useForm<FoodFormValues>({
//     resolver: zodResolver(foodSchema),
//     defaultValues: {
//       name: "",
//       category: "",
//       description: "",
//       price: 0,
//       offerPrice: undefined,
//       image: undefined,
//       status: FoodStatus.ACTIVE,
//       ingredients: [],
//       totalStock: 0,
//       unit: "plate",
//     },
//   });

//   // Local state for multi-select ingredients
//   const [open, setOpen] = useState(false);
//   const [selectedIds, setSelectedIds] = useState<string[]>([]);

//   // Sync selected ingredient IDs with form
//   useEffect(() => {
//     form.setValue("ingredients", selectedIds);
//   }, [selectedIds, form]);

//   const onSubmit = async (values: FoodFormValues) => {
//     try {
//       const formData = new FormData();

//       const payload = {
//         name: values.name,
//         category: values.category,
//         description: values.description,
//         price: values.price,
//         offerPrice: values.offerPrice,
//         status: values.status,
//         ingredients: values.ingredients?.length ? values.ingredients : undefined,
//         totalStock: values.totalStock,
//         unit: values.unit,
//       };

//       formData.append("data", JSON.stringify(payload));

//       if (values.image) {
//         formData.append("image", values.image);
//       }

//       const response = await createFood(formData).unwrap();

//       if (response?.success) {
//         toast.success("Food item created successfully!");
//         form.reset();
//         setSelectedIds([]);
//         router.push("/staff/dashboard/owner/product-management");
//       }
//     } catch (err: any) {
//       toast.error(err?.data?.message || "Failed to create food item");
//       console.error(err);
//     }
//   };

//   return (
//     <div className="container mx-auto p-6 max-w-5xl">
//       <h1 className="text-3xl font-bold mb-8 text-[#002047]">Create New Food Item</h1>

//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//           {/* ─── Basic Information ─── */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Basic Information</CardTitle>
//             </CardHeader>
//             <CardContent className="grid gap-6 sm:grid-cols-2">
//               <FormField
//                 control={form.control}
//                 name="name"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Food Name *</FormLabel>
//                     <FormControl>
//                       <Input placeholder="e.g. Chicken Biryani" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="category"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Category *</FormLabel>
//                     <Select
//                       onValueChange={field.onChange}
//                       defaultValue={field.value}
//                       disabled={isCategoriesLoading || categoriesError || categories.length === 0}
//                     >
//                       <FormControl>
//                         <SelectTrigger>
//                           <SelectValue
//                             placeholder={
//                               isCategoriesLoading
//                                 ? "Loading categories..."
//                                 : categoriesError || categories.length === 0
//                                 ? "No categories available"
//                                 : "Select a category"
//                             }
//                           />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         {categories.map((cat: any) => (
//                           <SelectItem key={cat._id} value={cat._id}>
//                             {cat.title}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="status"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Status</FormLabel>
//                     <Select onValueChange={field.onChange} defaultValue={field.value}>
//                       <FormControl>
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select status" />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         <SelectItem value={FoodStatus.ACTIVE}>Active</SelectItem>
//                         <SelectItem value={FoodStatus.INACTIVE}>Inactive</SelectItem>
//                       </SelectContent>
//                     </Select>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="unit"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Serving Unit *</FormLabel>
//                     <FormControl>
//                       <Input placeholder="plate / bowl / piece / kg" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </CardContent>
//           </Card>

//           {/* ─── Pricing & Stock ─── */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Pricing & Stock</CardTitle>
//             </CardHeader>
//             <CardContent className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//               <FormField
//                 control={form.control}
//                 name="price"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Regular Price (৳) *</FormLabel>
//                     <FormControl>
//                       <Input
//                         type="number"
//                         min="0"
//                         step="0.01"
//                         {...field}
//                         onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="offerPrice"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Offer Price (৳)</FormLabel>
//                     <FormControl>
//                       <Input
//                         type="number"
//                         min="0"
//                         step="0.01"
//                         value={field.value ?? ""}
//                         onChange={(e) => field.onChange(parseFloat(e.target.value) || undefined)}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="totalStock"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Total Stock *</FormLabel>
//                     <FormControl>
//                       <Input
//                         type="number"
//                         min="0"
//                         {...field}
//                         onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </CardContent>
//           </Card>

//           {/* ─── Image & Description ─── */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Image & Description</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <FormField
//                 control={form.control}
//                 name="image"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Food Image *</FormLabel>
//                     <FormControl>
//                       <FileUpload
//                         value={field.value}
//                         onChange={field.onChange}
//                         label="Upload food image"
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="description"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Description *</FormLabel>
//                     <FormControl>
//                       <Textarea rows={5} placeholder="Detailed description of the food..." {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </CardContent>
//           </Card>

//           {/* ─── Ingredients (Multi-select) ─── */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Ingredients (Optional)</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-5">
//               <Popover open={open} onOpenChange={setOpen}>
//                 <PopoverTrigger asChild>
//                   <Button
//                     variant="outline"
//                     role="combobox"
//                     aria-expanded={open}
//                     className="w-full justify-between h-auto py-3 px-4"
//                     disabled={isIngredientsLoading || allIngredients.length === 0}
//                   >
//                     {selectedIds.length === 0
//                       ? "Select ingredients..."
//                       : `${selectedIds.length} ingredient${selectedIds.length > 1 ? "s" : ""} selected`}
//                     <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//                   </Button>
//                 </PopoverTrigger>

//                 <PopoverContent className="w-(--radix-popover-trigger-width) p-0 max-h-80 overflow-hidden">
//                   <Command>
//                     <CommandInput placeholder="Search ingredient..." className="h-9" />
//                     <CommandList>
//                       <CommandEmpty>No ingredient found.</CommandEmpty>
//                       <CommandGroup className="max-h-60 overflow-auto">
//                         {allIngredients.map((ing: any) => (
//                           <CommandItem
//                             key={ing._id}
//                             value={ing.name}
//                             onSelect={() => {
//                               setSelectedIds((prev) =>
//                                 prev.includes(ing._id)
//                                   ? prev.filter((id) => id !== ing._id)
//                                   : [...prev, ing._id]
//                               );
//                             }}
//                           >
//                             <Check
//                               className={cn(
//                                 "mr-2 h-4 w-4",
//                                 selectedIds.includes(ing._id) ? "opacity-100" : "opacity-0"
//                               )}
//                             />
//                             <div className="flex justify-between w-full items-center">
//                               <span>{ing.name}</span>
//                               {ing.price && (
//                                 <span className="text-sm text-muted-foreground">
//                                   ৳{ing.price.toFixed(2)}
//                                 </span>
//                               )}
//                             </div>
//                           </CommandItem>
//                         ))}
//                       </CommandGroup>
//                     </CommandList>
//                   </Command>
//                 </PopoverContent>
//               </Popover>

//               {/* Selected badges */}
//               {selectedIds.length > 0 && (
//                 <div className="flex flex-wrap gap-2">
//                   {selectedIds.map((id) => {
//                     const ingredient = allIngredients.find((i: any) => i._id === id);
//                     if (!ingredient) return null;
//                     return (
//                       <Badge
//                         key={id}
//                         variant="secondary"
//                         className="px-3 py-1 text-sm flex items-center gap-1.5"
//                       >
//                         {ingredient.name}
//                         {ingredient.price && (
//                           <span className="text-xs opacity-70">৳{ingredient.price}</span>
//                         )}
//                         <button
//                           type="button"
//                           className="ml-1 rounded-full hover:bg-destructive/20 p-0.5"
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             setSelectedIds((prev) => prev.filter((pid) => pid !== id));
//                           }}
//                         >
//                           <X className="h-3.5 w-3.5" />
//                         </button>
//                       </Badge>
//                     );
//                   })}
//                 </div>
//               )}

//               {isIngredientsLoading && (
//                 <p className="text-sm text-muted-foreground">Loading ingredients...</p>
//               )}

//               {!isIngredientsLoading && allIngredients.length === 0 && (
//                 <p className="text-sm text-muted-foreground italic">
//                   No ingredients found in the system.
//                 </p>
//               )}
//             </CardContent>
//           </Card>

//           {/* ─── Actions ─── */}
//           <div className="flex justify-end gap-4 pt-6">
//             <Button
//               type="button"
//               variant="outline"
//               onClick={() => {
//                 form.reset();
//                 setSelectedIds([]);
//               }}
//             >
//               Reset Form
//             </Button>

//             <Button type="submit" disabled={isCreating} className="min-w-40">
//               {isCreating ? (
//                 <span className="flex items-center gap-2">
//                   <Spinner className="h-4 w-4" />
//                   Creating...
//                 </span>
//               ) : (
//                 "Create Food Item"
//               )}
//             </Button>
//           </div>
//         </form>
//       </Form>
//     </div>
//   );
// }


/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Upload, X, Check, ChevronsUpDown, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useCreateFoodMutation } from "@/redux/features/food/food.api";
import { useGetAllCategoriesQuery } from "@/redux/features/category/category.api";
import { useGetAllIngredientsQuery } from "@/redux/features/ingredient/ingredient.api";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export enum FoodStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

// Variant এর schema
const variantSchema = z.object({
  size: z.string().min(1, "Size name is required"),
  price: z.number().min(0, "Price cannot be negative"),
  offerPrice: z.number().min(0).optional().nullable(),
  totalStock: z.number().min(0, "Stock cannot be negative"),
});

// Main food schema
const foodSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  category: z.string().min(1, { message: "Category is required" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" })
    .max(500),
  image: z.instanceof(File, { message: "Food image is required" }),
  status: z.nativeEnum(FoodStatus),
  ingredients: z.array(z.string()).optional(),
  unit: z.string().min(1, { message: "Unit is required" }),

  // Variants — minimum 1, maximum 2
  variants: z
    .array(variantSchema)
    .min(1, { message: "At least one variant is required" })
    .max(2, { message: "Maximum two sizes (Normal & XL) are allowed" }),
});

type FoodFormValues = z.infer<typeof foodSchema>;

interface FileUploadProps {
  value?: File;
  onChange: (file: File | undefined) => void;
  accept?: string;
  label?: string;
}

function FileUpload({ value, onChange, accept = "image/*", label = "Upload Image" }: FileUploadProps) {
  const [preview, setPreview] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    onChange(undefined);
    setPreview("");
  };

  return (
    <div className="space-y-2">
      {preview ? (
        <div className="relative w-full h-48 border rounded-lg overflow-hidden group">
          <Image src={preview} alt="Preview" fill className="object-cover" />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-10 h-10 mb-3 text-gray-400" />
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">{label}</span>
            </p>
            <p className="text-xs text-gray-500">PNG, JPG, WEBP (MAX. 5MB)</p>
          </div>
          <input type="file" className="hidden" accept={accept} onChange={handleFileChange} />
        </label>
      )}
      {value && (
        <p className="text-xs text-gray-500">
          Selected: {value.name} ({(value.size / 1024).toFixed(2)} KB)
        </p>
      )}
    </div>
  );
}

export default function CreateFoodForm() {
  const [createFood, { isLoading: isCreating }] = useCreateFoodMutation();
  const { data: categoriesData, isLoading: isCategoriesLoading, isError: categoriesError } =
    useGetAllCategoriesQuery({});
  const { data: ingredientsData, isLoading: isIngredientsLoading } = useGetAllIngredientsQuery({});

  const router = useRouter();
  const categories = categoriesData?.data || [];
  const allIngredients = ingredientsData?.data || [];

  const form = useForm<FoodFormValues>({
    resolver: zodResolver(foodSchema),
    defaultValues: {
      name: "",
      category: "",
      description: "",
      image: undefined,
      status: FoodStatus.ACTIVE,
      ingredients: [],
      unit: "piece",
      variants: [
        { size: "Normal", price: 0, offerPrice: undefined, totalStock: 0 },
        // XL ডিফল্টভাবে যোগ করা হলো — পরে remove করা যাবে
        { size: "XL", price: 0, offerPrice: undefined, totalStock: 0 },
      ],
    },
  });

  const { fields: variants, append, remove } = useFieldArray({
    control: form.control,
    name: "variants",
  });

  // Local state for multi-select ingredients
  const [open, setOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    form.setValue("ingredients", selectedIds);
  }, [selectedIds, form]);

  const onSubmit = async (values: FoodFormValues) => {
    try {
      const formData = new FormData();

      const payload = {
        name: values.name,
        category: values.category,
        description: values.description,
        status: values.status,
        ingredients: values.ingredients?.length ? values.ingredients : undefined,
        unit: values.unit,
        variants: values.variants,
      };

      formData.append("data", JSON.stringify(payload));
      if (values.image) {
        formData.append("image", values.image);
      }

      const response = await createFood(formData).unwrap();
      if (response?.success) {
        toast.success("Food item created successfully!");
        form.reset();
        setSelectedIds([]);
        router.push("/staff/dashboard/owner/product-management");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to create food item");
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <h1 className="text-3xl font-bold mb-8 text-[#002047]">Create New Food Item</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Food Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Chicken Biryani" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category *</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isCategoriesLoading || categoriesError || categories.length === 0}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={
                              isCategoriesLoading
                                ? "Loading categories..."
                                : categoriesError || categories.length === 0
                                  ? "No categories available"
                                  : "Select a category"
                            }
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((cat: any) => (
                          <SelectItem key={cat._id} value={cat._id}>
                            {cat.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={FoodStatus.ACTIVE}>Active</SelectItem>
                        <SelectItem value={FoodStatus.INACTIVE}>Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Serving Unit *</FormLabel>
                    <FormControl>
                      <Input placeholder="plate / bowl / piece / kg" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Variants - Normal & XL */}
          <Card>
            <CardHeader>
              <CardTitle>Variants (Size & Pricing)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {variants.map((variant, index) => (
                <div
                  key={variant.id}
                  className="border rounded-lg p-5 bg-slate-50/50 relative space-y-5"
                >
                  {index === 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-3 right-3"
                      onClick={() => remove(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}

                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    <FormField
                      control={form.control}
                      name={`variants.${index}.size`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Size *</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={index === 0}
                              placeholder={index === 0 ? "Normal" : "XL"}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`variants.${index}.price`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price (৳) *</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="0"
                              step="0.01"
                              {...field}
                              onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`variants.${index}.offerPrice`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Offer Price (৳)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="0"
                              step="0.01"
                              value={field.value ?? ""}
                              onChange={(e) => field.onChange(parseFloat(e.target.value) || undefined)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`variants.${index}.totalStock`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Total Stock *</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="0"
                              {...field}
                              onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              ))}

              {variants.length < 2 && (
                <Button
                  type="button"
                  variant="outline"
                  className="mt-2"
                  onClick={() =>
                    append({
                      size: "XL",
                      price: 0,
                      offerPrice: undefined,
                      totalStock: 0,
                    })
                  }
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add XL Variant
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Image & Description */}
          <Card>
            <CardHeader>
              <CardTitle>Image & Description</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Food Image *</FormLabel>
                    <FormControl>
                      <div className="w-40 aspect-square">

                        <FileUpload
                          value={field.value}
                          onChange={field.onChange}
                          label="Upload food image"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description *</FormLabel>
                    <FormControl>
                      <Textarea rows={5} placeholder="Detailed description of the food..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Ingredients (Multi-select) */}
          <Card>
            <CardHeader>
              <CardTitle>Ingredients</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between h-auto py-3 px-4"
                    disabled={isIngredientsLoading || allIngredients.length === 0}
                  >
                    {selectedIds.length === 0
                      ? "Select ingredients..."
                      : `${selectedIds.length} ingredient${selectedIds.length > 1 ? "s" : ""} selected`}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[--radix-popover-trigger-width] p-0 max-h-80 overflow-hidden">
                  <Command>
                    <CommandInput placeholder="Search ingredient..." className="h-9" />
                    <CommandList>
                      <CommandEmpty>No ingredient found.</CommandEmpty>
                      <CommandGroup className="max-h-60 overflow-auto">
                        {allIngredients.map((ing: any) => (
                          <CommandItem
                            key={ing._id}
                            value={ing.name}
                            onSelect={() => {
                              setSelectedIds((prev) =>
                                prev.includes(ing._id)
                                  ? prev.filter((id) => id !== ing._id)
                                  : [...prev, ing._id]
                              );
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectedIds.includes(ing._id) ? "opacity-100" : "opacity-0"
                              )}
                            />
                            <div className="flex justify-between w-full items-center">
                              <span>{ing.name}</span>
                              {ing.price && (
                                <span className="text-sm text-muted-foreground">
                                  ৳{ing.price.toFixed(2)}
                                </span>
                              )}
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              {selectedIds.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selectedIds.map((id) => {
                    const ingredient = allIngredients.find((i: any) => i._id === id);
                    if (!ingredient) return null;
                    return (
                      <Badge
                        key={id}
                        variant="secondary"
                        className="px-3 py-1 text-sm flex items-center gap-1.5"
                      >
                        {ingredient.name}
                        {ingredient.price && (
                          <span className="text-xs opacity-70">৳{ingredient.price}</span>
                        )}
                        <button
                          type="button"
                          className="ml-1 rounded-full hover:bg-destructive/20 p-0.5"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedIds((prev) => prev.filter((pid) => pid !== id));
                          }}
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </Badge>
                    );
                  })}
                </div>
              )}

              {isIngredientsLoading && (
                <p className="text-sm text-muted-foreground">Loading ingredients...</p>
              )}
              {!isIngredientsLoading && allIngredients.length === 0 && (
                <p className="text-sm text-muted-foreground italic">
                  No ingredients found in the system.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Submit Buttons */}
          <div className="flex justify-end gap-4 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                form.reset();
                setSelectedIds([]);
              }}
            >
              Reset Form
            </Button>

            <Button type="submit" disabled={isCreating} className="min-w-40">
              {isCreating ? (
                <span className="flex items-center gap-2">
                  <Spinner className="h-4 w-4" />
                  Creating...
                </span>
              ) : (
                "Create Food Item"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}