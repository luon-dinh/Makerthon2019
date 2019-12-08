import './src/fixtimerbug'; // <<<<<<<<<<<<<<<<<<
import React from 'react';
import { StyleSheet,Image,StatusBar,TouchableOpacity,AsyncStorage } from 'react-native';
import {
  BottomNavigation,
  BottomNavigationTab,
  Text,
  ApplicationProvider,
  ListItem,
} from 'react-native-ui-kitten';
import {
  light as theme,
} from '@eva-design/eva';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { View, Dimensions  } from 'react-native';
import {  createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import TrangChu from "./src/screens/TrangChu";
import CaNhan from "./src/screens/CaNhan";
import DanhMuc from "./src/screens/DanhMuc";
import ChiTietdm from "./src/screens/ChiTietdm";
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

const DanhMucStack = createStackNavigator(
  {
    TrangChuScr: DanhMuc,
    ChiTietDm: ChiTietdm
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  }
);

const Trchu = createAppContainer(TrangChuStack);

const Dmuc = createAppContainer(DanhMucStack);

var log;
class main extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'mot', title: 'CHUẨN ĐOÁN' },
      { key: 'hai', title: 'BỆNH LÝ' },
      { key: 'ba', title: 'GIẢI PHẪU' },
      { key: 'bon', title: 'THÔNG TIN' },
    ],
  };

 

  componentDidMount = async () => {
    AsyncStorage.setItem('logged', '1');
    log = await AsyncStorage.getItem('logged');
  }


  render() {
    const getTabBarIcon = (props) => {

      const { route } = props
    
      if (route.key === 'mot') {
        return <Image
          style={{ width: 28, height: 28, tintColor: "rgba(256, 256, 256, 0.6)" }}
          source={{ uri: 'https://akveo.github.io/eva-icons/outline/png/128/activity-outline.png' }}
        />
      }
    
      if (route.key === 'hai') {
        return <Image
          style={{ width: 28, height: 28, tintColor: "rgba(256, 256, 256, 0.6)" }}
          source={{ uri: 'https://akveo.github.io/eva-icons/outline/png/128/pantone-outline.png' }}
        />
      }
    
      if (route.key === 'ba') {
        return <Image
          style={{ width: 28, height: 28, tintColor: "rgba(256, 256, 256, 0.6)" }}
          source={{ uri: 'https://akveo.github.io/eva-icons/outline/png/128/book-outline.png' }}
        />
      }
    
      if (route.key === 'bon') {
        return <Image
          style={{ width: 28, height: 28, tintColor: "rgba(256, 256, 256, 0.6)" }}
          source={{ uri: 'https://akveo.github.io/eva-icons/outline/png/128/info-outline.png' }}
        />
      }
    
    }
    return (
      <>
      <LinearGradient colors={['#5c6bc0', '#5c6bc0']} style={{flex:1}}>
      <StatusBar barStyle="light-content" backgroundColor='#26418f'/>
      <ApplicationProvider mapping={mapping} theme={lightTheme}>
        <View style={{flexDirection:'row', alignItems: 'center',margin:15,marginBottom:10}}>

        
      <TouchableOpacity onPress={this.props.navigation.openDrawer}>
          <Image
            style={{width:38,height:38,tintColor:"#fff"}}
            source={{
              uri:
                "https://akveo.github.io/eva-icons/outline/png/128/menu-2-outline.png"
            }}
          />
        </TouchableOpacity>
      <Text style={{ textAlign:'left',fontSize:28,letterSpacing:2,color:"#fff",padding:20,paddingLeft:12,paddingBottom:6}}>GLXS Ophthalmic</Text>
      </View>
      <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          mot: Trchu,
          hai: Dmuc,
          ba : TestScr,
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
            style={{ backgroundColor: 'transparent',height:55 }}
            // renderLabel={({ route, focused, color }) => (
            //   <Text style={{ color: '#fff', marginBottom: 20, fontSize:10, fontWeight:"bold" }}>
            //     {route.title}
            //   </Text>
            // )}
            labelStyle={{display:'none'}}
            renderIcon={
              props => getTabBarIcon(props)
            }
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


const Drawer = () => (
  <LinearGradient colors={['#5c6bc0', '#6A82FB']} style={{paddingTop:25,flex:1}}>
    <ApplicationProvider mapping={mapping} theme={lightTheme}>
      { parseInt(log)  ? 
        <ListItem
        style={{backgroundColor:'#5c6bc0'}} 
        icon={(style, uri) => {
          delete style.tintColor
          return (
            <Image
              style={{ width: 50, height: 50, borderRadius:5 }}
              source={require("./src/images/user.png")}
            />
          )
        }}
        title='Tên tài khoản'
        titleStyle={{fontSize:17, fontWeight:'bold',color:'#fff'}}
        description='Description'
        descriptionStyle={{fontSize:14, color:"#AFA",paddingVertical:5}}
        />
            :
            <ListItem
    style={{backgroundColor:'#5c6bc0'}} 
    icon={(style, uri) => {
      delete style.tintColor
      return (
        <Image
          style={{ width: 50, height: 50, borderRadius:5 }}
          source={require("./src/images/user.png")}
        />
      )
    }}
    title='Login'
    titleStyle={{fontSize:17, fontWeight:'bold',color:'#fff'}}
    description='Description'
    descriptionStyle={{fontSize:14, color:"#AFA",paddingVertical:5}}
    />
      }
    {/* <ListItem
    style={{backgroundColor:'#5c6bc0'}} 
    icon={(style, uri) => {
      delete style.tintColor
      return (
        <Image
          style={{ width: 50, height: 50, borderRadius:5 }}
          source={require("./src/images/user.png")}
        />
      )
    }}
    title='Tên tài khoản'
    titleStyle={{fontSize:17, fontWeight:'bold',color:'#fff'}}
    description='Description'
    descriptionStyle={{fontSize:14, color:"#AFA",paddingVertical:5}}
    /> */}
    </ApplicationProvider>
    </LinearGradient>
);

const drawer = createDrawerNavigator(
  {
    Initial: main
  },
  {
    contentComponent: Drawer
  }
);

const App = createAppContainer(drawer);
export default App;



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

