import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useApp } from '../context/AppContext';
import { cores, espacos, bordas } from '../constants/theme';

export default function ConfirmarAgendamentoScreen({ route, navigation }) {
  const { maquinaId, horario, maquinaNome } = route.params;
  const { agendar } = useApp();

  function confirmar() {
    agendar(maquinaId, horario);
    Alert.alert(
      'Agendado! ✅',
      `${maquinaNome} às ${horario} reservada com sucesso.`,
      [{ text: 'OK', onPress: () => navigation.popToTop() }]
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.icone}>🧺</Text>

      <View style={styles.resumo}>
        <View style={styles.linha}>
          <Text style={styles.chave}>Máquina</Text>
          <Text style={styles.valor}>{maquinaNome}</Text>
        </View>
        <View style={styles.linha}>
          <Text style={styles.chave}>Horário</Text>
          <Text style={styles.valor}>{horario}</Text>
        </View>
        <View style={styles.linha}>
          <Text style={styles.chave}>Duração</Text>
          <Text style={styles.valor}>~45 min</Text>
        </View>
        <View style={[styles.linha, styles.linhaFinal]}>
          <Text style={styles.chave}>Data</Text>
          <Text style={styles.valor}>Hoje</Text>
        </View>
      </View>

      <Text style={styles.aviso}>
        Você será avisado quando o ciclo começar e quando terminar.
      </Text>

      <TouchableOpacity style={styles.btnConfirmar} onPress={confirmar}>
        <Text style={styles.btnConfirmarTexto}>Confirmar agendamento</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.branco,
    padding: espacos.md,
  },
  icone: {
    fontSize: 52,
    textAlign: 'center',
    marginVertical: 18,
  },
  resumo: {
    backgroundColor: cores.azulAgua,
    borderRadius: bordas.lg,
    padding: 18,
    marginBottom: 16,
  },
  linha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cfe1f5',
  },
  linhaFinal: {
    borderBottomWidth: 0,
  },
  chave: {
    color: cores.cinzaSuave,
    fontSize: 14,
  },
  valor: {
    fontWeight: '700',
    fontSize: 14,
    color: cores.cinzaTexto,
  },
  aviso: {
    textAlign: 'center',
    fontSize: 13,
    color: cores.cinzaSuave,
    paddingHorizontal: 10,
    marginBottom: 24,
  },
  btnConfirmar: {
    backgroundColor: cores.azulPrimario,
    borderRadius: bordas.md,
    padding: 14,
    alignItems: 'center',
  },
  btnConfirmarTexto: {
    color: cores.branco,
    fontSize: 15,
    fontWeight: '700',
  },
});
