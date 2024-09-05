import ParallaxScrollView from "@/components/ParallaxScrollView";
import { TodoCard } from "@/components/TodoCard";
import { DarkTheme } from "@react-navigation/native";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from "react-native";

type TodoItem = {
  todo: string;
  done: false;
};

type Todo = {
  todoTitle: string;
  todos: TodoItem[];
};

let data: Todo[] = [
  { todoTitle: "my todo", todos: [] },
  { todoTitle: "my todo 2", todos: [] },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          data.push({ todoTitle: "def", todos: [] });
        }}
        style={{
          height: 100,
          justifyContent: "center",
          backgroundColor: "blue",
        }}
      >
        <Text style={{ color: "white" }}>create</Text>
      </TouchableOpacity>
      <FlatList
        style={{ flex: 1 }}
        data={data}
        renderItem={({ item, index }) => <TodoCard title={item.todoTitle} />}
      />
      <Text style={{ color: "white" }}>asd</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  titleContainer: {
    flexDirection: "row",
    // alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "red",
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
