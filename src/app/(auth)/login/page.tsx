'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthContext } from '@/context/AuthContext';
import { signinApi } from '@/services/auth';
import type { SigninFormData } from '@/types/Auth';
import { CheckCheck, Eye, EyeOff, Github, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CgGoogle } from 'react-icons/cg';

export default function Login() {
  const router = useRouter();
  const { user, setUser } = useAuthContext();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<SigninFormData>({
    email: '',
    password: '',
  });
  const [isPending, setIsPending] = useState<boolean>(false);

  useEffect(() => {
    if (user) router.push('/tasks');
  }, [router, user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    await signinApi({ formData, setUser, router });
    setIsPending(false);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4">
      {/* Logo / Heading */}
      <Link href="/" className="flex items-center justify-center gap-3">
        <CheckCheck size={35} className="bg-primary text-primary-foreground rounded p-1" />
        <h1 className="text-3xl font-bold">
          <span className="text-primary">Rapid</span> Task
        </h1>
      </Link>

      {/* Login Card */}
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <p className="text-muted-foreground text-sm">Login with your GitHub or Google account</p>
        </CardHeader>

        <CardContent>
          {/* Social Logins */}
          <div className="mb-6 flex flex-col gap-4">
            <Button variant="outline" className="bg-muted hover:bg-accent">
              <Github size={16} className="mr-2" /> Login with GitHub
            </Button>
            <Button variant="outline" className="bg-muted hover:bg-accent">
              <CgGoogle size={18} className="mr-2" /> Login with Google
            </Button>
          </div>

          <div className="relative my-6 flex items-center">
            <div className="flex-grow border-t" />
            <span className="text-muted-foreground mx-4 text-sm">Or continue with</span>
            <div className="flex-grow border-t" />
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="example@email.com"
                onChange={handleChange}
                value={formData.email}
              />
            </div>

            <div className="relative grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="pr-10"
                onChange={handleChange}
                value={formData.password}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="text-muted-foreground hover:text-foreground absolute right-3 bottom-2.5"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" /> Logging in...
                </span>
              ) : (
                'Login'
              )}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-primary underline underline-offset-4">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Terms & Privacy */}
      <p className="text-muted-foreground max-w-sm text-center text-xs text-balance">
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
