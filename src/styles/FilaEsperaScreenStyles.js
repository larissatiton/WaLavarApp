import { StyleSheet } from 'react-native';
import { cores, bordas } from '../constants/theme';

const styles = StyleSheet.create({
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

export default styles;
