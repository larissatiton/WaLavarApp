// calcula que horas termina dado o horário de início e a duração em milissegundos
function calcularTermino(horarioInicio, duracaoMs) {
  const [horas, minutos] = horarioInicio.split(':').map(Number);
  const fimMs = (horas * 60 + minutos) * 60 * 1000 + duracaoMs;

  const hFim = Math.floor(fimMs / 3600000) % 24;
  const mFim = Math.floor((fimMs % 3600000) / 60000);

  return `${String(hFim).padStart(2, '0')}:${String(mFim).padStart(2, '0')}`;
}

export { calcularTermino };
