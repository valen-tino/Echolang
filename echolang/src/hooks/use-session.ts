import { useState, useEffect } from "react";
import JwtDecode from "jwt-decode";
import User from "paket/app/models/User";
import { useRouter } from "next/navigation";

export const useSession = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(token){
            const decoded: User = JwtDecode(token);
            setUser(decoded);
        } else {
            router.push('/login');
            setUser(null);
        }
        setLoading(false);
    }, [router]);

    const handleSignOut = async () => {
        localStorage.removeItem("token");
        await fetch("api/auth/logout", {
            method: "POST"
        });
        setUser(null);
    }

    const handleSignIn = async () => {
        localStorage.setItem("token", token);
        const decoded: User = JwtDecode(token);
        setUser(decoded);
    }

    return { user, loading, handleSignIn, handleSignOut }
}