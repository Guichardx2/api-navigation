import { StyleSheet, View, Text } from 'react-native';
import { Card, Title, Paragraph, Icon } from 'react-native-paper';

const WeatherCard = ({ data }) => {
  const { current } = data;
  const isDay = current.is_day;
  const temperature = current.temperature_2m;
  const windSpeed = current.wind_speed_10m;
  const humidity = current.relative_humidity_2m;
  const rain = current.rain || 0;
  const apparentTemperature = current.apparent_temperature;
  const precipitation = current.precipitation || 0;
  const cloudCover = current.cloud_cover;
  const surfacePressure = current.surface_pressure;
  const windDirection = current.wind_direction_10m;
 
  const time = new Date(current.time).toLocaleString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: 'short',
  });

  const weatherData = [
    {
      icon: "thermometer",
      color: "#ff5722",
      value: `${temperature || 'N/A'} °C`,
      label: "Temperatura"
    },
    {
      icon: "thermometer-chevron-up",
      color: "#ff9800",
      value: `${apparentTemperature} °C`,
      label: "Sensação Térmica"
    },
    {
      icon: "water-percent",
      color: "#03a9f4",
      value: `${humidity}%`,
      label: "Umidade"
    },
    {
      icon: "weather-windy",
      color: "#607d8b",
      value: `${windSpeed} km/h`,
      label: "Vento"
    },
    {
      icon: "weather-rainy",
      color: "#2196f3",
      value: `${rain} mm`,
      label: "Chuva"
    },
    {
      icon: "weather-pouring",
      color: "#4caf50",
      value: `${precipitation} mm`,
      label: "Precipitação"
    },
    {
      icon: "weather-cloudy",
      color: "#9e9e9e",
      value: `${cloudCover}%`,
      label: "Nuvens"
    },
    {
      icon: "gauge",
      color: "#795548",
      value: `${surfacePressure} hPa`,
      label: "Pressão"
    },
    {
      icon: "compass-outline",
      color: "#3f51b5",
      value: `${windDirection}°`,
      label: "Direção do Vento"
    },
    {
      icon: isDay ? "weather-sunny" : "weather-night",
      color: "#ffc107",
      value: isDay ? "Dia" : "Noite",
      label: "Período"
    },

  ];

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

  return (
    <Card style={styles.card}>
      <Card.Cover
        source={{ uri: 'https://images.unsplash.com/photo-1509803874385-db7c23652552?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
        style={styles.image}
      />
      <Card.Content style={styles.content}>
        <View style={styles.header}>
          <Title style={styles.title}>Clima Atual</Title>
          <Paragraph style={styles.subtitle}>{time}</Paragraph>
        </View>
       
        <View style={styles.dataGrid}>
          {weatherData.map((item, index) => renderWeatherItem(item, index))}
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
    width: '90%',
    backgroundColor: '#ffffff',
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
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  subtitle: {
    color: '#666',
    fontSize: 14,
  },
  dataGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  weatherItem: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    elevation: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    elevation: 2,
  },
  dataContainer: {
    flex: 1,
  },
  valueText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  labelText: {
    fontSize: 11,
    color: '#666',
    textAlign: 'left',
  },
});

export default WeatherCard;