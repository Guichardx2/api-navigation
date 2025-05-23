import { StyleSheet} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { PaperProvider } from 'react-native-paper';
import { LogBox } from 'react-native';

//Screens
import HomeScreen from "./screens/HomeScreen";
import WeatherScreen from "./screens/WeatherScreen";

LogBox.ignoreAllLogs();

export default function App() {
  const Stack = createStackNavigator();

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Weather" component={WeatherScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
