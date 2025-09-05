import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchAuthData } from "@/redux-toolkit/features/slices/authSlice/authSlice";

const AdminProtectedRoute = ({ children }) => {
  const router = useRouter();
  const { AuthInfo, token, isAuthenticated, AuthData, isAuthLoading } =
    useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAuthData());
  }, [dispatch]);

  useEffect(() => {
    if (!isAuthLoading) {
      if (!AuthInfo || !token || !isAuthenticated) {
        router.push("/login");
      } else if (AuthData?.role === "user") {
        router.push("/user/dashboard");
      }
    }
  }, [AuthInfo, token, isAuthenticated, router, AuthData, isAuthLoading]);

  if (!AuthInfo || !token || !isAuthenticated) {
    return null;
  }

  
  if (isAuthLoading) {
    return (
      <>
        <div className="flex items-center justify-center min-h-screen gap-2">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span>Loading...</span>
        </div>
      </>
    );
  }

  return children;
};

export default AdminProtectedRoute;
