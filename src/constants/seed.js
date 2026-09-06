// Dados iniciais das máquinas e slots para a demonstração
const MAQUINAS_INICIAIS = [
  { id: 'lav-1', nome: 'Lavadora 1', tipo: 'lavadora', status: 'livre' },
  { id: 'lav-2', nome: 'Lavadora 2', tipo: 'lavadora', status: 'em_uso' },
  { id: 'lav-3', nome: 'Lavadora 3', tipo: 'lavadora', status: 'reservada' },
  { id: 'sec-1', nome: 'Secadora 1', tipo: 'secadora', status: 'livre' },
  { id: 'sec-2', nome: 'Secadora 2', tipo: 'secadora', status: 'livre' },
  { id: 'sec-3', nome: 'Secadora 3', tipo: 'secadora', status: 'em_uso' },
];

// Slots pré-ocupados para mostrar os estados "em uso" e fila de espera na demo
const SLOTS_OCUPADOS = new Set([
  'lav-2-09:00', 'lav-2-10:00',
  'lav-3-10:00', 'lav-3-11:00',
  'sec-3-08:00', 'sec-3-09:00',
]);

function gerarSlotsIniciais() {
  const todos = [];
  for (const maquina of MAQUINAS_INICIAIS) {
    // Funcionamento: 08h–22h (Seg–Sáb) com slots de 1 hora
    for (let h = 8; h <= 21; h++) {
      const horario = `${String(h).padStart(2, '0')}:00`;
      const id = `${maquina.id}-${horario}`;
      todos.push({
        id,
        maquinaId: maquina.id,
        horario,
        disponivel: !SLOTS_OCUPADOS.has(id),
      });
    }
  }
  return todos;
}

export { MAQUINAS_INICIAIS, gerarSlotsIniciais };
