"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const signInSchema = z.object({
  email: z.email("Enter a valid email address"),
  password: z.string().min(8, "Password must contain at least 8 characters"),
});

type SignInInput = z.infer<typeof signInSchema>;

export function SignInForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "admin@example.com",
      password: "Practice123!",
    },
  });

  async function onSubmit(values: SignInInput) {
    setServerError(null);
    const result = await signIn("credentials", {
      ...values,
      redirect: false,
    });

    if (result?.error) {
      setServerError("Email or password is incorrect.");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
      <label className="field-label">
        Email
        <input className="field-input" type="email" autoComplete="email" {...register("email")} />
        {errors.email && <span className="field-error">{errors.email.message}</span>}
      </label>

      <label className="field-label">
        Password
        <input
          className="field-input"
          type="password"
          autoComplete="current-password"
          {...register("password")}
        />
        {errors.password && <span className="field-error">{errors.password.message}</span>}
      </label>

      {serverError && <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{serverError}</p>}

      <button className="button-primary w-full" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Signing in…" : "Sign in to dashboard"}
      </button>
    </form>
  );
}
