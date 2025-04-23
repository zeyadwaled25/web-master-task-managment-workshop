import type { SignupFormData, SigninFormData } from '@/types/Auth';
import { AuthUser } from '@/types/User';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { toast } from 'sonner';

const API_BASE_URL = '/api/auth';

export async function signupApi({
  formData,
  router,
}: {
  formData: SignupFormData;
  router: AppRouterInstance;
}) {
  try {
    const res = await fetch(`${API_BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      toast.success('User created successfully');
      router.push('/login');
    } else {
      toast.error('User creation failed');
      console.error('Signup failed', res);
    }
  } catch (error) {
    toast.error('Something went wrong during signup');
    console.error(error);
  }
}

export async function signinApi({
  formData,
  setUser,
  router,
}: {
  formData: SigninFormData;
  setUser: (user: AuthUser) => void;
  router: AppRouterInstance;
}) {
  try {
    const res = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      const data = await res.json();
      setUser(data.user);
      toast.success('User logged in successfully');
      router.push('/tasks');
    } else {
      toast.error('User login failed');
      console.error('Login failed', res);
    }
  } catch (error) {
    toast.error('Something went wrong during login');
    console.error(error);
  }
}

export async function logoutApi(removeUser: () => void) {
  try {
    const res = await fetch(`${API_BASE_URL}/logout`, {
      method: 'POST',
    });

    if (res.ok) {
      toast.success('User logged out successfully');
      removeUser();
    } else {
      toast.error('Logout failed');
      console.error('Logout failed', res);
    }
  } catch (error) {
    toast.error('Something went wrong during logout');
    console.error('Logout error:', error);
  }
}
