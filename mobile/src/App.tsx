import { NavigationContainer, ThemeProvider } from '@react-navigation/native'
import { ReactElement } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

export default function App(): ReactElement {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <NavigationContainer>
          <ThemeProvider theme={}></ThemeProvider>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}
