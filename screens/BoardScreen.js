import React, { useState, useRef, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
  ShadowDecorator,
  OpacityDecorator,
  useOnCellActiveAnimation,
} from 'react-native-draggable-flatlist';
import Animated from 'react-native-reanimated';
import Background from '../components/Background';

const NUM_ITEMS = 10;

const getColor =(i) => {
  const multiplier = 255 / (NUM_ITEMS - 1);
  const colorVal = i * multiplier;
  return `rgb(${colorVal}, ${Math.abs(128 - colorVal)}, ${255 - colorVal})`;
}

// type Item = {
//   key: string;
//   label: string;
//   height: number;
//   width: number;
//   backgroundColor: string;
// };

const getData = (numItems) => {
  return [...Array(numItems)].map((d, index) => {
    const backgroundColor = getColor(index);
    return {
      key: `item-${index}`,
      label: `${index}`,
      height: 100,
      width: 60 + Math.random() * 40,
      backgroundColor,
    };
  });
}
const BoardScreen = (props) => {
  const [data, setData] = useState(getData(NUM_ITEMS));
  const [placeholderIndex, setPlaceholderIndex] = useState(-1);
  const ref = useRef(null);

  const renderItem = ({ item, drag }) => {
    const { isActive } = useOnCellActiveAnimation();

    return (
      <ScaleDecorator>
        <OpacityDecorator activeOpacity={0.5}>
          <ShadowDecorator>
            <TouchableOpacity
              activeOpacity={1}
              style={[
                styles.rowItem,
                {
                  backgroundColor: isActive ? 'red' : item.backgroundColor,
                  height: item.height,
                  elevation: isActive ? 30 : 0,
                },
              ]}
              onLongPress={drag}>
              <Animated.View style={{}}>
                <Text style={styles.text}>{item.label}</Text>
              </Animated.View>
            </TouchableOpacity>
          </ShadowDecorator>
        </OpacityDecorator>
      </ScaleDecorator>
    );
  };

  return (
    <View style={{height: 640}}>
      <DraggableFlatList
        ref={ref}
        data={data}
        onDragEnd={({ data }) => setData(data)}
        keyExtractor={(item) => item.key}
        renderItem={renderItem}
        onPlaceholderIndexChange={setPlaceholderIndex}
        renderPlaceholder={({ item, index }) => (
          <View style={{ flex: 1, backgroundColor: 'tomato' }}>
            <Text
              style={[
                styles.rowItem,
                styles.text,
              ]}>{`placeholder: index: ${placeholderIndex}`}</Text>
          </View>
        )}
      />
    </View>
    
  );
}

export default BoardScreen;
const styles = StyleSheet.create({
  rowItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
