import React from 'react';
import { StyleSheet, Button } from 'react-native';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from 'react-native-ui-kitten';
import {
  mapping,
  light as theme,
} from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { Text, View, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import LinearGradient from 'react-native-linear-gradient';
import { bold } from 'colorette';
// import { ScrollView } from 'react-native-gesture-handler';

export default class CaNhan extends React.Component {
  render() {
    return (

      <LinearGradient colors={['#5C6BC0', '#6A82FB', '#EF76A2']} style={styles.linearGradient}>
        <ScrollView>
          <View style={{ flexDirection: "column", justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#fff', fontSize: 20, textAlign: "center", fontWeight: "bold", margin: 20, lineHeight: 30 }}>{('dự án phần mềm nhãn khoa GLXSOPH').toUpperCase()}</Text>
            <Text style={{ color: '#fff', textAlign: "center", margin: 5, fontWeight: 'bold', lineHeight: 25 }}>Cuộc thi lập trình Makerthon lần 3 năm 2019</Text>

            <Text style={{ color: '#fff', margin: 5 }}>Phẩn mềm được xây dựng bởi: </Text>
            <Text style={{ color: '#fff', margin: 15, fontSize: 18, fontWeight: 'bold', textDecorationLine: 'underline' }}>Glixylus Team</Text>
            <Text style={{ color: '#fff', fontSize: 15, fontWeight: "bold", margin: 5 }}>Nguyễn Văn Phú Nhàn _UIT</Text>
            <Text style={{ color: '#fff', fontSize: 15, fontWeight: "bold", margin: 5 }}>Dương Phan Quân Vũ _RMIT</Text>
            <Text style={{ color: '#fff', fontSize: 15, fontWeight: "bold", margin: 5 }}>Đinh Hoàng Luôn _UIT</Text>

            <Text style={{ color: '#fff', margin: 10 }}>TP Hồ Chí Minh, tháng 12 năm 2019</Text>
          </View>
        </ScrollView>
      </LinearGradient>

    );
  }
}

CaNhan.navigationOptions = {
  title: "Kanta",
}
var styles = StyleSheet.create({
  linearGradient: {
    flex: 1,

  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});