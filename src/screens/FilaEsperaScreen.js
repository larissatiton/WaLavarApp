import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useApp } from '../context/AppContext';
import { cores, espacos, bordas } from '../constants/theme';

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
    <View style={styles.container}>
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
        <FlatList
          data={filaAtual}
          keyExtractor={item => item.id}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <View style={[styles.item, item.usuario === USUARIO && styles.itemEu]}>
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
          )}
        />
      )}

      <Text style={styles.aviso}>
        Avisaremos quando a máquina liberar para você.
      </Text>

      {meuItem && (
        <TouchableOpacity style={styles.btnSair} onPress={sair}>
          <Text style={styles.btnSairTexto}>Sair da fila</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.branco,
    padding: espacos.md,
  },
  posicaoBox: {
    backgroundColor: cores.azulPrimario,
    borderRadius: bordas.lg,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
  },
  posNum: {
    fontSize: 46,
    fontWeight: '800',
    color: cores.branco,
    lineHeight: 52,
  },
  posLabel: {
    fontSize: 12,
    color: cores.branco,
    opacity: 0.9,
    marginTop: 4,
  },
  secao: {
    fontSize: 13,
    fontWeight: '700',
    color: cores.azulEscuro,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  vazio: {
    color: cores.cinzaSuave,
    fontSize: 13,
    textAlign: 'center',
    marginVertical: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemEu: {
    backgroundColor: cores.azulAgua,
    borderRadius: 10,
    borderBottomWidth: 0,
  },
  numBox: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: cores.azulAgua,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numTexto: {
    fontWeight: '700',
    fontSize: 12,
    color: cores.azulEscuro,
  },
  itemNome: {
    fontSize: 13,
    color: cores.cinzaTexto,
    flex: 1,
  },
  euTag: {
    fontSize: 11,
    color: cores.azulPrimario,
    fontWeight: '700',
  },
  aviso: {
    textAlign: 'center',
    fontSize: 13,
    color: cores.cinzaSuave,
    marginTop: 16,
    marginBottom: 16,
  },
  btnEntrar: {
    backgroundColor: cores.azulPrimario,
    borderRadius: bordas.md,
    padding: 14,
    alignItems: 'center',
    marginBottom: 16,
  },
  btnEntrarTexto: {
    color: cores.branco,
    fontSize: 15,
    fontWeight: '700',
  },
  btnSair: {
    borderWidth: 1.5,
    borderColor: cores.vermelhoReserv,
    borderRadius: bordas.md,
    padding: 14,
    alignItems: 'center',
  },
  btnSairTexto: {
    color: cores.vermelhoReserv,
    fontSize: 15,
    fontWeight: '700',
  },
});
