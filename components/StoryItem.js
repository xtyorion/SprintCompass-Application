import React, { useState, useRef, useCallback } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  LayoutAnimation,
  TouchableOpacity,
  Platform,
  UIManager,
} from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import SwipeableItem, {
  useSwipeableItemParams,
} from "react-native-swipeable-item";
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from "react-native-draggable-flatlist";
const { multiply, sub } = Animated;

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}
const OVERSWIPE_DIST = 20;


const StoryItem = ({ item, itemRefs, drag }) => {
  return (
    <ScaleDecorator>
      <SwipeableItem
        key={item.key}
        item={item}
        ref={(ref) => {
          if (ref && !itemRefs.current.get(item.key)) {
            itemRefs.current.set(item.key, ref);
          }
        }}
        onChange={({ open }) => {
          if (open) {
            // Close all other open items
            [...itemRefs.current.entries()].forEach(([key, ref]) => {
              if (key !== item.key && ref) ref.close();
            });
          }
        }}
        overSwipe={OVERSWIPE_DIST}
        renderUnderlayLeft={() => <UnderlayLeft drag={drag} />}
        renderUnderlayRight={() => <UnderlayRight />}
        snapPointsLeft={[50, 150, 175]}
        snapPointsRight={[175]}
      >
        <View
          style={[
            styles.row,
          ]}
        >
          <TouchableOpacity style={{width:'90%', borderRadius: 5,paddingHorizontal: 10,elevation: 2, paddingVertical:10, backgroundColor: "white"}} onPressIn={drag} onPress={()=>{console.log("pressed: todo modal")}}>
            <Text>[Team Member]</Text>
            <Text style={styles.text}>{item.text}</Text>
            <Text>Description ...</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={{width: '50%', textAlign: 'left' }}>Assign: Vincent Image</Text>
              <Text style={{width: '50%', textAlign: 'right' }}>Number of Subtasks: 4</Text>
            </View>
          </TouchableOpacity>
        </View>
      </SwipeableItem>
    </ScaleDecorator>
  );
}

const UnderlayLeft = ({ drag }) => {
  const { item, percentOpen } = useSwipeableItemParams();
  const animStyle = useAnimatedStyle(
    () => ({
      opacity: percentOpen.value,
    }),
    [percentOpen]
  );

  return (
    <Animated.View
      style={[styles.row, styles.underlayLeft, animStyle]} // Fade in on open
    >
      <TouchableOpacity onPressIn={drag}>
        <Text style={styles.text}>{`[drag]`}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

function UnderlayRight() {
  const { close } = useSwipeableItemParams();
  return (
    <Animated.View style={[styles.row, styles.underlayRight]}>
      <TouchableOpacity onPressOut={close}>
        <Text style={styles.text}>Change Status</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

export default StoryItem

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  text: {
    fontWeight: "bold",
    color: "#282a36",
    fontSize: 32,
  },
  underlayRight: {
    flex: 1,
    backgroundColor: "teal",
    justifyContent: "flex-start",
  },
  underlayLeft: {
    flex: 1,
    backgroundColor: "tomato",
    justifyContent: "flex-end",
  },
});