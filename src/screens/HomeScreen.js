import { View, Text, SectionList, ActivityIndicator } from 'react-native';
import { useApp } from '../context/AppContext';
import MaquinaCard from '../components/MaquinaCard';
import { cores } from '../constants/theme';
import globalStyles from '../styles/globalStyles';
import styles from '../styles/HomeScreenStyles';

export default function HomeScreen({ navigation }) {
  const { maquinas, carregando } = useApp();

  if (carregando) {
    return (
      <View style={[globalStyles.tela, styles.loading]}>
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
      style={globalStyles.tela}
      sections={secoes}
      keyExtractor={item => item.id}
      contentContainerStyle={globalStyles.conteudo}
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
