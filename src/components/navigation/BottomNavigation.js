import React from 'react';
import { StyleSheet,Image  } from 'react-native';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
  ApplicationProvider,
} from 'react-native-ui-kitten';
import {
  light as theme,
} from '@eva-design/eva';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { Text, View } from 'react-native';
import {  createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import TrangChu from "../../screens/TrangChu";
import CaNhan from "../../screens/CaNhan";
import DanhMuc from "../../screens/DanhMuc";
import TimKiem from "../../screens/TimKiem";


const HomeIcon = (style) => (
  <Image
    style={style}
    source={{uri: 'https://akveo.github.io/eva-icons/fill/png/128/eye.png'}}
  />
);

const Category = (style) => (
  <Image
    style={style}
    source={{uri: 'https://akveo.github.io/eva-icons/fill/png/128/list.png'}}
  />
);

const Search = (style) => (
  <Image
    style={style}
    source={{uri: 'https://akveo.github.io/eva-icons/fill/png/128/search.png'}}
  />
);

const Personal = (style) => (
  <Image
    style={style}
    source={{uri: 'https://akveo.github.io/eva-icons/fill/png/128/person.png'}}
  />
);

// const config = Platform.select({
//   web: { headerMode: 'screen' },
//   default: {},
// });

// cài đặt bottom navigator

export const BottomNavigationShowcase = (props) => {

  const onTabSelect = (selectedIndex) => {
    const routes = props.navigation.state.routes;
    const selectedRoute = routes[selectedIndex];
    props.navigation.navigate(selectedRoute.routeName);
  };
 
  return (
    <BottomNavigation
      selectedIndex={props.navigation.state.index}
      onSelect={onTabSelect} style={{height:20}}>
      <BottomNavigationTab title='Tìm Kiếm' icon={HomeIcon} />
      <BottomNavigationTab title='Bệnh Lý' icon={Category}/>
      <BottomNavigationTab title='Cá Nhân' icon={Personal}/>
    </BottomNavigation>
   );
 }
 
 // cài đặt bottom navigator

 // Cài đặt stack navigator

 const TrangChuStack = createStackNavigator(
  {
    TrangChu: TrangChu,
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
   }
  );
  // config

const DanhMucStack = createStackNavigator(
  {
    DanhMuc: DanhMuc,
  },
  // config
);


const TabNavigatorExportAll = createBottomTabNavigator({
  TrangChu: TrangChuStack,
  DanhMuc: DanhMuc,
  CaNhan: CaNhan,
},
  {
    initialRouteName: 'TrangChu',
    tabBarComponent: BottomNavigationShowcase,
});


export default TabNavigatorExportAll;

