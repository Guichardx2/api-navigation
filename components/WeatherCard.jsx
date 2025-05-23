import { StyleSheet, View, Text } from "react-native";
import { Card, Title, Paragraph, Icon } from "react-native-paper";

const WeatherCard = ({ weather, latLng }) => {
  const { current } = weather;
  const { results } = latLng;

  const weatherData = {
    isDay: current.is_day,
    temperature: current.temperature_2m,
    windSpeed: current.wind_speed_10m,
    humidity: current.relative_humidity_2m,
    rain: current.rain || 0,
    apparentTemperature: current.apparent_temperature,
    precipitation: current.precipitation || 0,
    cloudCover: current.cloud_cover,
    surfacePressure: current.surface_pressure,
    windDirection: current.wind_direction_10m,
  };

  const latLngData = {
    city: results[0].components.municipality || results[0].components._normalized_city || results[1].components.town || results[1].components._normalized_city || "N/A",
    stateCode: results[0].components.state_code || results[1].components.state_code || "N/A",
    country: results[0].components.country || "N/A",
    countryCode: results[0].components.country_code || "N/A",
  }

  const time = new Date(current.time).toLocaleString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "short",
  });

  const weatherInfo = [
    {
      icon: "thermometer",
      color: "#ff5722",
      value: `${weatherData.temperature || "N/A"} °C`,
      label: "Temperatura",
    },
    {
      icon: "thermometer-chevron-up",
      color: "#ff9800",
      value: `${weatherData.apparentTemperature} °C`,
      label: "Sensação Térmica",
    },
    {
      icon: "water-percent",
      color: "#03a9f4",
      value: `${weatherData.humidity}%`,
      label: "Umidade",
    },
    {
      icon: "weather-windy",
      color: "#607d8b",
      value: `${weatherData.windSpeed} km/h`,
      label: "Vento",
    },
    {
      icon: "weather-rainy",
      color: "#2196f3",
      value: `${weatherData.rain} mm`,
      label: "Chuva",
    },
    {
      icon: "weather-pouring",
      color: "#4caf50",
      value: `${weatherData.precipitation} mm`,
      label: "Precipitação",
    },
    {
      icon: "weather-cloudy",
      color: "#9e9e9e",
      value: `${weatherData.cloudCover}%`,
      label: "Nuvens",
    },
    {
      icon: "gauge",
      color: "#795548",
      value: `${weatherData.surfacePressure} hPa`,
      label: "Pressão",
    },
    {
      icon: "compass-outline",
      color: "#3f51b5",
      value: `${weatherData.windDirection}°`,
      label: "Direção do Vento",
    },
    {
      icon: weatherData.isDay ? "weather-sunny" : "weather-night",
      color: "#ffc107",
      value: weatherData.isDay ? "Dia" : "Noite",
      label: "Período",
    },
  ];

  const weatherImages = {
    isDay:
      "https://images.unsplash.com/photo-1509803874385-db7c23652552?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isNight:
      "https://images.unsplash.com/photo-1744581047819-5e9ffb731b4c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isRaining:
      "https://images.unsplash.com/photo-1594760467013-64ac2b80b7d3?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  };

  const renderWeatherItem = (item, index) => (
    <View key={index} style={styles.weatherItem}>
      <View style={styles.iconContainer}>
        <Icon source={item.icon} size={24} color={item.color} />
      </View>
      <View style={styles.dataContainer}>
        <Text style={styles.valueText}>{item.value}</Text>
        <Text style={styles.labelText}>{item.label}</Text>
      </View>
    </View>
  );

  const maxCityLength = 10;
  const cityName =
    latLngData?.city?.length > maxCityLength
      ? latLngData.city.slice(0, maxCityLength) + "..."
      : latLngData.city

  return (
    <Card style={styles.card}>
      <Card.Cover
        source={{
          uri:
            weatherData.precipitation > 0
              ? weatherImages.isRaining
              : weatherData.isDay
              ? weatherImages.isDay
              : weatherImages.isNight,
        }}
        style={styles.image}
      />
      <Card.Content style={styles.content}>
        <View style={styles.header}>
          <Title style={styles.title}>Clima atual em {`${cityName || latLngData.country} ${latLngData.stateCode || latLngData.countryCode}`}</Title>
          <Paragraph style={styles.subtitle}>{time}</Paragraph>
        </View>

        <View style={styles.dataGrid}>
          {weatherInfo.map((item, index) => renderWeatherItem(item, index))}
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 16,
    borderRadius: 16,
    elevation: 4,
    width: "90%",
    backgroundColor: "#ffffff",
  },
  image: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    height: 120,
  },
  content: {
    paddingTop: 16,
    paddingBottom: 20,
  },
  header: {
    marginBottom: 16,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#333",
    textAlign: "center",
  },
  subtitle: {
    color: "#666",
    fontSize: 14,
  },
  dataGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  weatherItem: {
    width: "48%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    elevation: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    elevation: 2,
  },
  dataContainer: {
    flex: 1,
  },
  valueText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 2,
  },
  labelText: {
    fontSize: 11,
    color: "#666",
    textAlign: "left",
  },
});

export default WeatherCard;
