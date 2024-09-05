import { Stack } from "expo-router";
import { SafeAreaView, StatusBar } from "react-native";
import { Provider } from "react-redux";
import { store } from "./store";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="todoItems" options={{ headerShown: false }} />
      </Stack>
    </Provider>
  );
}
