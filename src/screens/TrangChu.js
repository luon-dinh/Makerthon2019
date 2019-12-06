import React, { Component, Fragment } from 'react';
import { StyleSheet, Image, ActivityIndicator, Animated,Alert,ImageBackground } from 'react-native';
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

import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import SearchableDropdown from "../components/engine/dropsearchList";
import { db } from '../config';
import { getSupportedVideoFormats } from 'expo/build/AR';
import LinearGradient from 'react-native-linear-gradient';
// import { TouchableOpacity } from 'react-native-gesture-handler';
let itemsRefTrieuChung = db.ref('/trieuchung');
let itemsRefBenh = db.ref('/benh');

const SearchBar = (style) => (
  <Image
    style={style}
    source={{ uri: 'https://akveo.github.io/eva-icons/fill/png/128/search.png' }}
  />
);

const RemoveBar = (style) => (
  <Image
    style={style}
    source={{ uri: 'https://akveo.github.io/eva-icons/fill/png/128/flip-2.png' }}
  />
);

var itemsData = [

];

class SelectedRenderWarn extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    // Animated.spring(this.state.animatedValue, {
    //   toValue: 0,
    //   tension: 20,
    //   useNativeDriver: true
    // }).start();
  }

  render() {
    if (this.props.number == 0) {
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center', margin: 5 }}>
          <Text category='h5' style={{ margin: 10, marginBottom: 0, color: '#8B8EFC' }}>Chưa có triệu chứng nào được chọn !</Text>
          <Image source={require("../images/eye.png")} style={{ width: 128, height: 128, margin: 15 }}></Image>
          <Text appearance='hint' style={{ margin: 8 }}>để bắt đầu, hãy nhập vào triệu chứng cần tìm.</Text>
        </View>
      );
    } else {
      return null
    }
  }
}

var dsTrung = [];
var chi_so;
var tong = 0;
const HEADER_EXPANDED_HEIGHT = 300;
const HEADER_COLLAPSED_HEIGHT = 10;
// var exportTenbenh = [];
export default class TrangChu extends React.Component {
  state = {
    exportTenbenh: [],
  };
  constructor(props) {
    super(props);

    this.state = {
      loadingInd: 1,
      scrollY: new Animated.Value(0),
      selectedItems: [
        // {
        //   id: 1,
        //   name: 'Buồn nôn',
        // },
        // {
        //   id: 1,
        //   name: 'Đau đầu',
        // },
        // {
        //   id: 1,
        //   name: 'Sợ sáng',
        // },
        // {
        //   id: 1,
        //   name: 'Lồi mắt',
        // },
        // {
        //   id: 1,
        //   name: 'Đỏ da mi',
        // },
        // {
        //   id: 1,
        //   name: 'Rách mi',
        // },
        // {
        //   id: 1,
        //   name: 'Sẹo ở mi',
        // },
        // {
        //   id: 1,
        //   name: 'Song thị',
        // },
        // {
        //   id: 1,
        //   name: 'Giảm thị lực',
        // },
        // {
        //   id: 1,
        //   name: 'Phù nề dưới kết mạc',
        // },
        // {
        //   id: 1,
        //   name: 'Xuất huyết tiên phòng',
        // },
        // {
        //   id: 1,
        //   name: 'Tiên phòng sâu bất thường',
        // },
        // {
        //   id: 1,
        //   name: 'Nhãn hạ áp',
        // },
        // {
        //   id: 1,
        //   name: 'Đồng tử méo',
        // },
        // {
        //   id: 1,
        //   name: 'Rách chân mống mắt',
        // },
        // {
        //   id: 1,
        //   name: 'Tách thể mi',
        // },
        // {
        //   id: 1,
        //   name: 'Bầm máu quanh hốc mắt',
        // },
        // {
        //   id: 1,
        //   name: 'Lệch TTT',
        // },
        // {
        //   id: 1,
        //   name: 'Chấn động võng mạc',
        // },
        // {
        //   id: 1,
        //   name: 'Vỡ cùng mạc',
        // },
        // {
        //   id: 1,
        //   name: 'Rách võng mạc',
        // },
        // {
        //   id: 1,
        //   name: 'Rách toàn bộ củng mạc và giác mạc',
        // },
        // {
        //   id: 1,
        //   name: 'Thị lực giảm hoặc không có triệu chứng gì',
        // },
        // {
        //   id: 1,
        //   name: 'Thấy dị vật trong nhãn cầu',
        // },
        // {
        //   id: 1,
        //   name: 'Phù bong nhỏ ở ngoại vi giác mạc',
        // },

      ],
      arrData: [
      ],
      arrBenh: [
      ],
      arrTrieuchung: [
      ],
      arrChuatri: [
      ],
      arrNguyennhan: [
      ],
      ketqua: [
      ],
      animatedValue: new Animated.Value(0),
    }
  }


