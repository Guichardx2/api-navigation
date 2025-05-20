import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, Text } from "react-native";
import { Button } from 'react-native-paper';

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Bible</Text>
      <Text style={styles.subtitle}>Get random verse and chapter</Text>
      <View style={styles.buttonsContainer}>
        <Button icon="book" mode="contained"  onPress={() => navigation.navigate("Verse")}>Random Verses</Button>
        <Button icon="book-open-variant" mode="contained"  onPress={() => navigation.navigate("Chapter")}>Random Chapters</Button>
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
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  }
});
