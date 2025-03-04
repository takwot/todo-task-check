import { RouterProvider as Provider } from "react-router-dom";
import { router } from "../router";

const RouterProvider = () => {
  return <Provider router={router} />;
};

export default RouterProvider;
