import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import DraggableFlatList, {
    NestableDraggableFlatList,
    NestableScrollContainer,
    RenderItemParams,
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import { Header } from "react-native/Libraries/NewAppScreen";

const NUM_ITEMS = 10;
function getColor(i: number) {
  const multiplier = 255 / (NUM_ITEMS - 1);
  const colorVal = i * multiplier;
  return `rgb(${colorVal}, ${Math.abs(128 - colorVal)}, ${255 - colorVal})`;
}

type Item = {
  key: string;
  label: string;
  height: number;
  width: number;
  backgroundColor: string;
};

const initialData: Item[] = [...Array(NUM_ITEMS)].map((d, index) => {
  const backgroundColor = getColor(index);
  return {
    key: `item-${index}`,
    label: String(index) + "",
    height: 100,
    width: 60 + Math.random() * 40,
    backgroundColor,
  };
});

export default function AboutScreen() {
  const [data1, setData1] = useState(initialData);
  const [data2, setData2] = useState(initialData);
  const [data3, setData3] = useState(initialData);

  const renderItem = ({ item, drag, isActive }: RenderItemParams<Item>) => {
    return (
      <ScaleDecorator>
        <TouchableOpacity
          onLongPress={drag}
          disabled={isActive}
          style={[
            styles.rowItem,
            { backgroundColor: isActive ? "red" : item.backgroundColor },
          ]}
        >
          <Text style={styles.text}>{item.label}</Text>
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };

  return (
    <NestableScrollContainer>
      <Text>Header 1</Text>
      <NestableDraggableFlatList
        data={data1}
        renderItem={renderItem}
        keyExtractor={s => s.key}
        onDragEnd={({ data }) => setData1(data)}
      />
      <Text>Header 1</Text>
      <NestableDraggableFlatList
        data={data2}
        renderItem={renderItem}
        keyExtractor={s => s.key}
        onDragEnd={({ data }) => setData2(data)}
      />
      <Text>Header 1</Text>
      <NestableDraggableFlatList
        data={data3}
        renderItem={renderItem}
        keyExtractor={s => s.key}
        onDragEnd={({ data }) => setData3(data)}
      />
    </NestableScrollContainer>
  )
}

const styles = StyleSheet.create({
  rowItem: {
    height: 100,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
});