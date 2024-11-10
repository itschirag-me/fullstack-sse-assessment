import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import api from '@/services/api';
import { useToast } from '@/hooks/use-toast';

const FormSchema = z.object({
    email: z.string().email().min(2, {
        message: 'Email must be at least 2 characters.',
    }),
    password: z.string().min(6, {
        message: 'Password must be at least 6 characters.',
    }),
});

const SignInPage = () => {
    const { isLoggedIn, setIsLoggedIn, setToken } = useAuth();
    const navigate = useNavigate();

    const { toast } = useToast();

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/dashboard');
        }
    }, [isLoggedIn, navigate]);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const handleSignIn = async (data: z.infer<typeof FormSchema>) => {
        try {
            const response = await api.post("/api/auth/signin", data);

            localStorage.setItem('token', response.data.result.access_token);
            localStorage.setItem('refresh_token', response.data.result.refresh_token);
            setToken(response.data.result.access_token);
            setIsLoggedIn(true);

            toast({
                title: 'Signed In',
                description: 'You have successfully signed in.',
            });

            navigate('/dashboard');
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to sign in. Please try again.',
                variant: 'destructive',
            });
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <Card className="w-96">
                <CardHeader>
                    <CardTitle>Sign In</CardTitle>
                    <CardDescription>Sign in to your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSignIn)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Email" {...field} />
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
                                            <Input type="password" placeholder="Password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full">
                                Sign In
                            </Button>
                        </form>
                        <div className="mt-4 text-center">
                            <span>Don't have an account? </span>
                            <button
                                className="text-accent-foreground underline"
                                onClick={() => navigate("/sign-up")}
                            >
                                Sign Up
                            </button>
                        </div>
                    </Form>
                </CardContent>
            </Card>
        </div >
    );
};

export default SignInPage;
