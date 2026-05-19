export type CompanyFormData = {
  name: string;
  contactName: string;
  industry: string;
  contactEmail: string;
};

type CompanySetupScreenProps = {
  company: CompanyFormData;
  onChange: (company: CompanyFormData) => void;
  onContinue: () => void;
};

export default function CompanySetupScreen({
  company,
  onChange,
  onContinue,
}: CompanySetupScreenProps) {
  const canContinue =
    company.name.trim().length > 0 &&
    company.contactName.trim().length > 0 &&
    company.industry.trim().length > 0;

  function updateField(field: keyof CompanyFormData, value: string) {
    onChange({
      ...company,
      [field]: value,
    });
  }

  return (
    <section className="max-w-4xl mx-auto">
      <div className="mb-12">
        <p className="text-xs uppercase tracking-[0.35em] text-[#c8a96e] mb-5">
          AXISSCAN™ Intake
        </p>
        <h1 className="text-4xl md:text-5xl leading-tight text-white mb-6">
          Datos de identificación
        </h1>
        <p className="text-zinc-400 leading-7 max-w-2xl">
          Antes del cuestionario, captura los datos básicos de la empresa encuestada. Esta información se guardará como metadata estructurada para consulta histórica.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-5 mb-10">
        <label className="block">
          <span className="text-xs uppercase tracking-[0.25em] text-zinc-500 block mb-3">
            Empresa
          </span>
          <input
            value={company.name}
            onChange={(event) => updateField("name", event.target.value)}
            placeholder="Nombre de la empresa"
            className="w-full bg-[#0e1419] border border-zinc-800 rounded-2xl px-5 py-4 text-[#d4cfc8] placeholder:text-zinc-600 outline-none focus:border-[#c8a96e] transition-all"
          />
        </label>

        <label className="block">
          <span className="text-xs uppercase tracking-[0.25em] text-zinc-500 block mb-3">
            Responsable
          </span>
          <input
            value={company.contactName}
            onChange={(event) => updateField("contactName", event.target.value)}
            placeholder="Nombre del responsable"
            className="w-full bg-[#0e1419] border border-zinc-800 rounded-2xl px-5 py-4 text-[#d4cfc8] placeholder:text-zinc-600 outline-none focus:border-[#c8a96e] transition-all"
          />
        </label>

        <label className="block">
          <span className="text-xs uppercase tracking-[0.25em] text-zinc-500 block mb-3">
            Sector
          </span>
          <input
            value={company.industry}
            onChange={(event) => updateField("industry", event.target.value)}
            placeholder="Ej. Servicios, retail, manufactura"
            className="w-full bg-[#0e1419] border border-zinc-800 rounded-2xl px-5 py-4 text-[#d4cfc8] placeholder:text-zinc-600 outline-none focus:border-[#c8a96e] transition-all"
          />
        </label>

        <label className="block">
          <span className="text-xs uppercase tracking-[0.25em] text-zinc-500 block mb-3">
            Correo de contacto
          </span>
          <input
            type="email"
            value={company.contactEmail}
            onChange={(event) => updateField("contactEmail", event.target.value)}
            placeholder="correo@empresa.com"
            className="w-full bg-[#0e1419] border border-zinc-800 rounded-2xl px-5 py-4 text-[#d4cfc8] placeholder:text-zinc-600 outline-none focus:border-[#c8a96e] transition-all"
          />
        </label>
      </div>

      <button
        onClick={onContinue}
        disabled={!canContinue}
        className={`px-10 py-4 rounded-md uppercase tracking-[0.3em] text-xs transition-all ${
          canContinue
            ? "bg-[#c8a96e] text-black hover:bg-[#d9bb81]"
            : "bg-zinc-800 text-zinc-600 cursor-not-allowed"
        }`}
      >
        Iniciar cuestionario
      </button>
    </section>
  );
}
