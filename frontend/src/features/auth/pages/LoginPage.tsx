import { LoginForm } from "../components/LoginForm";

export function LoginPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-5xl items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <LoginForm title="Login" />
      </div>
    </div>
  );
}
