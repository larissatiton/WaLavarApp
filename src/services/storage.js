import AsyncStorage from '@react-native-async-storage/async-storage';

const CHAVES = {
  agendamentos: '@walavar:agendamentos',
  fila: '@walavar:fila',
  slots: '@walavar:slots',
};

async function salvarAgendamentos(agendamentos) {
  await AsyncStorage.setItem(CHAVES.agendamentos, JSON.stringify(agendamentos));
}

async function carregarAgendamentos() {
  const dados = await AsyncStorage.getItem(CHAVES.agendamentos);
  return dados ? JSON.parse(dados) : [];
}

async function salvarFila(fila) {
  await AsyncStorage.setItem(CHAVES.fila, JSON.stringify(fila));
}

async function carregarFila() {
  const dados = await AsyncStorage.getItem(CHAVES.fila);
  return dados ? JSON.parse(dados) : [];
}

async function salvarSlots(slots) {
  await AsyncStorage.setItem(CHAVES.slots, JSON.stringify(slots));
}

async function carregarSlots() {
  const dados = await AsyncStorage.getItem(CHAVES.slots);
  return dados ? JSON.parse(dados) : null;
}

export {
  salvarAgendamentos, carregarAgendamentos,
  salvarFila, carregarFila,
  salvarSlots, carregarSlots,
};
