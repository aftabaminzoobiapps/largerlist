import React ,{useEffect, useState} from 'react';
import {SafeAreaView,TouchableOpacity, PermissionsAndroid,ActivityIndicator,  StyleSheet,ScrollView,View,Text,StatusBar,FlatList, Touchable} from 'react-native';
import RenderItem from './src/FlatListItem'
import Contacts from 'react-native-contacts';
const App = () => {
  const [permission, setPermission] = useState(true);
  const [contacts, setContact] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() =>{
    PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_CONTACTS).then(response => {
      if(response){
          Contacts.getAll().then(contacts1 => {
              let items = []
              contacts1.forEach((item,index) =>{
                  item.phoneNumbers.map((x, index) => {
                      items.push({
                          key:`${index}${x.id}`,
                          name:item.displayName,
                          mobile_number:x.number.replace(/-|\s/g,""),
                        })
                  })
              })
              setContact(items.filter((v,i,a)=>a.findIndex(t=>(t.mobile_number === v.mobile_number))===i));
              setLoading(false)
            })
         
      }else{
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS).then((result) => {
          if(result === 'granted'){
            setPermission(true);
            setLoading(false)
          }else{
            setPermission(false)
            setLoading(false)
            alert("Please Grant Contacts Permission")
          }
      }).catch((error) =>{
        console.log(error)
        setLoading(false)
      })
      }
    }).catch((error) =>{
      console.log(error)
      setLoading(false)
    })
  },[permission])
if(loading){
  return(
    <View style={{flex:1, alignItems:"center", justifyContent:'center'}}>
       <ActivityIndicator size="small" color="green" />
    </View>
  )
}
if(!permission){
  return(
    <View style={{flex:1, alignItems:"center", justifyContent:'center'}}>
       <TouchableOpacity style={{width:'90%' , backgroundColor:"black", borderRadius:10, paddingHorizontal:20, paddingVertical:10,}}>
         <Text>Please Allow Permission</Text>
       </TouchableOpacity>
    </View>
  )
}
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
      <FlatList
               data={contacts.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase())}
               contentContainerStyle={{ alignItems:"center"}}
               renderItem={({item, index}) => (
                   <RenderItem  item={item} index={index} />
               )} 
               legacyImplementation={true}
               windowSize={150}
               removeClippedSubviews={true}
               initialNumToRender={20}
               updateCellsBatchingPeriod={20}
               maxToRenderPerBatch={250}
               //getItemLayout={(data, index) => ({length: 45, offset: 45 * index, index})}
               keyExtractor={(item) =>{
                  return item.key.toString()
                }}                                       
           />

      </SafeAreaView>
    </>
  );
}


export default App;