  componentDidMount = async () => {
    try {
      // --- FETCH DATA TỪ BẢNG TRIỆU CHỨNG CHO SELECT LIST TRIỆU CHỨNG TÌM KIẾM
      itemsRefTrieuChung.on('value', snapshot => {
        let data = snapshot.val();
        let items = Object.values(data);

        var itemsHolder = [];
        for (var i = 0; i < items.length; i++) {
          itemsHolder.push({
            id: items.map(value => value.ID)[i],
            name: items.map(value => value.Trieuchung)[i]
          });
        }
        this.setState({ arrData: itemsHolder });
      });
      // --- FETCH DATA TỪ BẢNG BỆNH CHO ENGINE LẤY TỪ BẢNG TRIỆU CHỨNG ĐỂ TÌM KIẾM
      itemsRefBenh.on('value', snapshot => {
        let data = snapshot.val();
        let items = Object.values(data);
        snapshot.forEach((child) => { chi_so++; });
        this.setState({ arrBenh: items.map(value => value.Benh) });
        this.setState({ arrTrieuchung: items.map(value => value.Trieuchung) });
        this.setState({ arrChuatri: items.map(value => value.Thuoc) });
        this.setState({ arrNguyennhan: items.map(value => value.Nguyennhan) });
        // --- TẮT ACTIVITY INDICATOR (SPINNER) ;
        this.setState({ loadingInd: 0 });
      });

    } catch (err) {

    }

  }


  // REACT-NATIVE GLIXYLUS SEARCH ENGINE
  sosanh(arrS1, arrS2) {
    var output = 0;
    var tamthoi = "";
    var trungkhop = [];

    for (var i = 0; i < arrS1.length; i++) {
      arrS1[i] = arrS1[i].toString().toUpperCase();
    }
    for (var i = 0; i < arrS2.length; i++) {
      arrS2[i] = arrS2[i].toString().toUpperCase();
    }
    for (var i = 0; i < arrS1.length; i++) {
      for (var j = 0; j < arrS2.length; j++) {
        if (arrS1[i].localeCompare(arrS2[j]) == 0) {
          output++;
          tamthoi = tamthoi + arrS1[i] + ",";
        }
      }
    }
    // dsTrung = tamthoi;
    dsTrung.push({
      trung: tamthoi,
    });
    // console.log(dsTrung);
    return output;
  }

  resetGLXS = async () => {
    try {
      this.state.exportTenbenh.length = 0;
      this.state.selectedItems.length = 0;
      // return NULL state to processGLXS for RESET ALL DATA (it's genius +999 :)) )

      this.processGLXS();
    } catch (e) {
      Alert.alert("Thông báo","Bảng chuẩn đoán hiện đang trống thông tin !");
    }
  }

  processGLXS = async () => {
    this.state.animatedValue.setValue(0);
    // console.log(this.state.arrTrieuchung.length);
    this.setState({ exportTenbenh: null });
    tong = 0;

    dsTrung.length = 0;
    var ketqua = [];
    for (var i = 0; i <= this.state.arrTrieuchung.length; i++) {

      for (var j = this.state.arrTrieuchung.length - 1; j > i; j--) {
        if (this.state.arrTrieuchung[i].localeCompare(this.state.arrTrieuchung[j] == 0)) {
          this.state.arrTrieuchung.slice(j);
        }
      }
    }

    for (var i = 0; i < this.state.arrTrieuchung.length; i++) {
      var so_trieuchung = this.state.arrTrieuchung[i].split(",");
      ketqua.push({
        kq: this.sosanh(this.state.selectedItems.map(value => value.name), so_trieuchung),
      });
    }


    var exportTam = [];
    // this.Sorted(ketqua, this.state.arrBenh.map(value => value.tenb), dsTrung);
    for (var i = 0; i < this.state.arrBenh.map(value => value.name).length; i++) {
      if (ketqua[i].kq != 0) {
        tong++;
        exportTam.push({
          ten: this.state.arrBenh[i],
          trc: dsTrung[i].trung,
          sltrung: ketqua[i].kq,
          detailTrc: this.state.arrTrieuchung[i],
          detailChtr: this.state.arrChuatri[i],
          detailNgNh: this.state.arrNguyennhan[i]
        });
      }
    }
    exportTam.sort(function (a, b) { return (a.sltrung < b.sltrung) ? 1 : ((b.sltrung < a.sltrung) ? -1 : 0) });
    this.setState({ exportTenbenh: exportTam });

    Animated.spring(this.state.animatedValue, {
      toValue: 1,
      tension: 20,
      useNativeDriver: true
    }).start();

    // tong = this.state.exportTenbenh.length;
  }

