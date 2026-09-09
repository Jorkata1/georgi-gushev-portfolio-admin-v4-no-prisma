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
  required?: boolean;
  minLength?: number;
  pattern?: string;
  title?: string;
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
  hint,
  required = false,
  minLength,
  pattern,
  title
}: AdminFieldProps) {
  const sharedClassName = `w-full rounded-2xl border px-4 py-3 text-white outline-none transition focus:border-primary/40 ${
    error
      ? "border-rose-400/60 bg-rose-400/5"
      : "border-white/10 bg-white/5"
  } file:mr-4 file:rounded-full file:border-0 file:bg-white file:px-4 file:py-2 file:text-sm file:font-semibold file:text-slate-950`;

  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-medium text-slate-200">
        {label}
        {required ? <span className="ml-1 text-rose-300">*</span> : null}
      </label>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          defaultValue={typeof defaultValue === "string" ? defaultValue : undefined}
          rows={rows}
          placeholder={placeholder}
          required={required}
          minLength={minLength}
          title={title}
          aria-invalid={Boolean(error)}
          className={sharedClassName}
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
          required={required}
          minLength={minLength}
          pattern={pattern}
          title={title}
          aria-invalid={Boolean(error)}
          className={sharedClassName}
        />
      )}
      {hint ? <p className="mt-2 text-xs text-slate-400">{hint}</p> : null}
      {error ? (
        <p className="mt-2 flex items-center gap-1.5 text-sm font-medium text-rose-300">
          <span aria-hidden="true">⚠</span>
          {error}
        </p>
      ) : null}
    </div>
  );
}