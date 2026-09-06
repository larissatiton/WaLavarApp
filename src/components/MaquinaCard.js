import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cores, bordas } from '../constants/theme';
import StatusChip from './StatusChip';

const ICONE = { lavadora: 'water-outline', secadora: 'sync-outline' };

export default function MaquinaCard({ maquina, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.75}>
      <View style={styles.iconeBox}>
        <Ionicons
          name={ICONE[maquina.tipo]}
          size={24}
          color={cores.azulPrimario}
        />
      </View>
      <View style={styles.info}>
        <Text style={styles.nome}>{maquina.nome}</Text>
        <Text style={styles.dica}>Toque para ver horários</Text>
      </View>
      <StatusChip status={maquina.status} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: cores.azulAgua,
    borderRadius: bordas.lg,
    padding: 12,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconeBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: cores.branco,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: { flex: 1 },
  nome: {
    fontWeight: '700',
    fontSize: 15,
    color: cores.cinzaTexto,
  },
  dica: {
    fontSize: 12,
    color: cores.cinzaSuave,
    marginTop: 2,
  },
});
