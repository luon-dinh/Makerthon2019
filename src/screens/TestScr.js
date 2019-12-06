import React from 'react';
import { StyleSheet, Button, Fragment } from 'react-native';
import { WebView } from 'react-native-webview'
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
import SearchableDropdown from "../components/engine/dropsearchList";
import { firebaseConf } from '../config';
const db = firebaseConf.database();
let itemsRefTuDien = db.ref('/tudien');

const tudienData = require('../data/tudien.json');
// const sampleImage = ref.getDownloadURL().then(result => alert(result));

// var urlIm;

// ref.getDownloadURL().then(function(url) {
//     // console.log(url);
//     alert(url);
//   });

// const urlIm = function() {
//     return ref.getDownloadURL();
// }
// const urlIm = ref.getDownloadURL();
// alert(urlIm);
// import { ScrollView } from 'react-native-gesture-handler';
const INJECTEDJAVASCRIPT = `const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=0.8, maximum-scale=0.8, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `
export default class CaNhan extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadUrl: "0",
            errPage: 0,
            arrDataTuDien: [],
            selectedItems: "18Trisomy",
            extFile:".html",
        }
    }
    componentDidMount = async () => {
        try {
            console.disableYellowBox = true;
            // var listRef = ref.child('');
            // console.log(listRef);
            // ref.getDownloadURL().then(result => {
               
            //     this.setState({loadUrl : result});
            //     //alert(this.state.loadUrl);
            // });
            let items = Object.values(tudienData);
            
            var itemsHolder = [];
            for (var i = 0; i < items.length; i++) {
              itemsHolder.push({
                id: 1,
                name: items.map(value => value.name)[i]
              });
            }
            this.setState({ arrDataTuDien: itemsHolder });
            
            // itemsRefTuDien.on('value', snapshot => {
            //     let data = snapshot.val();
            //     console.log(data);
            //     let items = Object.values(data);
                
            //     var itemsHolder = [];
            //     for (var i = 0; i < items.length; i++) {
            //       itemsHolder.push({
            //         id: 1,
            //         name: items.map(value => value.name)[i]
            //       });
            //     }
            //     this.setState({ arrDataTuDien: itemsHolder });
                
            //   });
             
              
           
        } catch (err) {

        }
    }
    render() {
        console.log(this.state.arrDataTuDien)
        return (
            <View style={{flex:1}}>
          
                {/* Multi */}
                <SearchableDropdown
                 
                  selectedItems={{}}
                  onItemSelect={(item) => {
                    console.log(item);
                    // const items = this.state.selectedItems;
                    // items.push(item)
                    this.setState({ selectedItems: item.name });
                    this.setState({ extFile: ".html" })
                  }}
                  containerStyle={{ padding: 5 }}
                  onRemoveItem={(item, index) => {
                    // const items = this.state.selectedItems.filter((sitem) => sitem.id !== item.id);
                    // this.setState({ selectedItems: items });
                  }}
                  itemStyle={{
                    padding: 10,
                    marginTop: 2,
                    backgroundColor: 'transparent',
                  }}
                  itemTextStyle={{ color: '#fff' }}
                  itemsContainerStyle={{maxHeight: 240}}
                  items={this.state.arrDataTuDien}
                  defaultIndex={2}
                 
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
                      initialNumToRender:5,
                    }
                  }
                />

               

                {/* <Text appearance='hint' style={{ fontSize: 12, color: '#212121',textAlign:'center',margin:2 }}>đã chọn {this.state.selectedItems.length}</Text> */}
              
             
            <WebView
            onError={()=>this.setState({ extFile: ".htm" })}
            
            source={{uri:'file:///android_asset/tudienNK/'+this.state.selectedItems + ".html"}}
            // source={require('./KearnssayreSyndrome.html')}
            style={{flex: 1}}
            injectedJavaScript={INJECTEDJAVASCRIPT}
            baseUrl={""}
          />
          </View>
            // <LinearGradient colors={['#5C6BC0', '#6A82FB', '#EF76A2']} style={styles.linearGradient}>
            //     <ScrollView>
            //         <Image source={{ uri: this.state.loadUrl }} style={{width:300,height:300}}></Image>
            //     </ScrollView>
            // </LinearGradient>

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