  // REACT-NATIVE GLIXYLUS SEARCH ENGINE
  render() {
    renderHeader = () => {
      return (
        <>
          <Text style={{ marginHorizontal: 10, fontSize: 14, color: '#6C6CCE', textAlign: 'center', marginTop: 10, fontWeight: "bold" }}>{tong ? "TÌM ĐƯỢC " + tong + " BỆNH TƯƠNG ỨNG" : null}</Text>
          <Image source={require("../images/list.png")} style={{ width: 20, height: 20, alignSelf: "center" }}></Image>
        </>
      )
    };
    renderFooter = () => {
      return (
        <>
          <Text style={{ marginHorizontal: 10, fontSize: 14, color: '#CECECE', textAlign: 'center', margin: 10 }}>{tong ? "cuối kết quả tìm kiếm" : null}</Text>
        </>
      )
    };
    const renderItem = ({ item, index }) => {
      var delayValue = 500;
      delayValue = delayValue + 500;
      const translateX = this.state.animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [delayValue, 1]
      });
      const { navigate } = this.props.navigation;
      var addresses = item.trc.substring(0, item.trc.length - 1).split(',').splice(0, item.trc.length - 1).map(function (tenTrchung, index) {
        return (
          <TouchableOpacity key={index}>
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#7F7FD5', '#86A8E7']} style={{
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
          </TouchableOpacity>
        )

      });
      return (

        <Animated.View style={[{ transform: [{ translateX }] }]} >
          <TouchableOpacity
            onPress={() => navigate("ChiTietScr", {
              // TRUYỀN TÊN BỆNH
              ten: item.ten,
              // TRUYỀN TRIỆU CHỨNG TRÙNG
              trctr: item.trc,
              // TRUYỀN CHI TIẾT CHỮA TRỊ
              chtr: item.detailChtr,
              // TRUYỀN CHI TIẾT TRIỆU CHỨNG
              trc: item.detailTrc,
              // TRUYỀN CHI TIẾT NGUYÊN NHÂN
              ngnh: item.detailNgNh
            })} >
            <View style={styles.itemList}>
              <View style={
                (item.sltrung >= 5) ? styles.listItemName1 :
                  (item.sltrung >= 4) ? styles.listItemName2 :
                    (item.sltrung >= 3) ? styles.listItemName3 :
                      (item.sltrung >= 2) ? styles.listItemName4 :
                        styles.listItemName}>
                <Text style={{ fontWeight: 'bold', marginHorizontal: 5, fontSize: 12, color: '#6C6CCE' }}>{item.sltrung} triệu chứng phù hợp</Text>
              </View>

              <View style={{ margin: 5, marginVertical: 10, flexDirection: "row", alignItems: 'center' }}>
                <Image source={require("../images/atom.png")} style={{ width: 20, height: 20, marginRight: 5 }}></Image>
                <Text style={{ fontSize: 17, color: "#5f5f5f" }}>{item.ten
                }</Text>
              </View>
              <View style={{ marginHorizontal: 5, flexDirection: "row", flexWrap: 'wrap', alignItems: 'center' }}>
                {/* <Image source={require("../images/cause.png")} style={{width:20,height:20,margin:5}}></Image> */}
                {/* <Text style={{ fontSize: 14, color: '#9575CD' }}>{item.trc}</Text> */}
                {addresses}
                {console.log(item.trc)}
              </View>
           
            </View>
          </TouchableOpacity>
        </Animated.View>
      );
    }
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
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
      outputRange: [HEADER_EXPANDED_HEIGHT, HEADER_COLLAPSED_HEIGHT],
      extrapolate: 'clamp'
    })
    return (
      <LinearGradient colors={['#fff', '#fff']} style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <ScrollView style={{ flexDirection: 'column', paddingTop: 10 }} keyboardShouldPersistTaps="handled" >
            <View style={styles.panel}>
              <Fragment>
                {/* Multi */}
                <SearchableDropdown
                  multi={true}
                  selectedItems={this.state.selectedItems}
                  onItemSelect={(item) => {
                    const items = this.state.selectedItems;
                    items.push(item)
                    this.setState({ selectedItems: items });
                  }}
                  containerStyle={{ padding: 5 }}
                  onRemoveItem={(item, index) => {
                    const items = this.state.selectedItems.filter((sitem) => sitem.id !== item.id);
                    this.setState({ selectedItems: items });
                  }}
                  itemStyle={{
                    padding: 10,
                    marginTop: 2,
                    backgroundColor: '#FFFFFF',
                  }}
                  itemTextStyle={{ color: '#222' }}
                  itemsContainerStyle={{}}
                  items={this.state.arrData}
                  defaultIndex={2}
                  chip={true}
                  resetValue={false}
                  textInputProps={
                    {
                      placeholder: "nhập triệu chứng ...",
                      underlineColorAndroid: "transparent",
                      // size: "small",
                      style: {
                        paddingHorizontal: 10, backgroundColor: "#EEEEEE", borderRadius: 5, color: "#b0b0b0", height: 40, margin: 5
                      },
                      // onTextChange: text => alert(text)
                    }
                  }
                  listProps={
                    {
                      nestedScrollEnabled: true,
                    }
                  }
                />

                <SelectedRenderWarn number={this.state.selectedItems}></SelectedRenderWarn>

                {/* <Text appearance='hint' style={{ fontSize: 12, color: '#212121',textAlign:'center',margin:2 }}>đã chọn {this.state.selectedItems.length}</Text> */}
                <View style={{ flexDirection: 'row', margin: 5, marginTop: 0 }}>
                  <Button icon={SearchBar} size='small' style={{ margin: 5, marginTop: 0, width: "70%", backgroundColor: "#5A6ABF" }} disabled={this.state.selectedItems.length ? false : true} status='primary' onPress={this.processGLXS.bind(this)}>XỬ LÝ {this.state.selectedItems.length ? this.state.selectedItems.length + " TRIỆU CHỨNG" : null}</Button>
                  <Button icon={RemoveBar} size='small' style={{ margin: 5, marginTop: 0, width: "25%" }} onPress={this.resetGLXS.bind(this)} status='basic'></Button>
                </View>
              </Fragment>

            </View>

            <View style={{}}>
              <List
                style={{ marginHorizontal: 10, marginBottom: 10, backgroundColor: 'transparent' }}
                renderItem={renderItem}
                data={this.state.exportTenbenh}
                // data={this.state.exportTenbenh}
                showsHorizontalScrollIndicator={false}
                ListHeaderComponent={renderHeader}
                ListFooterComponent={renderFooter}
              // keyExtractor={(item =>item)}
              />

            </View>
          </ScrollView>
        </View>
      </LinearGradient>
    );
  }
}


TrangChu.navigationOptions = {
  headerVisible: false,
  headerMode: 'none',
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
  listItemName1: {
    marginHorizontal: 10,
    borderLeftWidth: 7,
    borderLeftColor: '#DD2C00'
  },
  listItemName2: {
    marginHorizontal: 10,
    borderLeftWidth: 7,
    borderLeftColor: '#FF6D00'
  },
  listItemName3: {
    marginHorizontal: 10,
    borderLeftWidth: 7,
    borderLeftColor: '#FFAB00'
  },
  listItemName4: {
    marginHorizontal: 10,
    borderLeftWidth: 7,
    borderLeftColor: '#FFD600'
  },
  listItemName: {
    marginHorizontal: 10,
    borderLeftWidth: 7,
    borderLeftColor: '#448AFF'
  },
  panel: {
    flexDirection: 'column',
    borderRadius: 5,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 7,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 15,
    margin: 7,

  },
  itemList: {
    margin: 10,
    marginHorizontal: 7,
    padding: 15,
    paddingHorizontal: 5,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 7,
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
    color: '#757575',
  }
});