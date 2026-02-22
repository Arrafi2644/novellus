
// "use client";

// import { useId, useState } from "react";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";

// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import {
//   Form,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormControl,
//   FormMessage,
// } from "@/components/ui/form";

// import { Plus } from "lucide-react";
// import { toast } from "sonner";
// import { useRegisterMutation } from "@/redux/features/user/user.api";


// const registerSchema = z.object({
//   name: z.string().min(2, "Full name must be at least 2 characters"),
//   email: z.string().email("Please enter a valid email"),
//   password: z.string().min(6, "Password must be at least 6 characters"),
// });

// type RegisterValues = z.infer<typeof registerSchema>;


// export default function RegisterModal() {
//   const id = useId();
//   const [open, setOpen] = useState(false);
//   const [register, { isLoading }] = useRegisterMutation()


//   const form = useForm<RegisterValues>({
//     resolver: zodResolver(registerSchema),
//     defaultValues: {
//       name: "",
//       email: "",
//       password: "",
//     },
//   });

//   const onSubmit = async (data: RegisterValues) => {
//     try {
//       const res = await register(data).unwrap();

//       if (res.success) {
//         toast.success("User created successfully!");
//         form.reset();
//         setOpen(false);
//       }
//     } catch (error) {
//       toast.error("Failed to create user");
//       console.log(error);
//     }
//   };



//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger asChild>
//         <Button size="sm">
//           <Plus className=" h-4 w-4" />
//           Add User
//         </Button>
//       </DialogTrigger>

//       <DialogContent className="space-y-4">
//         <div className="flex flex-col items-center gap-2">
//           <DialogHeader>
//             <DialogTitle className="sm:text-center">
//               Add New User
//             </DialogTitle>
//             <p className="text-sm text-muted-foreground sm:text-center">
//               We just need a few details to get you started.
//             </p>
//           </DialogHeader>
//         </div>

//         <Form {...form}>
//           <form
//             onSubmit={form.handleSubmit(onSubmit)}
//             className="space-y-5"
//             noValidate
//           >
//             <FormField
//               control={form.control}
//               name="name"
//               render={({ field }) => (
//                 <FormItem className="space-y-1">
//                   <FormLabel htmlFor={`${id}-name`}>Full name</FormLabel>
//                   <FormControl>
//                     <Input
//                       id={`${id}-name`}
//                       placeholder="Matt Welsh"
//                       type="text"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="email"
//               render={({ field }) => (
//                 <FormItem className="space-y-1">
//                   <FormLabel htmlFor={`${id}-email`}>Email</FormLabel>
//                   <FormControl>
//                     <Input
//                       id={`${id}-email`}
//                       placeholder="hi@yourcompany.com"
//                       type="email"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="password"
//               render={({ field }) => (
//                 <FormItem className="space-y-1">
//                   <FormLabel htmlFor={`${id}-password`}>Password</FormLabel>
//                   <FormControl>
//                     <Input
//                       id={`${id}-password`}
//                       placeholder="Enter your password"
//                       type="password"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* Submit Button */}
//             <Button
//               disabled={isLoading}
//               type="submit" className="w-full">
//               {isLoading ? "User Creating..." : "Create User"}
//             </Button>
//           </form>
//         </Form>
//       </DialogContent>
//     </Dialog>
//   );
// }



// "use client";

// import { useId, useState } from "react";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";

// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import {
//   Form,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormControl,
//   FormMessage,
// } from "@/components/ui/form";

// import { Plus } from "lucide-react";
// import { toast } from "sonner";
// import { useRegisterMutation } from "@/redux/features/user/user.api";


// const signupSchema = z.object({
//   name: z.string().min(2, 'Full name must be at least 2 characters'),
//   email: z.string().email('Please enter a valid email address'),
//   phone: z.string().min(10, 'Please enter a valid phone number'),
//   address: z.string().min(5, 'Address must be at least 5 characters'),
//   password: z.string().min(6, 'Password must be at least 6 characters'),
//   confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
//   termsAccepted: z.boolean().refine((val) => val === true, {
//     message: 'You must accept the terms and conditions',
//   }),
// }).refine((data) => data.password === data.confirmPassword, {
//   message: "Passwords don't match",
//   path: ["confirmPassword"],
// })

