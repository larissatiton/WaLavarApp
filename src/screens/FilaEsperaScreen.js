import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useApp } from '../context/AppContext';
import globalStyles from '../styles/globalStyles';
import styles from '../styles/FilaEsperaScreenStyles';

export default function FilaEsperaScreen({ route, navigation }) {
  const { maquinaId, horario, maquinaNome } = route.params;
  const { filaDe, entrarNaFila, sairDaFila, USUARIO } = useApp();

  const filaAtual = filaDe(maquinaId, horario);
  const meuItem = filaAtual.find(f => f.usuario === USUARIO);

  function entrar() {
    entrarNaFila(maquinaId, horario);
  }

  function sair() {
    Alert.alert('Sair da fila', 'Deseja realmente sair da fila?', [
      { text: 'Não', style: 'cancel' },
      {
        text: 'Sair',
        style: 'destructive',
        onPress: () => {
          sairDaFila(meuItem.id);
          navigation.goBack();
        },
      },
    ]);
  }

  return (
    <ScrollView
      style={globalStyles.tela}
      contentContainerStyle={globalStyles.conteudo}>
      {/* Posição na fila ou botão para entrar */}
      {meuItem ? (
        <View style={styles.posicaoBox}>
          <Text style={styles.posNum}>{meuItem.posicao}º</Text>
          <Text style={styles.posLabel}>sua posição na fila</Text>
        </View>
      ) : (
        <TouchableOpacity style={styles.btnEntrar} onPress={entrar}>
          <Text style={styles.btnEntrarTexto}>Entrar na fila</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.secao}>
        Fila atual — {maquinaNome} às {horario}
      </Text>

      {filaAtual.length === 0 ? (
        <Text style={styles.vazio}>Nenhuma pessoa na fila ainda.</Text>
      ) : (
        <View>
          {filaAtual.map(item => (
            <View
              key={item.id}
              style={[styles.item, item.usuario === USUARIO && styles.itemEu]}>
              <View style={styles.numBox}>
                <Text style={styles.numTexto}>{item.posicao}</Text>
              </View>
              <Text style={styles.itemNome}>
                {item.usuario === USUARIO ? 'Você' : 'Cliente'}
              </Text>
              {item.usuario === USUARIO && (
                <Text style={styles.euTag}>← você</Text>
              )}
            </View>
          ))}
        </View>
      )}

      <Text style={styles.aviso}>
        Avisaremos quando a máquina liberar para você.
      </Text>

      {meuItem && (
        <TouchableOpacity style={styles.btnSair} onPress={sair}>
          <Text style={styles.btnSairTexto}>Sair da fila</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}
