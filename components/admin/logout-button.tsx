import { logoutAdminAction } from "@/app/admin/actions";

export function LogoutButton() {
  return (
    <form action={logoutAdminAction}>
      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/5"
      >
        Изход
      </button>
    </form>
  );
}
