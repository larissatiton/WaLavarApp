import { View, Text, StyleSheet } from 'react-native';
import { cores } from '../constants/theme';

const CONFIG = {
  livre:        { label: 'Livre',         cor: cores.verdeLivre },
  em_uso:       { label: 'Em uso',        cor: cores.laranjaUso },
  reservada:    { label: 'Reservada',     cor: cores.vermelhoReserv },
  agendado:     { label: 'Agendado',      cor: cores.azulClaro },
  em_andamento: { label: 'Em andamento',  cor: cores.laranjaUso },
  concluido:    { label: 'Concluído',     cor: cores.verdeLivre },
  cancelado:    { label: 'Cancelado',     cor: cores.cinzaSuave },
};

export default function StatusChip({ status }) {
  const { label, cor } = CONFIG[status] ?? { label: status, cor: cores.cinzaSuave };
  return (
    <View style={[styles.chip, { backgroundColor: cor }]}>
      <Text style={styles.texto}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  texto: {
    color: cores.branco,
    fontSize: 11,
    fontWeight: '700',
  },
});
