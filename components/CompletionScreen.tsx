type CompletionScreenProps = {
  diagnosticId?: string | null;
  onReset: () => void;
};

export default function CompletionScreen({
  diagnosticId,
  onReset,
}: CompletionScreenProps) {
  return (
    <section className="max-w-3xl mx-auto border border-[#2d3a41] bg-[#0e1419] rounded-3xl p-10 text-center">
      <p className="text-xs uppercase tracking-[0.35em] text-[#c8a96e] mb-5">
        AXISSCAN™ recibido
      </p>

      <h1 className="text-4xl md:text-5xl text-white mb-6">
        Cuestionario finalizado correctamente
      </h1>

      <p className="text-zinc-300 leading-7 mb-8">
        Gracias. La información fue recibida y será procesada para emitir un
        diagnóstico estratégico. El resultado será revisado internamente por el
        equipo administrador.
      </p>

      {diagnosticId && (
        <div className="mb-8 border border-[#26333a] bg-[#080c0f] rounded-2xl p-5">
          <p className="text-xs uppercase tracking-[0.25em] text-zinc-500 mb-2">
            Folio interno
          </p>
          <p className="font-mono text-sm text-[#c8a96e] break-all">
            {diagnosticId}
          </p>
        </div>
      )}

      <button
        onClick={onReset}
        className="bg-[#c8a96e] text-black px-8 py-4 rounded-md uppercase tracking-[0.25em] text-xs hover:bg-[#d9bb81] transition-all"
      >
        Capturar otro diagnóstico
      </button>
    </section>
  );
}
