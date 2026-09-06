import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { cores, bordas } from '../constants/theme';

export default function SlotItem({ slot, filaCount, onAgendar, onEntrarFila }) {
  const statusTexto = slot.disponivel
    ? 'Disponível'
    : filaCount > 0
    ? `Ocupado · fila: ${filaCount}`
    : 'Ocupado';

  return (
    <View style={[styles.slot, !slot.disponivel && styles.slotOcupado]}>
      <View>
        <Text style={styles.hora}>{slot.horario}</Text>
        <Text style={styles.status}>{statusTexto}</Text>
      </View>
      {slot.disponivel ? (
        <TouchableOpacity style={styles.btnPrimario} onPress={onAgendar}>
          <Text style={styles.btnPrimarioTexto}>Agendar</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.btnOutline} onPress={onEntrarFila}>
          <Text style={styles.btnOutlineTexto}>Entrar na fila</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  slot: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderWidth: 1,
    borderColor: cores.azulAgua,
    borderRadius: bordas.md,
    marginBottom: 8,
    backgroundColor: cores.branco,
  },
  slotOcupado: {
    backgroundColor: '#fafafa',
  },
  hora: {
    fontWeight: '700',
    fontSize: 15,
    color: cores.cinzaTexto,
  },
  status: {
    fontSize: 11,
    color: cores.cinzaSuave,
    marginTop: 2,
  },
  btnPrimario: {
    backgroundColor: cores.azulPrimario,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  btnPrimarioTexto: {
    color: cores.branco,
    fontSize: 12,
    fontWeight: '700',
  },
  btnOutline: {
    borderWidth: 1.5,
    borderColor: cores.azulPrimario,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  btnOutlineTexto: {
    color: cores.azulPrimario,
    fontSize: 12,
    fontWeight: '700',
  },
});
