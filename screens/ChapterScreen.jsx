import { useNavigation, CommonActions } from "@react-navigation/native";
import { View, StyleSheet, Text } from "react-native";

const ChapterScreen = () => {
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
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Verse Screen</Text>
        <Button title="Go to" onPress={handleNavigate} />
      </View>
    );
}

export default ChapterScreen

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