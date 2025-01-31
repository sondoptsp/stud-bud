import { useRouter } from "next/router";
import { useEffect } from "react";
import { useGetUserQuery } from "../generated/graphql";

export const useCheckAuth = () => {
  const { data, loading } = useGetUserQuery();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (
        data?.getUser &&
        (router.route === "/login" ||
          router.route === "/register" ||
          router.route === "/forgot-password" ||
          router.route === "/change-password")
      ) {
        //Already logged in
        router.replace("/");
      } else if (
        !data?.getUser &&
        router.route !== "/login" &&
        router.route !== "/register" &&
        router.route !== "/forgot-password" &&
        router.route !== "/"
      ) {
        router.replace("/login");
      }
    }
    //NOT LOGGED IN -> Redirect to login page
  }, [data, loading, router]);

  return { data, loading };
};
