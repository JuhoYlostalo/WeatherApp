import { StyleSheet, Text, View, Platform, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import Constants from 'expo-constants'

type Props = {
    defaultValue?: string
    onSearch: (term: string) => void
}

const SearchBar = ({defaultValue="", onSearch}: Props) => {
    const [value, setValue] = useState<string>(defaultValue)

    useEffect(() => {
        onSearch(value)
    },[value,onSearch])

  return (
    <View style={styles.container}>
      <TextInput
        placeholder='Search'
        value={value}
        onChangeText={setValue}
        style={styles.input}
        returnKeyType='search'>   
        </TextInput>
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 8,
        paddingTop: Platform.OS === 'android' ? Constants.statusBarHeight : 8,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 6,
        paddingHorizontal: 8,
        marginRight: 8,
        height: 40,
    },
}); 