import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet } from "react-native";
import { Button, Text } from 'react-native-paper';

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title} variant="headlineMedium">Bem-vindo ao "WeatherISH"</Text>
      <Text style={styles.subtitle}>Veja como está o clima na sua cidade</Text>
      <View>
        <Button icon="weather-cloudy" mode="elevated" textColor="black" style={styles.button} onPress={() => navigation.navigate("Weather")}>Ver clima</Button>
      </View>
    </View>
  );
};

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#87cefa',
    borderRadius: 8,
  },
});
