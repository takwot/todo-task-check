import { createBrowserRouter } from "react-router-dom";
import { SignInPage } from "../pages/sign-in";
import { Todo } from "../pages/todo";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Todo />,
  },
  {
    path: "/sign-in",
    element: <SignInPage />,
  },
]);
