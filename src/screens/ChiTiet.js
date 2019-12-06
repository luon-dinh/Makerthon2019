import React from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import {
  Icon,
  ListItem,
  List,
  Input,
  Layout,
  Text,
  Button,
  Spinner,
} from 'react-native-ui-kitten';
import LinearGradient from 'react-native-linear-gradient';

export default function ConversationScreen(props) {
  const propsFromMessages = props.navigation.state.params;
  var trung = propsFromMessages.trctr.split(',').splice(0, propsFromMessages.trctr.length - 1).map(function (tenTrchung, index) {
    return (
      <Text key={index} style={{
        color:'#6C6CCE',
      }}>{tenTrchung}_</Text>
    )

  });
  var trieuChung = propsFromMessages.trc.split(',').splice(0, propsFromMessages.trc.length - 1).map(function (tenTrchung, index) {
    return (
      <LinearGradient key={index} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#7F7FD5', '#86A8E7']} style={{
        margin: 4,
        borderRadius: 5,
        padding: 5,
        paddingHorizontal: 7,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 5,
      }}>
        <Text style={{
          fontSize: 12,
          color: "#fff",
          fontWeight: "bold",
        }}>{tenTrchung}</Text>
      </LinearGradient>
    )
  });
  var nguyenNhan = propsFromMessages.ngnh.split(';').splice(0, propsFromMessages.ngnh.length - 1).map(function (tenNgnhan, index) {
    return (
      <LinearGradient key={index} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#F37335', '#F37335']} style={{
        margin: 4,
        borderRadius: 5,
        padding: 5,
        paddingHorizontal: 7,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 5,
      }}>
        <Text style={{
          fontSize: 12,
          color: "#fff",
          fontWeight: "bold",
        }}>{tenNgnhan}</Text>
      </LinearGradient>
    )
  });
  var ppdieuTri = propsFromMessages.chtr.split(';').splice(0, propsFromMessages.chtr.length - 1).map(function (tenDieutri, index) {
    return (
      <LinearGradient key={index} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#11998e', '#01A959']} style={{
        margin: 4,
        borderRadius: 5,
        padding: 5,
        paddingHorizontal: 7,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 5,
      }}>
        <Text style={{
          fontSize: 12,
          color: "#fff",
          fontWeight: "bold",
        }}>{tenDieutri}</Text>
      </LinearGradient>
    )
  });
  return (
    <View style={{flex:1, backgroundColor:'#fff'}}>
      <View style={{backgroundColor:'#5D6CC1'}}>
      <Button
    style={{backgroundColor: "#4D5EBB",height:40}}
    appearance='ghost' status='primary'
    textStyle={{color:"#fff"}}
    onPress={() => props.navigation.goBack()}>TRỞ VỀ</Button>
    </View>
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <View style={{ margin: 20}}>
        {/* TÊN BỆNH */}
        <Text style={{ fontWeight: 'bold', fontSize: 22, color: '#5B6ABF', padding: 15, paddingTop:0,textAlign:'center',lineHeight: 30, }}>{propsFromMessages.ten.toUpperCase()}</Text>
        {/* TRIỆU CHỨNG TRÙNG KHỚP */}
        <View style={{ flexDirection: 'column',alignSelf:'flex-start' }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold', color:'#6C6CCE', textDecorationLine:'underline' }}>Triệu chứng trùng khớp: </Text>
          <View style={{ margin: 10, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}>
          {trung}
          </View>
        </View>
        {/* TRIỆU CHỨNG */}
        <View style={{ flexDirection: 'column',alignSelf:'flex-start' }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold', color:'#6C6CCE', textDecorationLine:'underline' }}>Triệu chứng: </Text>
          <View style={{ margin: 10, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}>
            {trieuChung}
          </View>
        </View>
        <View style={{ flexDirection: 'column',alignSelf:'flex-start' }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold', color:'#FF8008', textDecorationLine:'underline' }}>Nguyên nhân: </Text>
          <View style={{ margin: 10, flexDirection: 'column', flexWrap:'wrap',alignSelf:'flex-start' }}>
            {nguyenNhan}
          </View>
        </View>
        <View style={{ flexDirection: 'column',alignSelf:'flex-start' }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold', color:'#1D976C', textDecorationLine:'underline' }}>Điều trị: </Text>
          <View style={{ margin: 10, flexDirection: 'column',alignSelf:'flex-start' }}>
            {ppdieuTri}
          </View>
        </View>
        
      </View>
      

    </ScrollView>
    
    </View>
  );
}

ConversationScreen.navigationOptions = {
  title: "Conversation"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  },
  contentContainer: {
    backgroundColor: '#fff',
    alignItems: "center",
    flexDirection: 'column'
    // justifyContent: "center"
  }
});