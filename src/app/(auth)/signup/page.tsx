'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthContext } from '@/context/AuthContext';
import { signupApi } from '@/services/auth';
import type { SignupFormData } from '@/types/Auth';
import { CheckCheck, Eye, EyeOff, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SignUp() {
  const router = useRouter();
  const { user } = useAuthContext();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<SignupFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isPending, setIsPending] = useState<boolean>(false);

  useEffect(() => {
    if (user) router.push('/tasks');
  }, [router, user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    await signupApi({ formData, router });
    setIsPending(false);
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-6 px-4">
      <Link href="/" className="flex items-center gap-2">
        <CheckCheck className="bg-primary rounded p-1 text-white" size={32} />
        <h1 className="text-3xl font-bold">
          <span className="text-primary">Rapid</span> Task
        </h1>
      </Link>

      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl">Sign up</CardTitle>
          <CardDescription>Welcome to Rapid Task! Please enter your details.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-5">
            {/* Name */}
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            {/* Email */}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div className="relative grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-muted-foreground hover:text-foreground absolute right-3 bottom-2.5"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative grid gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="text-muted-foreground hover:text-foreground absolute right-3 bottom-2.5"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Submit */}
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Signing up...
                </span>
              ) : (
                'Sign up'
              )}
            </Button>

            <p className="text-muted-foreground text-center text-sm">
              Already have an account?{' '}
              <Link href="/login" className="text-primary underline underline-offset-4">
                Login
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>

      {/* Terms & Privacy */}
      <p className="text-muted-foreground max-w-xs text-center text-xs text-balance">
        By clicking continue, you agree to our{' '}
        <a href="#" className="hover:text-primary underline underline-offset-4">
          Terms of Service
        </a>{' '}
        and{' '}
        <a href="#" className="hover:text-primary underline underline-offset-4">
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );
}
