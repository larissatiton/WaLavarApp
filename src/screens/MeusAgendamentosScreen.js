import {
  View, Text, TouchableOpacity, Alert, SectionList,
} from 'react-native';
import { useApp } from '../context/AppContext';
import StatusChip from '../components/StatusChip';
import { cores } from '../constants/theme';
import globalStyles from '../styles/globalStyles';
import styles from '../styles/MeusAgendamentosScreenStyles';

const ICONE_TIPO = { lavadora: '🧺', secadora: '🌀' };

export default function MeusAgendamentosScreen() {
  const { maquinas, meusAgendamentos, minhasFila, cancelarAgendamento, sairDaFila, iniciarCiclo } = useApp();

  const meus = meusAgendamentos();
  const filas = minhasFila();

  function nomeMaquina(id) {
    return maquinas.find(m => m.id === id)?.nome ?? id;
  }

  function tipoMaquina(id) {
    return maquinas.find(m => m.id === id)?.tipo ?? 'lavadora';
  }

  function confirmarCancelar(ag) {
    Alert.alert(
      'Cancelar agendamento',
      `Cancelar ${nomeMaquina(ag.maquinaId)} às ${ag.horario}?`,
      [
        { text: 'Não', style: 'cancel' },
        { text: 'Sim, cancelar', style: 'destructive', onPress: () => cancelarAgendamento(ag.id) },
      ]
    );
  }

  function confirmarIniciar(ag) {
    Alert.alert(
      'Iniciar ciclo',
      `Iniciar ${nomeMaquina(ag.maquinaId)} agora?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Iniciar', onPress: () => iniciarCiclo(ag.id) },
      ]
    );
  }

  // Seções separadas para agendamentos e fila
  const secoes = [
    { title: 'Agendamentos', data: meus },
    { title: 'Fila de espera', data: filas },
  ].filter(s => s.data.length > 0);

  if (secoes.length === 0) {
    return (
      <View style={[globalStyles.tela, styles.vazio]}>
        <Text style={styles.vazioIcone}>📋</Text>
        <Text style={styles.vazioTexto}>Nenhum agendamento ou fila ativa.</Text>
      </View>
    );
  }

  return (
    <SectionList
      style={globalStyles.tela}
      sections={secoes}
      keyExtractor={item => item.id}
      contentContainerStyle={globalStyles.conteudo}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.secao}>{title}</Text>
      )}
      renderItem={({ item, section }) => {
        // Card de fila de espera
        if (section.title === 'Fila de espera') {
          return (
            <View style={styles.card}>
              <View style={styles.cardTop}>
                <Text style={styles.cardNome}>
                  {ICONE_TIPO[tipoMaquina(item.maquinaId)]} {nomeMaquina(item.maquinaId)}
                </Text>
                <View style={[styles.badge, { backgroundColor: cores.laranjaUso }]}>
                  <Text style={styles.badgeTexto}>Fila {item.posicao}º</Text>
                </View>
              </View>
              <Text style={styles.cardHorario}>Slot das {item.horario}</Text>
              <View style={styles.acoes}>
                <TouchableOpacity
                  style={[styles.btnPerigo, { flex: 1 }]}
                  onPress={() => sairDaFila(item.id)}>
                  <Text style={styles.btnPerigoTexto}>Sair da fila</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }

        // Card de agendamento normal
        const podeIniciar = item.status === 'agendado';
        const emAndamento = item.status === 'em_andamento';
        const concluido = item.status === 'concluido';

        return (
          <View style={styles.card}>
            <View style={styles.cardTop}>
              <Text style={styles.cardNome}>
                {ICONE_TIPO[tipoMaquina(item.maquinaId)]} {nomeMaquina(item.maquinaId)}
              </Text>
              <StatusChip status={item.status} />
            </View>
            <Text style={styles.cardHorario}>Hoje às {item.horario}</Text>

            {!concluido && (
              <View style={styles.acoes}>
                {emAndamento && (
                  <View style={[styles.btnOutline, { flex: 1 }]}>
                    <Text style={styles.btnOutlineTexto}>Em andamento...</Text>
                  </View>
                )}
                {podeIniciar && (
                  <>
                    <TouchableOpacity
                      style={[styles.btnPrimario, { flex: 1 }]}
                      onPress={() => confirmarIniciar(item)}>
                      <Text style={styles.btnPrimarioTexto}>Iniciar ciclo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.btnPerigo}
                      onPress={() => confirmarCancelar(item)}>
                      <Text style={styles.btnPerigoTexto}>Cancelar</Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            )}
          </View>
        );
      }}
    />
  );
}
