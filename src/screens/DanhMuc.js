import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, ActivityIndicator,TextInput } from 'react-native';
import {
  Text,
  BottomNavigation,
  BottomNavigationTab,
  Icon,
  Input,
  Layout,
  List,
  ListItem,
  Spinner,
} from 'react-native-ui-kitten';
import {
  mapping,
  light as theme,
} from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { firebaseConf } from '../config';
import { ScrollView } from 'react-native-gesture-handler';

const db = firebaseConf.database();
let itemsRef = db.ref('/benh').limitToFirst(100);

const SearchBar = (style) => (
  <Image
    style={style}
    source={{ uri: 'https://akveo.github.io/eva-icons/fill/png/128/funnel.png' }}
  />
);

const TestIcon1 = (style) => (
  <Image
    style={style}
    source={{ uri: 'https://akveo.github.io/eva-icons/fill/png/128/pantone.png' }}
  />
);

const TestIcon2 = (style) => (
  <Image
    style={{ width: 70, height: 70 }}
    source={{ uri: 'https://akveo.github.io/eva-icons/fill/png/128/activity.png' }}
  />
);

const SAMPLE_DATA = {
  title: 'Item',
};

const StarIcon = (style) => (
  <Icon {...style} name='star' />
);




export default class DanhMuc extends React.Component {

  state = {
    items: [],
    loadItems: [],
    loadingInd: 1,
  };
  arrayholder = [];

  componentDidMount = async () => {
    itemsRef.once('value', snapshot => {
      let data = snapshot.val();
      let items = Object.values(data);
      this.setState({ items });
      this.arrayholder = this.state.items;
      this.setState({ loadingInd: 0 });
    });
  }

  searchFilterFunction = text => {
    this.setState({
      value: text,
    });
    const newData = this.arrayholder.filter(item => {

      const itemData = `${item.Benh} ${item.Trieuchung}`;
      const itemDataUpp = itemData.toUpperCase();
      const textData = text.toUpperCase();
      return itemDataUpp.indexOf(textData) > -1;
    });

    this.setState({ items: newData });
  };

  render() {
    const { navigate } = this.props.navigation;
    const renderItem = ({ item, index }) => (
       <View key={index} style={{marginVertical:7,borderBottomWidth:0.5,borderBottomColor:'#90CAF9',backgroundColor:"#ffffff"}}>
       <ListItem
         title={item.Benh}
         titleStyle={{ fontSize: 20, color: '#2979FF' }}
         descriptionStyle={{ fontSize: 14, margin: 5 }}
         description={item.Trieuchung}
         onPress={() => navigate("ChiTietDm", {
          // TRUYỀN TÊN BỆNH
          ten: item.Benh,
          // TRUYỀN CHI TIẾT CHỮA TRỊ
          chtr: item.Thuoc,
          // TRUYỀN CHI TIẾT TRIỆU CHỨNG
          trc: item.Trieuchung,
          // TRUYỀN CHI TIẾT NGUYÊN NHÂN
          ngnh: item.Nguyennhan
        })}  
         />
         <View style={{ marginHorizontal: 15 }}>
           <Text style={{ marginVertical: 5, fontWeight:'bold' }} category='c1' status='warning'>{item.Nguyennhan}</Text>
           <Text style={{ marginVertical: 5, fontWeight:'bold' }} category='c1' status='success'>ĐIỀU TRỊ: {item.Thuoc}</Text>
         </View> 
     </View>
    );

    if (this.state.loadingInd) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ margin: 20, alignItems: 'center', justifyContent: 'center' }}>
            <Spinner size="giant" status='alternative' loading={this.state.loadingInd} />
          </View>
          <Text style={styles.titleText}>đang tải dữ liệu ...</Text>
        </View>
      );
    }
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <View style={{ flex: 1, marginHorizontal: 0,backgroundColor:"#ffffff" }}>
        <View style={{ margin: 5}}>
            <TextInput
              placeholder="Tìm kiếm tên bệnh, triệu chứng ..."
              style={{paddingHorizontal: 10, backgroundColor: "#EEEEEE", borderRadius: 5, color: "#b0b0b0", height: 40, margin: 5}}
              onChangeText={text => this.searchFilterFunction(text)}
              autoCorrect={false}
              size="small"
              value={this.state.value}
            />
          </View>
          <ScrollView>
            <View style={{ flexDirection: 'column',backgroundColor:"#ffffff"}}>
              <List
                style={{ marginHorizontal: 5,backgroundColor:"#ffffff" }}
                renderItem={renderItem}
                data={this.state.items}
                
                showsHorizontalScrollIndicator={false}
                // keyExtractor={item => item.Benh}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

class LogoTitle extends React.Component {
  render() {
    return (
      <Layout style={styles.container}>
        <React.Fragment>
          <Input
            style={styles.input}
            size='small'
            // textAlign={'center'}
            placeholder='TÌM KIẾM'
            icon={SearchBar}
          />
        </React.Fragment>
      </Layout>
    );
  }
}

DanhMuc.navigationOptions = {
  headerTitle: "Tất cả bệnh lý"
  // headerTitle: () => <LogoTitle />,
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
  input: {
    flex: 1,
    marginHorizontal: 5,
    height: 50,
  },
  slider: {
    margin: 5,
    height: 100,
  },
  titleText: {

  }

});