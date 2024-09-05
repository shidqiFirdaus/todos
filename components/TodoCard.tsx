import { Link } from "expo-router";
import { View, Text, StyleSheet, Button } from "react-native";

export type Props = {
  title: string;
  onPress: () => void;
  params?: any;
};

const styles = StyleSheet.create({
  box: {
    margin: 10,
    height: 50,
    flex: 1,
    borderRadius: 10,
    padding: 10,
    justifyContent: "center",
    backgroundColor: "#3b4261",
    elevation: 100,
  },
  text: {
    color: "white",
    fontSize: 14,
  },
});
export function TodoCard(data: Props) {
  return (
    <View style={styles.box}>
      <View style={{ flexDirection: "row", borderRadius: 10 }}>
        <Link
          style={[styles.text, { flex: 3 }]}
          href={{ pathname: "/todoItems", params: data.params }}
        >
          {data.title}
        </Link>
        <Button title="delete" onPress={data.onPress} color="#3d59a1" />
      </View>
    </View>
  );
}
