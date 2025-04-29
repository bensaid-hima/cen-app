import { useState } from "react"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { StatusBar } from "expo-status-bar"
import TabNavigator from "./navigation/TabNavigator"
import SignInScreen from "./screens/SignInScreen"

export default function App() {
  // State to track if user is "authenticated"
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // If not authenticated, show sign-in screen
  if (!isAuthenticated) {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SignInScreen onSignIn={() => setIsAuthenticated(true)} />
      </GestureHandlerRootView>
    )
  }

  // If authenticated, show the main app
  return (
    
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <StatusBar style="auto" />
        <TabNavigator />
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  )
}
