import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { User } from "paket/types/user";
import { useRouter } from "next/navigation";

export const useSession = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(token){
            try {
                const decoded: User = jwtDecode<User>(token);
                setUser(decoded);
                if(decoded.isAdmin){
                    router.push('/adminDashboard');
                } else {
                    router.push('/customerDashboard');
                }
            } catch(err){
                console.log(err);
                localStorage.removeItem("token");
                router.push('/login');
            }
        } else {
            router.push('/login');
        }
        setLoading(false);
    }, [router]);

    const handleSignOut = async () => {
        localStorage.removeItem("token");
        await fetch("api/auth/logout", {
            method: "POST"
        });
        router.push('/login');
        setUser(null);
    }

    const handleSignIn = async (token: string) => {
        if(typeof token === "string" && token.trim() !== ""){
            localStorage.setItem("token", token);
            const decoded: User = jwtDecode<User>(token);
            setUser(decoded);
            if(decoded.isAdmin){
                router.push('/AdminDashboard');
            } else {
                router.push('/CustomerDashboard');
            }
        } else {
            console.log("Invalid token specified.");
        }
    }

    return { user, loading, handleSignIn, handleSignOut }
}