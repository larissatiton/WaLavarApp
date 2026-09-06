import { View, Text, FlatList, Alert } from 'react-native';
import { useApp } from '../context/AppContext';
import SlotItem from '../components/SlotItem';
import globalStyles from '../styles/globalStyles';
import styles from '../styles/MaquinaDetalheScreenStyles';

export default function MaquinaDetalheScreen({ route, navigation }) {
  const { maquinaId } = route.params;
  const { slotsDeUmaMaquina, filaDe, jaAgendadoNeste, jaEstouNaFila } = useApp();

  const slotsDaMaquina = slotsDeUmaMaquina(maquinaId);

  function irParaConfirmar(slot) {
    if (jaAgendadoNeste(maquinaId, slot.horario)) {
      Alert.alert('Aviso', 'Você já tem um agendamento neste horário.');
      return;
    }
    navigation.navigate('ConfirmarAgendamento', {
      maquinaId,
      horario: slot.horario,
      maquinaNome: route.params.maquinaNome,
    });
  }

  function irParaFila(slot) {
    if (jaEstouNaFila(maquinaId, slot.horario)) {
      Alert.alert('Aviso', 'Você já está na fila para este horário.');
      return;
    }
    navigation.navigate('FilaEspera', {
      maquinaId,
      horario: slot.horario,
      maquinaNome: route.params.maquinaNome,
    });
  }

  return (
    <View style={globalStyles.tela}>
      <FlatList
        style={globalStyles.tela}
        data={slotsDaMaquina}
        keyExtractor={item => item.id}
        contentContainerStyle={globalStyles.conteudo}
        ListHeaderComponent={
          <Text style={styles.subtitulo}>Horários disponíveis hoje</Text>
        }
        renderItem={({ item }) => (
          <SlotItem
            slot={item}
            filaCount={filaDe(maquinaId, item.horario).length}
            onAgendar={() => irParaConfirmar(item)}
            onEntrarFila={() => irParaFila(item)}
          />
        )}
      />
    </View>
  );
}
