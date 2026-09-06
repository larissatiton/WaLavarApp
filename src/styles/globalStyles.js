import { StyleSheet } from 'react-native';
import { cores, espacos } from '../constants/theme';

const globalStyles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: cores.branco,
  },
  conteudo: {
    flexGrow: 1,
    padding: espacos.md,
  },
});

export default globalStyles;
