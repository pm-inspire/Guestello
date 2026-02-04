"use client";

import Link from "next/link";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const loginSchema = z.object({
  email: z.string().email("أدخل بريد إلكتروني صحيح"),
  password: z.string().min(6, "كلمة المرور لا تقل عن 6 أحرف"),
  otp: z.string().optional(),
});

type LoginValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", otp: "" },
  });

  const handleSendOtp = () => {
    setOtpSent(true);
  };

  const handleVerify = async (values: LoginValues) => {
    if (!values.otp) {
      return;
    }
    setOtpVerified(true);
    await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: true,
      callbackUrl: "/",
    });
  };

  return (
    <div className="mx-auto flex min-h-[80vh] w-full max-w-5xl items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardContent className="space-y-6 p-6">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-semibold">تسجيل الدخول</h1>
            <p className="text-sm text-muted-foreground">
              أدخل بياناتك وسنرسل لك رمز تحقق.
            </p>
          </div>
          <Form {...form}>
            <form
              className="space-y-4"
              onSubmit={form.handleSubmit(handleVerify)}
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>البريد الإلكتروني</FormLabel>
                    <FormControl>
                      <Input placeholder="name@email.com" {...field} />
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
                    <FormLabel>كلمة المرور</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {!otpSent ? (
                <Button type="button" className="w-full" onClick={handleSendOtp}>
                  إرسال رمز OTP
                </Button>
              ) : (
                <FormField
                  control={form.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>رمز التحقق</FormLabel>
                      <FormControl>
                        <Input placeholder="123456" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {otpSent && (
                <Button type="submit" className="w-full">
                  تأكيد الدخول
                </Button>
              )}
            </form>
          </Form>
          <Button variant="outline" className="w-full">
            تسجيل الدخول عبر Google
          </Button>
          {otpVerified && (
            <p className="text-center text-xs text-primary">
              تم التحقق، جاري تحويلك...
            </p>
          )}
          <p className="text-center text-sm text-muted-foreground">
            لا تملك حساباً؟{" "}
            <Link href="/auth/register" className="text-primary">
              إنشاء حساب
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
