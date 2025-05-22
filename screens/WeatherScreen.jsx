import { View, StyleSheet } from "react-native";
import { TextInput, ActivityIndicator, Text, Icon } from "react-native-paper";
import { useFetch } from "../hooks/useFetch";
import WeatherCard from "../components/WeatherCard";
import { useState } from "react";

const url = "https://api.open-meteo.com/v1/forecast";
const WeatherScreen = () => {
  const [latitude, setLatidude] = useState();
  const [longitude, setLongitude] = useState();
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const params = {
    latitude: latitude,
    longitude: longitude,
    current: [
      "is_day",
      "rain",
      "cloud_cover",
      "wind_direction_10m",
      "wind_speed_10m",
      "temperature_2m",
      "relative_humidity_2m",
      "apparent_temperature",
      "precipitation",
      "surface_pressure",
    ],
    timezone: "auto",
  };

  const { data } = useFetch(url, params);

  const handleChangeText = (text) => {
    setInputText(text);
  };

  const handleSearch = () => {
    const [lat, lon] = inputText.split(",").map((item) => item.trim());
    if (!isNaN(lat) && !isNaN(lon)) {
      setIsLoading(true);
      setLatidude(Number(lat));
      setLongitude(Number(lon));

      setTimeout(() => setIsLoading(false), 2000);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          mode="outlined"
          label="Lagitude e Longitude da cidade"
          placeholder="Ex: -28.67, -49.37"
          value={inputText}
          onChangeText={handleChangeText}
          right={<TextInput.Icon icon="google-maps" onPress={handleSearch} />}
          style={{ borderRadius: 8 }}
        />
      </View>

      {latitude && longitude ? (
        data ? (
          <WeatherCard data={data} />
        ) : (
          <View style={{ marginTop: 20 }}>
            <ActivityIndicator animating={true} size="large" />
            <Text style={{ marginTop: 10 }}>Carregando...</Text>
          </View>
        )
      ) : (
        <View style={styles.loadingContainer}>
          <Icon source="weather-cloudy-clock" size={70} />
          <Text style={{ marginTop: 10 }}>Aguardando...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  inputContainer: {
    width: "80%",
    marginTop: 10,
  },
  loadingContainer: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default WeatherScreen;
