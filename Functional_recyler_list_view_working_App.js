import React, {Component, useEffect, useState} from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity, Text, Image } from 'react-native';
import faker from 'faker';
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview';
const SCREEN_WIDTH = Dimensions.get('window').width;
const App = () => {
    const fakeData = []
   
    const [list , setList] = useState([])
      for(let i = 0; i < 1000; i+= 1) {
        fakeData.push({
          type: 'NORMAL',
            item: {
              id: i,
              image: `https://randomuser.me/api/portraits/${faker.helpers.randomize(['women', 'men'])}/${faker.random.number(60)}.jpg`,
              name: faker.name.firstName(),
              description: faker.random.words(10),
            },
        })
      }
    
   useEffect(() => {
    setList(new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(fakeData))
   },[])
     
  const layoutProvider = new LayoutProvider((i) => {
      return list.getDataForIndex(i).type;
    }, (type, dim) => {
      switch (type) {
        case 'NORMAL': 
          dim.width = SCREEN_WIDTH;
          dim.height = 100;
          break;
        default: 
          dim.width = 0;
          dim.height = 0;
          break;
      };
    })
  

  const rowRenderer = (type, data) => {
    const { image, name, description, id} = data.item;
    return (
      <TouchableOpacity style={styles.listItem} onPress={() => console.log('Pressed')}>
        <Image style={styles.image} source={{ uri:image }} />
        <View style={styles.body}>
          <Text style={styles.name}>{name}{"  "} {id}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  if(list.length === 0){
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
          dataProvider={list}
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
    height: 80,
    width: 80,
    borderRadius:80
  },
  name: {
    fontSize: 20,
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