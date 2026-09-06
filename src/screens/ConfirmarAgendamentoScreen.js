import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useApp } from '../context/AppContext';
import globalStyles from '../styles/globalStyles';
import styles from '../styles/ConfirmarAgendamentoScreenStyles';

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
    <ScrollView
      style={globalStyles.tela}
      contentContainerStyle={globalStyles.conteudo}>
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
    </ScrollView>
  );
}
