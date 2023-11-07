import { StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native'
import { TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Color from '../../Common/Color.js';
import React, {useState} from 'react'

const SendCode = () => {
    const navigation = useNavigation();

  return (
   <View style={styles.contanier}>
    <Image style={styles.contanier1}
        source={require("../../../assets/mail2.png")}
    />
    <View style={styles.contanier2}>
    <Text style={styles.TextStyleHeader}>Verification Code</Text>
    <Text style={styles.TextSub}> You will receive 4 digit Code that is send to you</Text>

    <View style={styles.formgroupstyle}>
      <View style={styles.formgroup}>
        <TextInput style={styles.input}/>
      </View>

      <View style={styles.formgroup}>
        <TextInput style={styles.input}/>
      </View>

      <View style={styles.formgroup}>
        <TextInput style={styles.input}/>
      </View>

      <View style={styles.formgroup}>
        <TextInput style={styles.input}/>
      </View>
    </View>

    <Text style={styles.TextStyle}> Do not receive code?
      <Text onPress={()=>navigation.navigate('Login')}
       style={styles.link}>Resend Code</Text>
      </Text>

    <TouchableOpacity onPress={() => {
            navigation.navigate('ResetPassword');
          }}>
       <Text style={styles.buttonStyle}>Verifiy</Text>
      </TouchableOpacity>  

   </View>
   </View>
   
    
  )
}

export default SendCode

const styles = StyleSheet.create({
    contanier:{
        width:"100%",
        height:"100%",
      },
      contanier1: {
        height: "40%",
        width: "100%",
        justifyContent: "center",
       
      },
      contanier2: {
        height: "60%",
        backgroundColor: "#fff",
      },
      TextStyleHeader:{
        fontWeight: "bold",
        color:Color.primary, 
        fontSize: 30,
        marginTop: 30,
        textAlign: "center",
        textTransform:"uppercase"
      },
      TextSub: {
        color:Color.primary, 
        fontSize: 22,
        marginLeft: 22,
        textAlign: "center",
        marginBottom: 10,
        marginTop: 14
      },
      formgroupstyle: {
        flexDirection: 'row', // هذا سيتيح لهم الترتيب أفقيا
        justifyContent: 'space-between', // يمكنك تغيير هذا حسب الحاجة
      },
      formgroup: {
        flex: 0.8, // هذا سيساعد على توزيع العناصر بالتساوي على الشاشة
        marginHorizontal: 10
      },
      input: {
        borderWidth: 2,
        borderRadius: 20,
        borderColor: '#d9b650',
        paddingVertical: 15,
        marginTop: 20
      },
     buttonStyle:{
        padding: 20,
        marginTop: 70,
        marginBottom: 5,
        marginHorizontal: 10,
        backgroundColor: Color.primary,
        fontWeight: '300',
        fontSize: 20,
        textAlign:"center",
        color:"#fff",
        borderRadius: 30
      },
      TextStyle: {
        marginTop: 20,
        marginBottom: 5,
        marginHorizontal: 10,
        fontWeight: '300',
        fontSize: 20,
        textAlign:"center",
        color: Color.primary,
      },
      TextStyle:{
        marginHorizontal: 50,
        marginLeft: 100,
        marginTop: 13,
        fontSize: 16
      },
      link:{
        color: "#d9b650",
        fontWeight: "bold",
        fontSize: 16
        
      },
})