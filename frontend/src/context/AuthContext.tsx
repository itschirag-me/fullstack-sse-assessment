import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import api from "@/services/api";
interface UserProfile {
    id: string;
    name: string;
    email: string;
    organization: string;
}

interface AuthContextProps {
    token: string | null;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    userProfile: UserProfile | null;
    setUserProfile: React.Dispatch<React.SetStateAction<UserProfile | null>>;
    handleLogout: () => void;
    loader: boolean;
    setLoader: React.Dispatch<React.SetStateAction<boolean>>;
}

// Initialize context with default values
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthProvider = (props: PropsWithChildren<{}>) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [loader, setLoader] = useState<boolean>(false);
    const { toast } = useToast();

    const handleLogout = async () => {
        localStorage.clear();
        setToken(null);
        setIsLoggedIn(false);
        toast({
            title: "Logout",
            description: "You have been logged out."
        });
    };

    useEffect(() => {
        (async () => {
            if (token) {
                try {
                    setLoader(true);
                    const user = await api.get("/api/users/me");
                    if (user.data.result === null) {
                        localStorage.clear();
                        setToken(null);
                        setUserProfile(null);
                        setIsLoggedIn(false);
                    } else {
                        setUserProfile(user.data.result);
                        setIsLoggedIn(true);
                    }
                } catch (error) {
                    localStorage.clear();
                    setToken(null);
                    setUserProfile(null);
                    setIsLoggedIn(false);
                } finally {
                    setLoader(false);
                }
            } else {
                localStorage.clear();
                setToken(null);
                setUserProfile(null);
                setIsLoggedIn(false);
            }
        })();
    }, [token]);

    const values: AuthContextProps = {
        token,
        setToken,
        isLoggedIn,
        setIsLoggedIn,
        userProfile,
        setUserProfile,
        handleLogout,
        loader,
        setLoader
    };

    return (
        <AuthContext.Provider value={values} {...props} />
    );
}

export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export default AuthProvider;
