"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function ResetPasswordPage() {

    const { token } = useParams();

    const router = useRouter();


    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleResetPassword = async () => {
        try {

            setLoading(true);

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password/${token}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ newPassword: password }),
            });

            // response parse kora
            const result = await res.json();
            if (result.success) {
                toast.success("Password reset successful. Please login with your new password.");
            }

            router.push("/");

        } catch (error: any) {
            console.log("reset response ", error)
            toast.error(error?.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-110 bg-gray-100">

            <Card className="w-100">

                <CardHeader>
                    <CardTitle className="text-center text-xl">
                        Reset Password
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">

                    <Input
                        type="password"
                        placeholder="Enter new password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Button
                        className="w-full"
                        onClick={handleResetPassword}
                        disabled={loading}
                    >
                        {loading ? "Resetting..." : "Reset Password"}
                    </Button>

                </CardContent>

            </Card>

        </div>
    );
}