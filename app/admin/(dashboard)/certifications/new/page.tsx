import { CertificationForm } from "@/components/admin/certification-form";

export default function NewCertificationPage() {
  return (
    <div className="surface p-6 sm:p-8">
      <div className="mb-8">
        <span className="eyebrow">Нов сертификат</span>
        <h2 className="mt-3 text-2xl font-semibold text-white">Добави нов сертификат</h2>
        <p className="mt-3 max-w-2xl text-slate-300">
          Добави сертификат, курс или външен proof link към обучението.
        </p>
      </div>

      <CertificationForm />
    </div>
  );
}
