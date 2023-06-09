import { StyleSheet } from 'react-native';
import COLORS from '../../constants/colors';

export const styles = StyleSheet.create({
  selectorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  preview: {
    width: 110,
    height: 110,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 15,
    overflow: 'hidden',
  },
  previewTextContainer: {
    borderWidth: 2,
    borderColor: COLORS.tertiary,
    borderStyle: 'dashed',
    padding: 5,
    width: '90%',
    height: '90%',
    borderRadius: 15,
  },
  previewText: {
    color: COLORS.tertiary,
    textAlign: 'center'
  },
  image: {
    width: '100%',
    height: '100%',
  }
});
