import React, {useState, useEffect} from 'react';
import { Button, Headline, Provider, Menu, Divider, Card, Title, Paragraph, Avatar, Subheading } from 'react-native-paper';
import { 
  View, 
  Text, 
  SafeAreaView,
  StyleSheet,
  Dimensions,
  ScrollView,} from 'react-native';
import Background from '../components/Background';
import {styles} from '../styles/styles';
import Logo from '../components/Logo';
import { connect } from 'react-redux';
import {getReports} from '../store/ProjectReducer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';

const UserHomeScreen = (props) => {
  const [labels, setLabels] = useState([]);
  const [velocityData, setVelocityData] = useState([]);
  const [project, setProject] = useState({});
  const [logSet, setLogSet] = useState({});
  const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

  useEffect(() => {
   // console.log(props.Project.reports)
    props.dispatch(getReports(props.Project.currentProject.id))
    setProject(props.Project.currentProject)
  }, [props.Project.currentProject.id]);
  useEffect(() => {
    //console.log(props.Project.reports)
    props.dispatch(getReports(props.Project.currentProject.id))
  }, [props.Task.items]);
  useEffect(() => {
    if (props.Project.reports.logSet){
      setLabels(Object.keys(props.Project.reports.logSet).sort((a, b) => a.localeCompare(b)))
      setLogSet(props.Project.reports.logSet);
    }

    //console.log("reports", props.Project.reports.logSet)
  }, [props.Project.reports]);
  useEffect(() => {
    if (labels.length > 0){
      setVelocityData(formatVelocityData());
    }

    //console.log("reports", props.Project.reports.logSet)
  }, [labels]);



const generateReport = async (sprintName) => {
  let data = [];
  let totalHours = 0;
  if(Object.keys(logSet).length !== 0){
    const orderedTask = Object.keys(logSet[sprintName]).sort().reduce(
      (obj, key) => { 
        obj[key] = logSet[sprintName][key]; 
        return obj;
      }, 
      {}
    );
    Object?.entries(orderedTask).map(([key, value])=> { // task
      data.push({
        "Priority": value["priorityNumber"],
        "User Stories": value["name"],
        "Team Member": "",
        "Actual Hours": "",
        // "Sprint": sprintName
      })
      if (value["subtask"].length > 0){
        value["subtask"].forEach((subtask) => {
          data.push({
            "Priority": "",
            "User Stories": "",
            "Team Member": props.Project.currentProject.members.find((member) => member.id === subtask.teamId).name,
            "Actual Hours": subtask.actualHours
          })
          totalHours += subtask.actualHours;
        })
      }
    })
    data.push({
      "Priority": "",
      "User Stories": "Total",
      "Team Member": "",
      "Actual Hours": totalHours
    })
  }
  var Heading = [
    ["", `Project Team Name: ${project.teamName}`],
  ];
  let ws = XLSX.utils.book_new();


  XLSX.utils.sheet_add_aoa(ws, Heading);
  XLSX.utils.sheet_add_json(ws, data, { origin: 'A2', skipHeader: false });


  var wscols = [
    {wch:6},
    {wch:100},
    {wch:20, },
    {wch:10}
  ];

  ws['!cols'] = wscols; 
  let wb = XLSX.utils.book_new();




  XLSX.utils.book_append_sheet(wb, ws, "Summary");
  const wbout = XLSX.write(wb, {
    type: 'base64',
    bookType: "xlsx"
  });
  const uri = FileSystem.cacheDirectory + 'cities.xlsx';
  //console.log(`Writing to ${JSON.stringify(uri)} with text: ${wbout}`);
  await FileSystem.writeAsStringAsync(uri, wbout, {
    encoding: FileSystem.EncodingType.Base64
  });

  await Sharing.shareAsync(uri, {
    mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    dialogTitle: 'MyWater data',
    UTI: 'com.microsoft.excel.xlsx'
  });
}

const generateConsolidatedReport = async (sprintName) => {
  let data = [];
  let totalOrginalHours = 0;
  let totalActualHours = 0;
  let totalReestimateHours = 0;
  let totalPercentage = 0;
  let taskCount = 0;
  console.log(logSet)
  if(Object.keys(logSet).length !== 0){
    const orderedTask = Object.keys(logSet[sprintName]).sort().reduce(
      (obj, key) => { 
        obj[key] = logSet[sprintName][key]; 
        return obj;
      }, 
      {}
    );
    taskCount = Object.keys(orderedTask).length;
    Object?.entries(orderedTask).map(([key, value])=> { // task
      const totalTaskPercentage = Math.round((value.actualHours /(value.actualHours + value.reestimateHours)) * 100);
      data.push({
        "User Stories/Sub tasks": value.name,
        "Team Member": "",
        "Percentage Complete":  totalTaskPercentage + "%",
        "Original Hours Est.": value.originalHours,
        "Actual Hours Worked": value.actualHours,
        "Re-Estimate to Complete": value.reestimateHours,
      })
      totalOrginalHours += value.originalHours;
      totalActualHours += value.actualHours;
      totalReestimateHours += value.reestimateHours;
      totalPercentage += totalTaskPercentage;
      

      if (value["subtask"].length > 0){
        value["subtask"].forEach((subtask) => {
          data.push({
            "User Stories/Sub tasks": "                                        " + subtask.name,
            "Team Member": props.Project.currentProject.members.find((member) => member.id === subtask.teamId).name,
            "Percentage Complete": "",
            "Original Hours Est.": subtask.originalHours,
            "Actual Hours Worked": subtask.actualHours,
            "Re-Estimate to Complete": subtask.reestimateToComplete,
          })
        })
      }
      data.push({
        "User Stories/Sub tasks": "",
        "Team Member": "",
        "Percentage Complete": "",
        "Original Hours Est.": "",
        "Actual Hours Worked": "",
        "Re-Estimate to Complete": "",
      })
    })
    data.push({
      "User Stories/Sub tasks": "Total",
      "Team Member": "",
      "Percentage Complete": ((totalPercentage / (taskCount*100)) * 100) + "%",
      "Original Hours Est.": totalOrginalHours,
      "Actual Hours Worked": totalActualHours,
      "Re-Estimate to Complete": totalReestimateHours,
    })
  }
  var Heading = [
    [`Project Team Name: ${project.teamName}`],
  ];
  let ws = XLSX.utils.book_new();


  XLSX.utils.sheet_add_aoa(ws, Heading);
  XLSX.utils.sheet_add_json(ws, data, { origin: 'A2', skipHeader: false });


  var wscols = [
    {wch:100},
    {wch:20},
    {wch:10},
    {wch:10},
    {wch:10},
    {wch:10}
  ];

  ws['!cols'] = wscols; 
  let wb = XLSX.utils.book_new();




  XLSX.utils.book_append_sheet(wb, ws, "Summary");
  const wbout = XLSX.write(wb, {
    type: 'base64',
    bookType: "xlsx"
  });
  const uri = FileSystem.cacheDirectory + 'cities.xlsx';
  //console.log(`Writing to ${JSON.stringify(uri)} with text: ${wbout}`);
  await FileSystem.writeAsStringAsync(uri, wbout, {
    encoding: FileSystem.EncodingType.Base64
  });

  await Sharing.shareAsync(uri, {
    mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    dialogTitle: 'MyWater data',
    UTI: 'com.microsoft.excel.xlsx'
  });
}

const bardata = { 
  labels: labels,
  datasets: [
      {
          data: velocityData,
          colors: [
              (opacity = 1) => `#BE95FF`,
              (opacity = 1) => `#78A9FF`,
              (opacity = 1) => `#BE95FF`,
              (opacity = 1) => `#78A9FF`,
              (opacity = 1) => `#BE95FF`,
              (opacity = 1) => `#78A9FF`,
          ]
      } 
  ]
}; 

const formatVelocityData = () => {
  const formattedData = [];
  for (const x of labels) { 
    const actualHours = 0;
    const originalHours = 0;
    for (const [key, value] of Object.entries(props.Project.reports.logSet[x])) {
      actualHours += value.actualHours;
      originalHours += value.originalHours;
    }
    formattedData.push(originalHours);
    formattedData.push(actualHours);
  } 
  return formattedData;
}


  return (
    <SafeAreaView >
      <ScrollView style={{marginBottom: 75}}>
        <Background>
          
          <Headline style={{alignSelf:"center"}}>Project Velocity: </Headline>
          <Subheading style={{alignSelf:"center"}}>   
            <MaterialCommunityIcons name="checkbox-blank-circle" color={'#BE95FF'} size={20} />
            Initial 
            <MaterialCommunityIcons name="checkbox-blank-circle" color={'#78A9FF'} size={20} />
            Actual
          </Subheading>
          <BarChart 
            
            data={bardata}
            width={Dimensions.get('window').width - 16}
            height={220}
            chartConfig={{ 
            backgroundColor: "transparent",
            backgroundGradientTo: "black",
            backgroundGradientFromOpacity: 0,
            backgroundGradientFrom: "white",
            backgroundGradientToOpacity: 0,
            color: (opacity = 1) => `green`,
            barPercentage: 0.28,
            barRadius : 5,  
          }}
          withHorizontalLabels={false}
          fromZero={true}
          withCustomBarColorFromData={true}
          flatColor={true}
          withInnerLines={false}
          showBarTops={false}
          showValuesOnTopOfBars={true}
          />
          <View style={{flexDirection: "column", }}>
            <View style={{flexDirection: "row"}}>
              <Card style={{width:170, margin:5}}>
                <Card.Title title="Total Estimated" subtitle="hours" left={()=><Avatar.Text size={45} label={props.Project.reports.TotalEstimatedHours} />} />
              </Card>
              <Card style={{width:170, margin:5}}>
                <Card.Title title="Project" subtitle="Velocity" left={()=><Avatar.Text size={45} label={props.Project.reports.ProjectVelocity} />} />
              </Card>
            </View>
          </View>
        
          <View style={{flexDirection: "column", marginTop: 20}}>
            <Headline style={{alignSelf:"center"}}>Generate Reports</Headline>
            <Card.Content>
              <View style={{flexDirection: "row"}}>
                <Card style={{width:170, marginRight:10, paddingHorizontal: 10}}>
                  <Subheading style={{alignSelf:"center"}}>Team Member  Work            Summary</Subheading>
                  <Button style={{marginBottom: 10}} mode="outlined" onPress={()=>generateReport("Sprint 1")}>Sprint 1</Button>
                  <Button style={{marginBottom: 10}} mode="outlined" onPress={()=>generateReport("Sprint 2")}>Sprint 2</Button>
                  <Button style={{marginBottom: 10}} mode="outlined" onPress={()=>generateReport("Sprint 3")}>Sprint 3</Button>
                </Card>
                <Card style={{width:170, paddingHorizontal: 10}}>
                  <Subheading style={{alignSelf:"flex-start"}}>Consolidated Project Retrospective</Subheading>
                  <Button style={{marginBottom: 10}} mode="outlined" onPress={()=>generateConsolidatedReport("Sprint 1")}>Sprint 1</Button>
                  <Button style={{marginBottom: 10}} mode="outlined" onPress={()=>genergenerateConsolidatedReportateReport("Sprint 2")}>Sprint 2</Button>
                  <Button style={{marginBottom: 10}} mode="outlined" onPress={()=>generateConsolidatedReport("Sprint 3")}>Sprint 3</Button>
                </Card>
              </View>
            </Card.Content>
           
          </View>
        </Background>
      </ScrollView>
    </SafeAreaView>
  );
}
const mapStateToProps = (state) => {
  const { Project, Task } = state
  return { Project, Task }
};

export default connect(mapStateToProps)(UserHomeScreen);
