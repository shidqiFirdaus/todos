import {
  Link,
  router,
  useLocalSearchParams,
  useNavigation,
  useRouter,
} from "expo-router";
import {
  FlatList,
  Pressable,
  ProgressBarAndroidBase,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ViewBase,
  ViewComponent,
} from "react-native";
import { Todo, TodoList } from ".";
import { useAppSelector } from "./hooks";
import Checkbox from "expo-checkbox";
import { useState } from "react";
import { useStore } from "react-redux";
import { addTodo, markDone } from "./todoSlice";

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignContent: "center",
    marginTop: StatusBar.currentHeight,
    backgroundColor: "#1f2335",
  },
});
export default function TodoItems() {
  const [check, setCheck] = useState(false);
  const param = useLocalSearchParams();
  const todoList = useAppSelector((state) =>
    state.todos.todolists.at(+param.index),
  );
  const store = useStore();

  return (
    <SafeAreaView style={styles.background}>
      <View style={{ flexDirection: "row" }}>
        <Link href={"/"} style={{ flex: 1, margin: 12 }}>
          <Text style={{ fontSize: 16, color: "white" }}>back</Text>
        </Link>
        <Pressable
          style={{ flex: 1, margin: 12 }}
          onPress={() => {
            store.dispatch(addTodo({ index: +param.index, task: "new task" }));
          }}
        >
          <Text style={{ fontSize: 16, color: "white" }}>new</Text>
        </Pressable>
      </View>
      <FlatList
        data={todoList?.todos}
        style={{ flex: 1 }}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                margin: 12,
                padding: 12,
                backgroundColor: "red",
                justifyContent: "center",
              }}
            >
              <Checkbox
                value={item.done}
                // onValueChange={setCheck}
                style={{ marginRight: 12 }}
              />
              <Pressable
                style={{ flex: 1 }}
                onPress={() => {
                  store.dispatch(
                    markDone({
                      todoIndex: +param.index,
                      taskIndex: index,
                      todo: item,
                    }),
                  );
                }}
              >
                <Text style={{ color: "white", flex: 1 }}>{item.task}</Text>
              </Pressable>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}
