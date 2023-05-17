import { StyleSheet, Text, View, Image, Button, TextInput, FlatList } from 'react-native';

import Header from '../../components/Header/Header';
import MedsList from '../../components/MedsList/MedsList';

export default ScheduledScreen = ({ route, navigation }) => {
	/* Get the params */
	// const { itemId, otherParam } = route.params;

  return (
    <View style={styles.container}>
      <Header title={'Maria Alarcon'} buttonLeft={<Button title={'Perfil'} />} buttonRight={<Button title={'Buscar'} />} />
      <View style={styles.internalContainer}>
        <Text>Today</Text>
        <MedsList meds={[]} />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  internalContainer: {
    backgroundColor: "white", 
    padding: 20,
    width: '100%'
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  input: {
    flex: 1,
    borderBottomColor:"gray", 
    borderBottomWidth: 2, 
    padding: 10,
    margin: 10
  },
  image: {
    width: 50,
    height: 50
  }
});