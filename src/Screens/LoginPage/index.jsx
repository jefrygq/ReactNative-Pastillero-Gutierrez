import { View, TextInput, Text, Image, TouchableHighlight } from "react-native";
import styles from './styles';
import logo from '../../assets/mlogo.png';

const LoginPage = ({setIsUserLoggedIn}) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.logoText}>My Meds</Text>
      </View>
      <View style={styles.loginForm}>
        <TextInput style={styles.input} placeholder="Email" />
        <TextInput style={styles.input} placeholder="Password" />

        <TouchableHighlight title="Login" onPress={() => setIsUserLoggedIn(true)} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default LoginPage;