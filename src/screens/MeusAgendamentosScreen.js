import {
  View, Text, TouchableOpacity, StyleSheet, Alert, SectionList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import StatusChip from '../components/StatusChip';
import { cores, bordas } from '../constants/theme';
import globalStyles from '../styles/globalStyles';

const ICONE_TIPO = { lavadora: 'water-outline', secadora: 'sync-outline' };

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
        <Ionicons
          name="clipboard-outline"
          size={48}
          color={cores.cinzaSuave}
          style={styles.vazioIcone}
        />
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
                <View style={styles.cardNomeLinha}>
                  <Ionicons
                    name={ICONE_TIPO[tipoMaquina(item.maquinaId)]}
                    size={18}
                    color={cores.azulPrimario}
                  />
                  <Text style={styles.cardNome}>{nomeMaquina(item.maquinaId)}</Text>
                </View>
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
              <View style={styles.cardNomeLinha}>
                <Ionicons
                  name={ICONE_TIPO[tipoMaquina(item.maquinaId)]}
                  size={18}
                  color={cores.azulPrimario}
                />
                <Text style={styles.cardNome}>{nomeMaquina(item.maquinaId)}</Text>
              </View>
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

const styles = StyleSheet.create({
  secao: {
    fontSize: 13,
    fontWeight: '700',
    color: cores.azulEscuro,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: 14,
    marginBottom: 8,
  },
  card: {
    backgroundColor: cores.branco,
    borderWidth: 1,
    borderColor: cores.azulAgua,
    borderRadius: bordas.lg,
    padding: 12,
    marginBottom: 10,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  cardNomeLinha: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  cardNome: {
    fontWeight: '700',
    fontSize: 15,
    color: cores.cinzaTexto,
  },
  cardHorario: {
    fontSize: 13,
    color: cores.cinzaSuave,
  },
  acoes: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
  },
  badge: {
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeTexto: {
    color: cores.branco,
    fontSize: 11,
    fontWeight: '700',
  },
  btnPrimario: {
    backgroundColor: cores.azulPrimario,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  btnPrimarioTexto: {
    color: cores.branco,
    fontSize: 13,
    fontWeight: '700',
  },
  btnOutline: {
    borderWidth: 1.5,
    borderColor: cores.azulPrimario,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  btnOutlineTexto: {
    color: cores.azulPrimario,
    fontSize: 13,
    fontWeight: '700',
  },
  btnPerigo: {
    borderWidth: 1.5,
    borderColor: cores.vermelhoReserv,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  btnPerigoTexto: {
    color: cores.vermelhoReserv,
    fontSize: 13,
    fontWeight: '700',
  },
  vazio: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  vazioIcone: {
    marginBottom: 12,
  },
  vazioTexto: {
    color: cores.cinzaSuave,
    fontSize: 15,
    textAlign: 'center',
  },
});
