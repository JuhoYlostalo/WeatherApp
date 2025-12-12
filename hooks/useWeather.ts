import { useCallback, useEffect, useRef, useState } from "react"
import { WEATHER_API_URL, GEOLOCATION_API_URL, API_KEY } from "@env";
import { Location } from "../types/locationType";
import { Weather } from "../types/weatherType";

export function useWeather(initialQuery = 'Oulu') {
    const [location, setLocation] = useState<Location | null>(null)
    const [weather, setWeather] = useState<Weather | null>(null)
    const [query, setQuery] = useState<string>(initialQuery)
    const [loading, setLoading] = useState<boolean>(false)
    const controllerRef = useRef<AbortController | null>(null)

    const fetchWeatherFromCoordinates = useCallback(async (term: string) => {
        controllerRef.current?.abort()
        const controller = new AbortController()
        controllerRef.current = controller

        try {
            setLoading(true)

            const locUrl = `${GEOLOCATION_API_URL}q=${encodeURIComponent(term)}&limit=1&appid=${API_KEY}`
            const locRes = await fetch(locUrl, { signal: controller.signal })
            if (!locRes.ok) throw new Error("Location fetch failed")
            const locData: Location[] = await locRes.json()
            if (!locData) throw new Error("No location found")
            setLocation(locData[0])
            console.log(location?.name)

            const weatherUrl = `${WEATHER_API_URL}lat=${locData[0].lat}&lon=${locData[0].lon}&units=metric&appid=${API_KEY}`
            const weatherRes = await fetch(weatherUrl, { signal: controller.signal })
            if (!weatherRes.ok) throw new Error("Weather fetch failed")
            const weatherData = await weatherRes.json()
            console.log(weatherData)
            setWeather(weatherData)
        } catch (err: any) {
            if (err.name !== "AbortError") return
        } finally {
            setLoading(false)
        }
    },
        [])


    useEffect(() => {
        fetchWeatherFromCoordinates(query)
    }, [fetchWeatherFromCoordinates, query])

    useEffect(() => {
        return () => {
            controllerRef.current?.abort()
        }
    }, [])

    return { location, weather, query, loading, setQuery } as const
}
