import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useWeather } from './hooks/useWeather';
import SearchBar from './components/SearchBar'
import WeatherCard from './components/WeatherCard';

export default function App() {
  const { weather, query, loading, location, setQuery } = useWeather()
  return (
    <View style={styles.container}>
      <SearchBar defaultValue={query} onSearch={(t) => setQuery(t)}></SearchBar>
      <WeatherCard weather={weather} location={location} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
