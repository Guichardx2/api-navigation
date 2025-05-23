import { View, StyleSheet } from "react-native";
import { TextInput, ActivityIndicator, Text, Icon, Searchbar } from "react-native-paper";
import { useFetch } from "../hooks/useFetch";
import WeatherCard from "../components/WeatherCard";
import { useEffect, useState } from "react";

const url = "https://api.open-meteo.com/v1/forecast";
const latLngUrl = "https://api.opencagedata.com/geocode/v1/json";
const WeatherScreen = () => {
  const [latitude, setLatidude] = useState();
  const [longitude, setLongitude] = useState();
  const [searchText, setSearchText] = useState("");
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

  const latLngParams = {
    q: searchText,
    key: process.env.EXPO_PUBLIC_API_KEY,
  }

  const { data: latLngData } = useFetch(latLngUrl, latLngParams);
  const { data: weatherData } = useFetch(url, params);

  const handleChangeText = (text) => {
    setInputText(text);
  };

  const handleSearch = () => {
    if (!inputText.trim()) return;
    setSearchText(inputText.replace(/ /g, "+"));
      
  };

  useEffect(() => {
  if (latLngData && latLngData.results && latLngData.results.length > 0) {
    const { lat, lng } = latLngData.results[0].geometry;
    if (!isNaN(lat) && !isNaN(lng)) {
      setIsLoading(true);
      setLatidude(Number(lat));
      setLongitude(Number(lng));
      setTimeout(() => setIsLoading(false), 2000);
    }
  }
}, [latLngData]);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Searchbar 
          mode="outlined"
          placeholder="Digite o nome da cidade"
          value={inputText}
          onChangeText={handleChangeText}
          onIconPress={handleSearch}
          style={{ borderRadius: 8, backgroundColor: "#fff" }}
        />
      </View>

      {latitude && longitude ? (
        weatherData ? (
          <WeatherCard weather={weatherData} latLng={latLngData} />
        ) : (
          <View style={{ marginTop: 20 }}>
            <ActivityIndicator animating={true} size="large" color="#87cefa"/>
            <Text style={{ marginTop: 10 }}>Carregando...</Text>
          </View>
        )
      ) : (
        <View style={styles.loadingContainer}>
          <Icon source="weather-cloudy-clock" size={70} color="#87cefa" />
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
