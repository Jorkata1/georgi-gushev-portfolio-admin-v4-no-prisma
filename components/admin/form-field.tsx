type AdminFieldProps = {
  label: string;
  name: string;
  defaultValue?: string | number;
  error?: string;
  textarea?: boolean;
  rows?: number;
  placeholder?: string;
  type?: string;
  accept?: string;
  multiple?: boolean;
  hint?: string;
};

export function AdminField({
  label,
  name,
  defaultValue,
  error,
  textarea = false,
  rows = 5,
  placeholder,
  type = "text",
  accept,
  multiple = false,
  hint
}: AdminFieldProps) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-medium text-slate-200">
        {label}
      </label>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          defaultValue={typeof defaultValue === "string" ? defaultValue : undefined}
          rows={rows}
          placeholder={placeholder}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-primary/40"
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          defaultValue={type === "file" ? undefined : String(defaultValue ?? "")}
          placeholder={placeholder}
          accept={accept}
          multiple={multiple}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition file:mr-4 file:rounded-full file:border-0 file:bg-white file:px-4 file:py-2 file:text-sm file:font-semibold file:text-slate-950 focus:border-primary/40"
        />
      )}
      {hint ? <p className="mt-2 text-xs text-slate-400">{hint}</p> : null}
      {error ? <p className="mt-2 text-sm text-rose-300">{error}</p> : null}
    </div>
  );
}
