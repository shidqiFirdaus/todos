import { TodoCard } from "@/components/TodoCard";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Button,
  FlatList,
  Modal,
  Pressable,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewComponent,
} from "react-native";
import Animated from "react-native-reanimated";
import { useAppDispatch, useAppSelector } from "./hooks";
import { useStore } from "react-redux";
import todoSlice, { deleteList, newList } from "./todoSlice";
export type Todo = { name: string; done: boolean };
export type TodoList = { todoTitle: string; todos: Todo[] };
export default function Index() {
  const [data, setData] = useState<TodoList[]>([
    { todoTitle: "my todo", todos: [{ name: "finish this", done: false }] },
    { todoTitle: "my todo 2", todos: [] },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [text, setText] = useState("");
  const reduxTodo = useAppSelector((state) => state.todos.todolists);
  const store = useStore();

  const addTodo = (title: string) => {
    store.dispatch(newList(title));
  };

  const deleteTodo = (index: number) => {
    store.dispatch(deleteList(index));
  };

  const editTodo = (index: number, newTitle: string) => {
    const newData = [...data];
    const replaceTodoTitle = newData[index];
    replaceTodoTitle.todoTitle = newTitle;
    setData(newData);
  };
  useEffect(() => {
    console.log("effect");
    return () => {};
  }, []);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        marginTop: StatusBar.currentHeight,
        backgroundColor: "#1f2335",
      }}
    >
      <Modal
        visible={showModal}
        transparent={true}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <InputModal
          cancel={() => setShowModal(!showModal)}
          done={() => {
            setShowModal(!showModal);
            addTodo(text);
          }}
          textChange={{ onTextChange: setText, value: text }}
        />
      </Modal>
      <CreateButton onPress={() => setShowModal(!showModal)} />
      <FlatList
        style={{ flex: 1 }}
        data={reduxTodo}
        renderItem={({ item, index }) => {
          return (
            <>
              <TodoCard
                title={item.title}
                onPress={() => deleteTodo(index)}
                params={{ index: index }}
              />
            </>
          );
        }}
      />
    </SafeAreaView>
  );
}

function InputModal(props: {
  cancel: () => void;
  done: () => void;
  textChange: { onTextChange: any; value: string };
}) {
  function AccButton(prop: { name: string; onPress?: () => void }) {
    return (
      <Pressable
        style={{ flex: 1, alignContent: "center" }}
        onPress={prop.onPress}
      >
        <Text
          style={{
            flex: 1,
            textAlign: "center",
            backgroundColor: "#565f89",
            borderRadius: 10,
            margin: 5,
          }}
        >
          {prop.name}
        </Text>
      </Pressable>
    );
  }
  return (
    // NOTE: bikin background jadi hitam saat input
    <View
      style={{
        height: 100,
        width: 200,
        borderRadius: 10,
        margin: 10,
        backgroundColor: "#292e42",
        alignSelf: "center",
        justifyContent: "center",
      }}
    >
      <TextInput
        onChangeText={props.textChange.onTextChange}
        style={{ flex: 1, color: "white", margin: 12 }}
      />
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <AccButton name="cancel" onPress={props.cancel} />
        <AccButton name="done" onPress={props.done} />
      </View>
    </View>
  );
}

function CreateButton(props: { onPress: () => void }) {
  return (
    <Pressable
      onPress={props.onPress}
      style={{
        height: 64,
        justifyContent: "center",
        backgroundColor: "#3b4261",
        margin: 10,
      }}
    >
      <Text
        style={{
          color: "white",
          flex: 1,
          textAlign: "center",
        }}
      >
        Create
      </Text>
    </Pressable>
  );
}
