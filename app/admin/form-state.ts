export type AdminFormState = {
  status: "idle" | "error";
  message?: string;
  fieldErrors?: Record<string, string[] | undefined>;
};

export const initialAdminFormState: AdminFormState = {
  status: "idle"
};