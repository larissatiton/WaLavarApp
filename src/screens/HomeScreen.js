import { View, Text, SectionList, StyleSheet, ActivityIndicator } from 'react-native';
import { useApp } from '../context/AppContext';
import MaquinaCard from '../components/MaquinaCard';
import { cores, espacos } from '../constants/theme';

export default function HomeScreen({ navigation }) {
  const { maquinas, carregando } = useApp();

  if (carregando) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={cores.azulPrimario} />
      </View>
    );
  }

  const secoes = [
    { title: 'Lavadoras', data: maquinas.filter(m => m.tipo === 'lavadora') },
    { title: 'Secadoras', data: maquinas.filter(m => m.tipo === 'secadora') },
  ];

  return (
    <SectionList
      sections={secoes}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.lista}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.secao}>{title}</Text>
      )}
      renderItem={({ item }) => (
        <MaquinaCard
          maquina={item}
          onPress={() =>
            navigation.navigate('MaquinaDetalhe', {
              maquinaId: item.id,
              maquinaNome: item.nome,
            })
          }
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: cores.branco,
  },
  lista: {
    padding: espacos.md,
    backgroundColor: cores.branco,
    flexGrow: 1,
  },
  secao: {
    fontSize: 13,
    fontWeight: '700',
    color: cores.azulEscuro,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: 14,
    marginBottom: 8,
  },
});
