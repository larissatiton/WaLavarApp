import { StyleSheet } from 'react-native';
import { cores, bordas } from '../constants/theme';

const styles = StyleSheet.create({
  secao: {
    fontSize: 13,
    fontWeight: '700',
    color: cores.azulEscuro,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: 14,
    marginBottom: 8,
  },
  card: {
    backgroundColor: cores.branco,
    borderWidth: 1,
    borderColor: cores.azulAgua,
    borderRadius: bordas.lg,
    padding: 12,
    marginBottom: 10,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  cardNome: {
    fontWeight: '700',
    fontSize: 15,
    color: cores.cinzaTexto,
    flex: 1,
  },
  cardHorario: {
    fontSize: 13,
    color: cores.cinzaSuave,
  },
  acoes: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
  },
  badge: {
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeTexto: {
    color: cores.branco,
    fontSize: 11,
    fontWeight: '700',
  },
  btnPrimario: {
    backgroundColor: cores.azulPrimario,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  btnPrimarioTexto: {
    color: cores.branco,
    fontSize: 13,
    fontWeight: '700',
  },
  btnOutline: {
    borderWidth: 1.5,
    borderColor: cores.azulPrimario,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  btnOutlineTexto: {
    color: cores.azulPrimario,
    fontSize: 13,
    fontWeight: '700',
  },
  btnPerigo: {
    borderWidth: 1.5,
    borderColor: cores.vermelhoReserv,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  btnPerigoTexto: {
    color: cores.vermelhoReserv,
    fontSize: 13,
    fontWeight: '700',
  },
  vazio: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  vazioIcone: {
    fontSize: 48,
    marginBottom: 12,
  },
  vazioTexto: {
    color: cores.cinzaSuave,
    fontSize: 15,
    textAlign: 'center',
  },
});

export default styles;
