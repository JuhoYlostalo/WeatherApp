import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Weather } from '../types/weatherType'
import { Location } from '../types/locationType'

type Props = {
    weather: Weather | null
    location: Location | null
}

const WeatherCard = ({weather, location}: Props) => {

    return (
        <View style={styles.container}>

            {weather && location ? (
                <View style={styles.card}>
                    <Text style={styles.title}>Weather in {location?.name} ({location?.country})</Text>
                    <View>
                        <Text style={styles.item}>Weather: [{weather?.weather[0].main}]</Text>
                        <Text style={styles.item}>Temp: actual  [{weather?.main.temp}°C] feels like [{weather?.main.feels_like}°C]</Text>
                        <Text style={styles.item}>Wind: speed  [{weather?.wind.speed}m/s²] deg  [{weather?.wind.deg}°]</Text>
                        <Image source={{
                            uri: `https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`
                        }}
                            style={{ width: 100, height: 100 }}
                        />
                    </View>
                </View>
            ) : null}

        </View>
    );
}

export default WeatherCard

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffffff',
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    card: {
        width: '90%',
        padding: 20,
        borderRadius: 8,
        backgroundColor: '#65b8f0ff',
        alignItems: 'center'
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 12
    },
    item: {
        fontSize: 14,
        marginTop: 6
    },
})