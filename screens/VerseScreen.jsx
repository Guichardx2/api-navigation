import { useNavigation, CommonActions } from "@react-navigation/native";
import { View, StyleSheet, Text } from "react-native";
import { Button } from 'react-native-paper';
import axiosService from "../services/axiosService";

const VerseScreen = () => {
  const navigation = useNavigation();

  const handleNavigate = () => {
    navigation.navigate("Home");

    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Home" }],
      })
    );
  };

  const handleGetVerseClick = async () => {
    try {
      const response = await axiosService.get("/randomverse");
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching verse:", error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verse Screen</Text>
      <Button icon="home" mode="contained" onPress={handleGetVerseClick}> Get Verse </Button>
      <Button icon="home" mode="elevated" onPress={handleNavigate}> Go to Home </Button>
    </View>
  );
};

export default VerseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