// const [isLoading, setIsLoading] = useState(false)

// const form = useForm<SignupFormValues>({
//   resolver: zodResolver(signupSchema),
//   defaultValues: {
//     name: '',
//     email: '',
//     phone: '',
//     address: '',
//     password: '',
//     confirmPassword: '',
//     termsAccepted: false,
//   },
// })

// type SignupFormValues = z.infer<typeof signupSchema>


// export default function RegisterModal() {
//   const id = useId();
//   const [open, setOpen] = useState(false);
//   const [register, { isLoading }] = useRegisterMutation()


//   const form = useForm<SignupFormValues>({
//     resolver: zodResolver(signupSchema),
//     defaultValues: {
//       name: '',
//       email: '',
//       phone: '',
//       address: '',
//       password: '',
//       confirmPassword: '',
//       termsAccepted: false,
//     },
//   })

//   const onSubmit = async (data: SignupFormValues) => {
//     try {
//       const res = await register(data).unwrap();

//       if (res.success) {
//         toast.success("User created successfully!");
//         form.reset();
//         setOpen(false);
//       }
//     } catch (error) {
//       toast.error("Failed to create user");
//       console.log(error);
//     }
//   };



//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger asChild>
//         <Button size="sm">
//           <Plus className=" h-4 w-4" />
//           Add User
//         </Button>
//       </DialogTrigger>

//       <DialogContent className="space-y-4">
//         <div className="flex flex-col items-center gap-2">
//           <DialogHeader>
//             <DialogTitle className="sm:text-center">
//               Add New User
//             </DialogTitle>
//             <p className="text-sm text-muted-foreground sm:text-center">
//               We just need a few details to get you started.
//             </p>
//           </DialogHeader>
//         </div>

//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//             <FormField
//               control={form.control}
//               name="name"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Full name</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Enter your full name" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="email"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Email address</FormLabel>
//                   <FormControl>
//                     <Input type="email" placeholder="Enter your email" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="phone"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Phone number</FormLabel>
//                   <FormControl>
//                     <Input type="tel" placeholder="Enter your phone number" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="address"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Address</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Enter your full address" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="password"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Password</FormLabel>
//                   <FormControl>
//                     <Input type="password" placeholder="Create a password" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="confirmPassword"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Confirm password</FormLabel>
//                   <FormControl>
//                     <Input type="password" placeholder="Confirm your password" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <Button
//               type="submit"
//               className="w-full bg-[#FF2B85] hover:bg-pink-600"
//               disabled={isLoading}
//             >
//               {isLoading ? 'Creating account...' : 'Create account'}
//             </Button>
//           </form>
//         </Form>
//       </DialogContent>
//     </Dialog>
//   );
// }


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

import { useRegisterMutation } from "@/redux/features/user/user.api";

const signupSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  address: z.string().min(5),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignupFormValues = z.infer<typeof signupSchema>;

export default function RegisterModal() {
  const id = useId();
  const [open, setOpen] = useState(false);

  const [register, { isLoading }] = useRegisterMutation();

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      password: '',
      confirmPassword: ''
    },
  });

  const onSubmit = async (data: SignupFormValues) => {
    try {

      console.log(data ," For create user")
      const res = await register(data).unwrap();

      console.log("Add user res ", res )
      toast.success("User created successfully!");
      form.reset();
      setOpen(false);
    } catch (error) {
      toast.error("Failed to create user");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="h-4 w-4" />
          Add User
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
        </DialogHeader>

          <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email address</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone number</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="Enter your phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full address" {...field} />
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
                    <Input type="password" placeholder="Create a password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Confirm your password" {...field} />
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
              {isLoading ? 'Creating account...' : 'Create account'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

