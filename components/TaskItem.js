import React, { useEffect, useRef, useCallback } from "react";
import {
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
import {setCurrentTask} from '../store/TaskReducer';
import { Modal, Portal, Text, Button, Provider, Headline } from 'react-native-paper';
import {updateTask} from '../store/TaskReducer'


const { multiply, sub } = Animated;

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}
const OVERSWIPE_DIST = 20;


const TaskItem = (props) => {
  const { item, itemRefs, drag, navigation } = props;

 

  const editTaskItem = () => {
    props.dispatch(setCurrentTask(item));
    navigation.navigate('TaskDetailScreen');
  }
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
        renderUnderlayRight={() => <UnderlayRight item={item} {...props} />}
        snapPointsLeft={[50, 150, 175]}
        snapPointsRight={[175]}
      >
        <View
          style={[
            styles.row,
          ]}
        >
          <TouchableOpacity style={{width:'90%', borderRadius: 5,paddingHorizontal: 10,elevation: 2, paddingVertical:10, backgroundColor: "white"}} 
            onPressIn={drag} onPress={editTaskItem}>
            <Text>[Priority: {item.priorityNumber} ]</Text>
            <Text style={styles.text}>{item.name}</Text>
            <Text>{item.description}</Text>
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

function UnderlayRight(props) {
  const {item} = props;
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};

  const statuses = [
    {
      label: 'Open',
      value: 1,
    },
    {
      label: 'Development',
      value: 2,
    },
    {
      label: 'Testing',
      value: 3,
    },
    {
      label: 'Closed',
      value: 4,
    },
  ]
  const updateStatus = (statusId) => {
    props.dispatch(updateTask(item.id, {statusId: statusId}))
  }

  const { close } = useSwipeableItemParams();
  return (
    <Animated.View style={[styles.row, styles.underlayRight]}>
      <TouchableOpacity onPressOut={showModal}>
        <Portal>
          <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
            <Headline>Select status change: </Headline>
            { 
            statuses.map((status) => {
              if(status.value !== item.statusId)
                return (
                  <Button mode="contained" key={status.value} onPress={() => updateStatus(status.value)} style={{margin: 5}}>{status.label}</Button>
                );
              }
            )
            }
          </Modal>
        </Portal>
        <Text style={styles.text}>Change Status</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

export default TaskItem

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
    fontSize: 15,
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