import { useMutation } from "@tanstack/react-query";
import { apiInstanse } from "../../../shared/api/backend";
import { useUserStore } from "./store";
import { useNavigate } from "react-router-dom";

const loginHandle = async (email: string, password: string) => {
  const res = await apiInstanse.post(
    "/auth/login",
    { email, password },
    {
      withCredentials: true,
    }
  );

  return res.data;
};

export const logoutHandle = async () => {
  const res = await apiInstanse.post("/auth/logout");

  return res.data.status;
};

const getMe = async () => {
  const res = await apiInstanse.get("/auth/me");

  return res.data;
};

const logout = async () => {
  const res = await apiInstanse.post("/auth/logout");

  return res.data;
};

export const useLogout = () => {
  const router = useNavigate();

  return useMutation({
    mutationFn: () => logout(),
    onSuccess: (data) => {
      if (data.status) {
        router("/sign-in");
      }
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
};

export const useMe = () => {
  const { setUser } = useUserStore();

  const router = useNavigate();

  return useMutation({
    mutationFn: () => getMe(),
    onSuccess: (data) => {
      if (data.status) {
        setUser({ email: data.email });
      } else {
        router("/sign-in");
      }
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
};

export const useLogin = () => {
  const { setUser } = useUserStore();

  const router = useNavigate();

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginHandle(email, password),
    onSuccess: (data) => {
      if (data.status) {
        setUser({ ...data.user });
        router("/");
      }
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
};
