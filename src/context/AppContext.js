import { createContext, useContext, useState, useEffect } from 'react';
import { MAQUINAS_INICIAIS, gerarSlotsIniciais } from '../constants/seed';
import {
  salvarAgendamentos, carregarAgendamentos,
  salvarFila, carregarFila,
  salvarSlots, carregarSlots,
} from '../services/storage';
import {
  solicitarPermissao,
  notificarInicio,
  notificarTermino,
  DURACAO_CICLO_MS,
} from '../services/notificacoes';

const AppContext = createContext(null);

// nome do usuário no MVP, sem login
const USUARIO = 'eu';

export function AppProvider({ children }) {
  const [maquinas, setMaquinas] = useState(MAQUINAS_INICIAIS);
  const [slots, setSlots] = useState([]);
  const [agendamentos, setAgendamentos] = useState([]);
  const [fila, setFila] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // carrega os dados salvos quando o app abre
  useEffect(() => {
    async function carregar() {
      await solicitarPermissao();

      const agsSalvos = await carregarAgendamentos();
      const filaSalva = await carregarFila();
      const slotsSalvos = await carregarSlots();

      setAgendamentos(agsSalvos);
      setFila(filaSalva);
      // se nunca salvou antes, usa os dados iniciais
      setSlots(slotsSalvos ?? gerarSlotsIniciais());
      setCarregando(false);
    }
    carregar();
  }, []);

  // salva agendamentos sempre que mudar (só depois de carregar)
  useEffect(() => {
    if (!carregando) {
      salvarAgendamentos(agendamentos);
    }
  }, [agendamentos]);

  useEffect(() => {
    if (!carregando) {
      salvarFila(fila);
    }
  }, [fila]);

  useEffect(() => {
    if (!carregando) {
      salvarSlots(slots);
    }
  }, [slots]);

  function agendar(maquinaId, horario) {
    const novoAgendamento = {
      id: String(Date.now()),
      maquinaId,
      horario,
      usuario: USUARIO,
      criadoEm: Date.now(),
      status: 'agendado',
    };

    setAgendamentos(prev => [...prev, novoAgendamento]);

    // marca o slot como ocupado
    setSlots(prev =>
      prev.map(s =>
        s.maquinaId === maquinaId && s.horario === horario
          ? { ...s, disponivel: false }
          : s
      )
    );

    setMaquinas(prev =>
      prev.map(m =>
        m.id === maquinaId && m.status === 'livre' ? { ...m, status: 'reservada' } : m
      )
    );
  }

  function cancelarAgendamento(agId) {
    const ag = agendamentos.find(a => a.id === agId);
    if (!ag) return;

    setAgendamentos(prev => prev.filter(a => a.id !== agId));

    setSlots(prev =>
      prev.map(s =>
        s.maquinaId === ag.maquinaId && s.horario === ag.horario
          ? { ...s, disponivel: true }
          : s
      )
    );

    setMaquinas(prev =>
      prev.map(m =>
        m.id === ag.maquinaId && m.status === 'reservada' ? { ...m, status: 'livre' } : m
      )
    );
  }

  function entrarNaFila(maquinaId, horario) {
    const filaDeste = fila.filter(
      f => f.maquinaId === maquinaId && f.horario === horario
    );

    const novoItem = {
      id: String(Date.now()),
      maquinaId,
      horario,
      usuario: USUARIO,
      posicao: filaDeste.length + 1,
    };

    setFila(prev => [...prev, novoItem]);
  }

  function sairDaFila(filaId) {
    const item = fila.find(f => f.id === filaId);
    if (!item) return;

    const semEle = fila.filter(f => f.id !== filaId);

    // reajusta posição de quem estava atrás na fila
    const atualizada = semEle.map(f => {
      if (f.maquinaId === item.maquinaId && f.horario === item.horario && f.posicao > item.posicao) {
        return { ...f, posicao: f.posicao - 1 };
      }
      return f;
    });

    setFila(atualizada);
  }

  async function iniciarCiclo(agId) {
    const ag = agendamentos.find(a => a.id === agId);
    if (!ag) return;

    const maquina = maquinas.find(m => m.id === ag.maquinaId);

    setAgendamentos(prev =>
      prev.map(a => (a.id === agId ? { ...a, status: 'em_andamento' } : a))
    );
    setMaquinas(prev =>
      prev.map(m => (m.id === ag.maquinaId ? { ...m, status: 'em_uso' } : m))
    );

    await notificarInicio(maquina?.nome ?? 'máquina');
    await notificarTermino(maquina?.nome ?? 'máquina');

    // após a duração do ciclo, atualiza o status para concluído
    setTimeout(() => {
      setAgendamentos(prev =>
        prev.map(a => (a.id === agId ? { ...a, status: 'concluido' } : a))
      );
      setMaquinas(prev =>
        prev.map(m => (m.id === ag.maquinaId ? { ...m, status: 'livre' } : m))
      );
    }, DURACAO_CICLO_MS);
  }

  function slotsDeUmaMaquina(maquinaId) {
    return slots.filter(s => s.maquinaId === maquinaId);
  }

  function filaDe(maquinaId, horario) {
    return fila
      .filter(f => f.maquinaId === maquinaId && f.horario === horario)
      .sort((a, b) => a.posicao - b.posicao);
  }

  function meusAgendamentos() {
    return agendamentos.filter(a => a.usuario === USUARIO);
  }

  function minhasFila() {
    return fila.filter(f => f.usuario === USUARIO);
  }

  function jaAgendadoNeste(maquinaId, horario) {
    return agendamentos.some(
      a => a.maquinaId === maquinaId && a.horario === horario && a.usuario === USUARIO
    );
  }

  function jaEstouNaFila(maquinaId, horario) {
    return fila.some(
      f => f.maquinaId === maquinaId && f.horario === horario && f.usuario === USUARIO
    );
  }

  return (
    <AppContext.Provider value={{
      maquinas,
      slots,
      agendamentos,
      fila,
      carregando,
      USUARIO,
      agendar,
      cancelarAgendamento,
      entrarNaFila,
      sairDaFila,
      iniciarCiclo,
      slotsDeUmaMaquina,
      filaDe,
      meusAgendamentos,
      minhasFila,
      jaAgendadoNeste,
      jaEstouNaFila,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
