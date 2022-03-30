import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  View,
  Platform,
  UIManager,
} from "react-native";
import Animated from "react-native-reanimated";
import DraggableFlatList from "react-native-draggable-flatlist";
import TaskItem from "../components/TaskItem";
const { multiply, sub } = Animated;
import {updateTasks} from '../store/TaskReducer';
import { connect } from 'react-redux';

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}
const BoardScreen = (props) => {
  const itemRefs = useRef(new Map());

  const renderItem = useCallback((params) => {
    return <TaskItem {...params} itemRefs={itemRefs} {...props}/>;
  }, []);

  const updateTaskItemListOrder = (data) => {
    const newArray = data.map((task, index) => {
      task.priorityNumber = index+1;
      return task;
    });
    props.dispatch(updateTasks(newArray))
  }

  return (
    <View style={{height: 620}}>
      <DraggableFlatList
        keyExtractor={(item) => item.id}
        data={props.items ?? []}
        renderItem={renderItem}
        onDragEnd={({ data }) => updateTaskItemListOrder(data)}
        activationDistance={20}
      />
    </View>
  );
}
const mapStateToProps = (state) => {
  const { Task } = state
  return { Task }
};

export default connect(mapStateToProps)(BoardScreen);
