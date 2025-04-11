
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Define user roles
export type UserRole = "admin" | "faculty" | "student";

// Define user type
interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

// Auth context type
interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  error: null,
  login: async () => {},
  logout: () => {},
  isAuthenticated: false,
});

// Auth provider props
interface AuthProviderProps {
  children: ReactNode;
}

// Sample user data (in a real app, this would come from a backend)
const sampleUsers = [
  {
    id: "admin1",
    name: "Admin User",
    email: "admin@institute.edu",
    password: "admin123",
    role: "admin" as UserRole,
  },
  {
    id: "faculty1",
    name: "Professor Smith",
    email: "smith@institute.edu",
    password: "faculty123",
    role: "faculty" as UserRole,
  },
  {
    id: "student1",
    name: "John Doe",
    email: "john@institute.edu",
    password: "student123",
    role: "student" as UserRole,
  },
];

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("erpUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string, role: UserRole) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user with matching credentials
      const matchedUser = sampleUsers.find(
        u => u.email === email && u.password === password && u.role === role
      );
      
      if (matchedUser) {
        // Remove password from user object
        const { password, ...userWithoutPassword } = matchedUser;
        setUser(userWithoutPassword);
        localStorage.setItem("erpUser", JSON.stringify(userWithoutPassword));
        navigate("/dashboard");
      } else {
        setError("Invalid email, password, or role");
      }
    } catch (error) {
      setError("An error occurred during login");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("erpUser");
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      error, 
      login, 
      logout, 
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);
