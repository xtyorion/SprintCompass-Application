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
  const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

  useEffect(() => {
    console.log(props.Project.reports)
    props.dispatch(getReports(props.Project.currentProject.id))
  }, [props.Project.currentProject.id]);
  useEffect(() => {
    console.log(props.Project.reports)
    props.dispatch(getReports(props.Project.currentProject.id))
  }, [props.Task.items]);
  useEffect(() => {
    if (props.Project.reports.logSet){
      setLabels(Object.keys(props.Project.reports.logSet).sort((a, b) => a.localeCompare(b)))
    }

    console.log("reports", props.Project.reports.logSet)
  }, [props.Project.reports]);
  useEffect(() => {
    if (labels.length > 0){
      setVelocityData(formatVelocityData());
    }

    console.log("reports", props.Project.reports.logSet)
  }, [labels]);

  var data = [{
    "name": "John",
    "city": "Seattle"
  },
  {
    "name": "Mike",
    "city": "Los Angeles"
  },
  {
    "name": "Zach",
    "city": "New York"
  }
];

const excel = async () => {
  var ws = XLSX.utils.json_to_sheet(data);
  var wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Cities");
  const wbout = XLSX.write(wb, {
    type: 'base64',
    bookType: "xlsx"
  });
  const uri = FileSystem.cacheDirectory + 'cities.xlsx';
  console.log(`Writing to ${JSON.stringify(uri)} with text: ${wbout}`);
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
  console.log(formattedData)
  return formattedData;
}


  return (
    <SafeAreaView >
      <ScrollView style={{marginBottom: 75}}>
        <Background>
          <Headline style={{alignSelf:"center"}}>Percentage Completion</Headline>
          <ProgressChart
            data={[1, 0.6, 0]}
            width={Dimensions.get('window').width - 16}
            height={220}
            chartConfig={{
              backgroundColor: 'transparent',
              backgroundGradientFrom: '#eff3ff',
              backgroundGradientTo: '#efefef',
              decimalPlaces: 2,
              color: (opacity = 10) => `rgba(130, 108, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
              marginBottom: -10
            }}
          />
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
            <View style={{flexDirection: "row"}}>
              <Card style={{width:170, margin:5}}>
                  <Card.Title title="Projected" subtitle="Cost" left={LeftContent} />
                </Card>
                <Card style={{width:170, margin:5}}>
                  <Card.Title title="Delivery" subtitle="Date" left={LeftContent} />
              </Card>
            </View>
          </View>
        
          <View style={{flexDirection: "column", marginTop: 20}}>
            <Headline style={{alignSelf:"center"}}>Generate Reports</Headline>
            <Card.Content>
              <View style={{flexDirection: "row"}}>
                <Card style={{width:170, marginRight:10, paddingHorizontal: 10}}>
                  <Subheading style={{alignSelf:"center"}}>Sprint</Subheading>
                  <Button style={{marginBottom: 10}} mode="outlined" onPress={excel}>Product Backlog</Button>
                  <Button style={{marginBottom: 10}} mode="outlined" >Sprint 1</Button>
                  <Button style={{marginBottom: 10}} mode="outlined" >Sprint 2</Button>
                  <Button style={{marginBottom: 10}} mode="outlined" >Sprint 3</Button>
                </Card>
                <Card style={{width:170, paddingHorizontal: 10}}>
                  <Subheading style={{alignSelf:"center"}}>Team Member</Subheading>
                  <Button style={{marginBottom: 10}} mode="outlined" >Vincent M.</Button>
                  <Button style={{marginBottom: 10}} mode="outlined" >Victoria K</Button>
                  <Button style={{marginBottom: 10}} mode="outlined" >Carlos P</Button>
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
