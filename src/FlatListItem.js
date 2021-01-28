import React , {PureComponent} from 'react'
import {View, Text, TouchableOpacity,} from 'react-native'
import styles from './FlatListItemStyle'
class FlatListItem extends PureComponent {
    render(){
        const {item, index} = this.props;
        return(
           <View>
            <TouchableOpacity style={styles.single_contact_style} onPress = {() => alert(item.name)} >
               <View style={{width:40, height:40, borderRadius:30, backgroundColor:"black"}}></View>
                <View style={styles.name_number_view}>
                    <Text style={[styles.text, {fontWeight:"bold"}]}>{item.name}{"   "} {index}</Text>
                    <Text style={styles.text}>{item.mobile_number}</Text>
                </View>        
             </TouchableOpacity>
             {
             (index+1)%5==0
             ?
             <View style={{backgroundColor:'black', width:'96%', alignSelf:"center", alignItems:"center", justifyContent:"center", height:60 , borderRadius:10,}}>
                 <Text style={{textAlign:"center", textAlignVertical:"center", fontWeight:"bold", fontSize:20, color:"#fff"}}>Add View</Text>
             </View>
             :null}
            </View>
        )
    }
}

export default FlatListItem;