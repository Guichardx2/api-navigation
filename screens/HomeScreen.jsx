import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, Text } from "react-native";
import { Button } from 'react-native-paper';

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao "WeatherISH"</Text>
      <Text style={styles.subtitle}>Veja como está o clima na sua cidade</Text>
      <View>
        <Button icon="weather-cloudy" mode="elevated"  style={{borderRadius: 8}} onPress={() => navigation.navigate("Weather")}>Ver clima</Button>
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
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
});
