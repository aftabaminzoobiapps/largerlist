import {StyleSheet, Dimensions} from 'react-native'

const styles = StyleSheet.create({
    container:{
      flex:1,
      justifyContent:"center",
      alignItems:"center",
      backgroundColor:"#000"
     
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 30,
        shadowColor: '#c0c0c0',
        shadowOpacity: 0.9,
        shadowOffset: {
          height: 2,
          width: 2,
        },
        shadowRadius: 8,
        elevation: 6,
      },
      search_view:{
        flexDirection:"row",
        position:"absolute",
        top:2,
        zIndex:2,
        backgroundColor:"#adadad",
        minWidth:Dimensions.get('screen').width-10,
        borderRadius:10,
        paddingHorizontal:5,
        marginHorizontal:5,
        paddingVertical:2, 
        alignItems:"center",
        marginBottom:5,
        justifyContent:"space-evenly",
        shadowColor: '#000',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 2,
      },
      button_style:{
        backgroundColor:"red",
        borderRadius:10,
        paddingHorizontal:10,
        paddingVertical:15, 
      },
      text:{
        fontSize:12,
        color:'white',
      },
      single_contact_style:{
        backgroundColor: '#6b6b6b', 
        borderRadius:10,
        maxHeight:50,
        paddingHorizontal:10,
        marginVertical:4,
        minWidth:Dimensions.get('screen').width-10,
        marginHorizontal:5,
        flexDirection: 'row',
      },
      name_number_view:{
        justifyContent:'space-around',
        paddingVertical:5, 
        paddingHorizontal:10, 
        flexDirection: 'column'
      }
})

export default styles
