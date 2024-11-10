import { useAuth } from "@/context/AuthContext";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DashboardPage = () => {
    const { userProfile, handleLogout } = useAuth();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10">
            <Card className="w-full max-w-lg">
                <CardHeader>
                    <CardTitle className="text-3xl">Welcome, {userProfile?.name}</CardTitle>
                    <CardDescription className="text-sm text-gray-400">Your dashboard overview</CardDescription>
                </CardHeader>

                <CardFooter>
                    <Button variant="destructive" onClick={handleLogout}>
                        Logout
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default DashboardPage;
