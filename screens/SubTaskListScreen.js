import React, {useEffect} from 'react';
import { SafeAreaView, FlatList, StyleSheet, StatusBar, View} from 'react-native';
import { Button} from 'react-native-paper';
import SubTaskItem from '../components/SubTaskItem';
import { connect } from 'react-redux';
import {getSubtasks} from '../store/SubtaskReducer';

const SubTaskListScreen = (props) => {
  useEffect(()=>{
    props.dispatch(getSubtasks(props.Task.currentTask.id))
  },[props.Task.currentTask.id]);

  
  const renderItem = ({ item }) => (
    <SubTaskItem {...item} />
  );

  return (
    <View>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={props.Subtask.items}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
      <Button mode="contained" onPress={() => console.log('Pressed')} style={{width: 382, alignSelf: 'center'}}>
        Add New Subtask
      </Button>
    </View>
    
  )
}
const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight || 0,
    height: 560,
    marginBottom: 5
  },
});
const mapStateToProps = (state) => {
  const { Task, Subtask } = state
  return { Task, Subtask }
};
export default connect(mapStateToProps)(SubTaskListScreen);