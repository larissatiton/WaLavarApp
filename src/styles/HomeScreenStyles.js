import { StyleSheet } from 'react-native';
import { cores } from '../constants/theme';

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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

export default styles;
