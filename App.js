import './src/fixtimerbug'; // <<<<<<<<<<<<<<<<<<
import React from 'react';
import { StyleSheet,Image,StatusBar,ScrollView } from 'react-native';
import {
  BottomNavigation,
  BottomNavigationTab,
  Text,
  ApplicationProvider,
} from 'react-native-ui-kitten';
import {
  light as theme,
} from '@eva-design/eva';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { View, Dimensions  } from 'react-native';
import {  createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import TrangChu from "./src/screens/TrangChu";
import CaNhan from "./src/screens/CaNhan";
import DanhMuc from "./src/screens/DanhMuc";
import ChiTiet from "./src/screens/ChiTiet";
import TestScr from "./src/screens/TestScr";
import LinearGradient from 'react-native-linear-gradient';
// import AppNav from './src/components/navigation/AppNav';


// const App: () => React$Node = () => {
//   return (
//     <>
//       <StatusBar barStyle="dark-content" backgroundColor="#fff" />
//       <ApplicationProvider mapping={mapping} theme={lightTheme}>
//       <AppNav />
//      </ApplicationProvider>
//     </>
//   );
// };
// export default App;

const FirstRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#ff4081' }]} />
);
 
const SecondRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
);

const TrangChuStack = createStackNavigator(
  {
    TrangChuScr: TrangChu,
    ChiTietScr: ChiTiet
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  }
);
const Trchu = createAppContainer(TrangChuStack);

export default class main extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'mot', title: 'CHUẨN ĐOÁN' },
      { key: 'hai', title: 'BỆNH LÝ' },
      { key: 'ba', title: 'GIẢI PHẪU' },
      { key: 'bon', title: 'THÔNG TIN' },
    ],
  };
 
  render() {
    return (
      <>
      <LinearGradient colors={['#5c6bc0', '#5c6bc0']} style={{flex:1}}>
      <StatusBar barStyle="light-content" backgroundColor='#26418f'/>
      <ApplicationProvider mapping={mapping} theme={lightTheme}>
      
      <Text style={{ textAlign:'left',fontSize:25,letterSpacing:2,padding:20,paddingTop:30,paddingBottom:10,paddingLeft:20, color:"#fff"}}>GLXS Ophthalmic</Text>
      <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          mot: TestScr,
          hai: DanhMuc,
          ba : Trchu,
          bon:  CaNhan,
        })}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: Dimensions.get('window').width}}
        tabStyle={{ }}
        renderTabBar={props =>
          <>
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: 'rgba(256, 256, 256, 0.6)',height:5 }}
            style={{ backgroundColor: 'transparent',height:37 }}
            renderLabel={({ route, focused, color }) => (
              <Text style={{ color: '#fff', marginBottom: 20, fontSize:12, fontWeight:"bold" }}>
                {route.title}
              </Text>
            )}
          />
          </>
        }
      />
      </ApplicationProvider>
      </LinearGradient>
      </>
    );
  }
}
console.ignoredYellowBox = [
  'Setting a timer'
  ];
const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  scrollView: {
    // backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    // backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    // color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    // color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    // color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

