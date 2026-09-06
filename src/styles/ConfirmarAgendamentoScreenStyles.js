import { StyleSheet } from 'react-native';
import { cores, bordas } from '../constants/theme';

const styles = StyleSheet.create({
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

export default styles;
