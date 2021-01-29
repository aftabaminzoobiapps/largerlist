import React ,{useEffect, useState} from 'react';
import {SafeAreaView,TouchableOpacity, PermissionsAndroid,ActivityIndicator, Image, Dimensions, StyleSheet,ScrollView,View,Text,StatusBar,FlatList, Touchable} from 'react-native';
import RenderItem from './src/FlatListItem'
import Contacts from 'react-native-contacts';

import faker from 'faker';
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview';

const SCREEN_WIDTH = Dimensions.get('window').width;

const App = () => {
    const fakeData = []
    const [list , setList] = useState([])
    const [permission, setPermission] = useState(true);
    const [contacts, setContact] = useState([])   
    useEffect(() =>{
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_CONTACTS).then(response => {
        if(response){
            Contacts.getAll().then(contacts1 => {
                let items = []
                contacts1.forEach((item,index) =>{
                    item.phoneNumbers.map((x, index) => {
                        items.push({
                          type: 'NORMAL',
                          item:{
                            id:`${index}${x.id}`,
                            image: `https://randomuser.me/api/portraits/${faker.helpers.randomize(['women', 'men'])}/${faker.random.number(60)}.jpg`,
                            name:item.displayName,
                            mobile_number:x.number.replace(/-|\s/g,""),
                          }
                          })
                    })
                })

                sortdata(items.sort((a, b) => a.item.name.toLowerCase() > b.item.name.toLowerCase()));
               
              })
           
        }else{
          PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS).then((result) => {
            if(result === 'granted'){
              setPermission(true);
             
            }else{
              setPermission(false)
             
              alert("Please Grant Contacts Permission")
            }
        }).catch((error) =>{
          console.log(error)
          
        })
        }
      }).catch((error) =>{
        console.log(error)
      })
    },[permission])


  const sortdata = (items) =>{
    setdataprovider(items.filter((v,i,a)=>a.findIndex(t=>(t.item.mobile_number === v.item.mobile_number))===i));
  }
  
  const setdataprovider = (fakeData) =>{
    setContact(new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(fakeData))
  }  
  
  const layoutProvider = new LayoutProvider((i) => {
      return contacts.getDataForIndex(i).type;
    }, (type, dim) => {
      switch (type) {
        case 'NORMAL': 
          dim.width = SCREEN_WIDTH;
          dim.height = 60;
          break;
        default: 
          dim.width = 0;
          dim.height = 0;
          break;
      };
    })
  

  const rowRenderer = (type, data) => {
    const { image, name, mobile_number, id} = data.item;
    return (
      <TouchableOpacity style={styles.listItem} onPress={() => console.log('Pressed')}>
        <Image style={styles.image} source={{ uri:image }} />
        <View style={styles.body}>
          <Text style={styles.name}>{name}{"  "}</Text>
          <Text style={styles.description}>{mobile_number}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  if(contacts.length === 0){
    return(
      <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
        <Text style={{color:"black"}}>loading</Text>
      </View>
    )
  }
    return (
      <View style={styles.container}>
        <RecyclerListView
          style={{flex: 1}}
          rowRenderer={rowRenderer}
          dataProvider={contacts}
          layoutProvider={layoutProvider}
          renderAheadOffset={500 }
        />
      </View>
    );
  
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    minHeight: 1,
    minWidth: 1,
  },
  body: {
    marginLeft: 10,
    marginRight: 10,
    maxWidth: SCREEN_WIDTH - (80 + 10 + 20),
  },
  image: {
    height: 40,
    width: 40,
    borderRadius:40
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    opacity: 0.5,
  },
  listItem: {
    flexDirection: 'row',
    margin: 5,
    borderRadius:10,
    backgroundColor:"#F0F0F0"
  },
});