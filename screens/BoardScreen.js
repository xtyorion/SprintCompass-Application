import React, { useState, useRef, useCallback } from "react";
import {
  View,
  Platform,
  UIManager,
} from "react-native";
import Animated from "react-native-reanimated";
import DraggableFlatList from "react-native-draggable-flatlist";
import StoryItem from "../components/StoryItem";
const { multiply, sub } = Animated;

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}
const NUM_ITEMS = 20;

function getColor(i) {
  const multiplier = 255 / (NUM_ITEMS - 1);
  const colorVal = i * multiplier;
  return `rgb(${colorVal}, ${Math.abs(128 - colorVal)}, ${255 - colorVal})`;
}

const initialData = [...Array(NUM_ITEMS)].fill(0).map((d, index) => {
  const backgroundColor = getColor(index);
  return {
    text: `row ${index}d`,
    key: `key-${backgroundColor}`,
    backgroundColor,
    height: 100,
  };
});

const BoardSwipeableScreen = () => {
  const [data, setData] = useState(initialData);
  const itemRefs = useRef(new Map());

  const renderItem = useCallback((params) => {
    return <StoryItem {...params} itemRefs={itemRefs} />;
  }, []);

  return (
    <View style={{height: 620}}>
      <DraggableFlatList
        keyExtractor={(item) => item.key}
        data={data}
        renderItem={renderItem}
        onDragEnd={({ data }) => setData(data)}
        activationDistance={20}
      />
    </View>
  );
}

export default BoardSwipeableScreen;
