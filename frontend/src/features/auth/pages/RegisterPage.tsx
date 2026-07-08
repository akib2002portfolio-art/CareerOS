import { RegisterForm } from "../components/RegisterForm";

export function RegisterPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-5xl items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <RegisterForm title="Register" />
      </div>
    </div>
  );
}
