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

const registerHandle = async (email: string, password: string) => {
  const res = await apiInstanse.post("/auth/register", { email, password });

  return res.data;
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      registerHandle(data.email, data.password),
    onSuccess: (data) => {
      if (data.status) {
        alert("Success! Login into your account");
        return true;
      }
    },
    onError: (error) => {
      alert("Error while creating user");
      throw new Error(error.message);
    },
  });
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
      throw new Error(error.message);
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
      router("/sign-in");
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
    onError: () => {
      alert("Login error");
    },
  });
};
