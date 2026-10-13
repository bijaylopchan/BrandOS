import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import api from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {

    const [token, setToken] = useState(() => {
        return localStorage.getItem("token");
    });

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    // =====================================================
    // LOGIN
    // =====================================================

    const login = (newToken) => {

        localStorage.setItem("token", newToken);

        setToken(newToken);

        setUser(null);

        setLoading(true);
    };

    // =====================================================
    // LOGOUT
    // =====================================================

    const logout = () => {

        localStorage.removeItem("token");

        setToken(null);

        setUser(null);

        setLoading(false);
    };

    // =====================================================
    // VERIFY EXISTING LOGIN SESSION
    // =====================================================

    useEffect(() => {

        let cancelled = false;

        const verifySession = async () => {

            if (!token) {
                setUser(null);
                setLoading(false);
                return;
            }

            setLoading(true);

            try {

                const response = await api.get("/auth/me", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (!cancelled) {
                    setUser(response.data);
                }

            } catch (error) {

                if (cancelled) return;

                console.error(
                    "Session verification failed:",
                    error
                );

                // An invalid or expired JWT must not keep
                // the user logged in.
                if (
                    error.response?.status === 401 ||
                    error.response?.status === 403
                ) {

                    localStorage.removeItem("token");

                    setToken(null);
                }

                setUser(null);

            } finally {

                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        verifySession();

        return () => {
            cancelled = true;
        };

    }, [token]);

    // =====================================================
    // AUTHENTICATION STATE
    // =====================================================

    const isAuthenticated = Boolean(token && user);

    return (

        <AuthContext.Provider
            value={{
                token,
                user,
                loading,
                isAuthenticated,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>

    );
}

export function useAuth() {
    return useContext(AuthContext);
}
