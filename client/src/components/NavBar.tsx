import Link from "next/link";
import { useRouter } from "next/router";
import { useCheckAuth } from "../utils/useCheckAuth";

const NavBar = () => {
  const { data: authData, loading: authLoading } = useCheckAuth();
  const router = useRouter();

  return (
    <>
      <Link href="/">StudBud</Link>
      {authLoading ? (
        <div>Loading</div>
      ) : router.route == "/login" ||
        router.route == "/register" ||
        router.route == "/logout" ? null : authData?.getUser ? (
        <div>
          <span>Hello, {authData.getUser.username}</span>
          <Link href="/logout">
            <a>Log out</a>
          </Link>
        </div>
      ) : (
        <div>
          <Link href="/register">
            <a>Register</a>
          </Link>
          <Link href="/login">
            <a>Log in</a>
          </Link>
        </div>
      )}
    </>
  );
};

export default NavBar;
