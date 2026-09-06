import * as Notifications from 'expo-notifications';

// Duração curta para caber no vídeo de demonstração.
// Em produção seria a duração real do ciclo (ex.: 45 * 60 * 1000 para lavagem).
export const DURACAO_CICLO_MS = 40000; // 40 segundos

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function solicitarPermissao() {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

export async function notificarInicio(nomeMaquina) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'WaLavar',
      body: `Sua lavagem começou na ${nomeMaquina}.`,
    },
    trigger: null, // disparo imediato
  });
}

export async function notificarTermino(nomeMaquina) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'WaLavar',
      body: `Sua roupa terminou! Retire da ${nomeMaquina}.`,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: DURACAO_CICLO_MS / 1000,
    },
  });
}
