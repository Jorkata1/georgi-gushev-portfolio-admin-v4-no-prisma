import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/login-form";
import { Container } from "@/components/shared/container";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { createMetadata } from "@/lib/site-metadata";

export const metadata = createMetadata({
  title: "Admin Login",
  description: "Вход за административния панел на портфолиото.",
  path: "/admin/login"
});

export default async function AdminLoginPage() {
  const authenticated = await isAdminAuthenticated();

  if (authenticated) {
    redirect("/admin/projects");
  }

  return (
    <section className="section-padding">
      <Container className="max-w-xl">
        <div className="surface-strong p-8 sm:p-10">
          <span className="eyebrow">Admin</span>
          <h1 className="mt-4 text-3xl font-semibold text-white">Вход в админ панела</h1>
          <p className="mt-4 text-slate-300">
            Оттук можеш да редактираш проектите в портфолиото, без да пипаш кода.
          </p>

          <div className="mt-8">
            <LoginForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
