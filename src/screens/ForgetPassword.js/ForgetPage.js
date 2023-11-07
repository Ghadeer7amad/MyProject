import { StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native'
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEnvelope} from '@fortawesome/free-solid-svg-icons';
import Color from '../../Common/Color.js';
import React, {useState} from 'react'

const ForgetPage = () => {
    const navigation = useNavigation();
    const[email, setemail] = useState("")
    const [fieldValid, setFieldValid] = useState({
        email: true
    })

  return (
   <View style={styles.contanier}>
    <Image style={styles.contanier1}
        source={require("../../../assets/forgetpassword.png")}
    />
    <View style={styles.contanier2}>
    <Text style={styles.TextStyleHeader}>forget password,</Text>
    <Text style={styles.TextSub}>please enter your email address to reset your password !!</Text>
    <View style={styles.formgroup}>
        <TextInput 
        value={email}
        onChangeText={(text) => setemail(text)}
        //label = {<Text style={{}}>Email</Text>}
        onBlur={() => setFieldValid({ ...fieldValid, email: email !== "" })}
        style={styles.input} 
        placeholder='example@gmail.com'
        />
        <FontAwesomeIcon icon={faEnvelope} style={styles.icon} />
    </View>
    {!fieldValid.email && <Text style={styles.textWrong}> email is required </Text>}

    <TouchableOpacity onPress={() => {
            navigation.navigate('ResetPassword');
          }}>
       <Text style={[styles.buttonStyle, styles.buttonStyle1]}>Reset Password</Text>
      </TouchableOpacity>  

      <TouchableOpacity onPress={() => {
            navigation.navigate('Login');
          }}>
       <Text style={[styles.buttonStyle, styles.buttonStyle2]}>back to login</Text>
      </TouchableOpacity>  
   </View>
   </View>
   
    
  )
}

export default ForgetPage

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
        marginBottom: 10,
        textAlign: "center",
        textTransform:"uppercase"
      },
      TextSub: {
        color:Color.primary, 
        fontSize: 22,
        marginHorizontal: 20,
        textAlign: "center",
        marginBottom: 10
      },
      formgroup:{
        display:"flex",
        position:"relative",
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
      },
      icon: {
        position: 'absolute', // تحديد موقع الأيقونة بالنسبة لحقل النص
        color: Color.primary,
        marginHorizontal: 30, // المسافة من اليسار
        padding: 11,
      },
      input: {
        flex: 1, // استخدم flex لاستغلال المساحة المتاحة بالكامل لحقل النص
        borderBottomWidth: 1, // إضافة حدود لحقل النص
        paddingVertical: 2, // تضبيط المسافة الرأسية داخل حقل النص
        padding: 35,
        marginHorizontal: 10,
        //borderRadius: 20,
        borderColor: Color.primary,
        borderWidth: 2, // تحديد عرض الإطار 
      },
      textWrong:{
        color: "#ff847c",
        marginLeft: 10,
     },
     buttonStyle:{
        padding: 20,
        marginBottom: 5,
        marginHorizontal: 10,
        fontWeight: '400',
        fontSize: 20,
        textAlign:"center",
        color:"#fff",
        borderRadius: 25,
        letterSpacing: 2
      },
      buttonStyle1:{
        backgroundColor: Color.primary,
        color:"#fff",
        marginTop: 60,
      },
      buttonStyle2:{
        backgroundColor: "#fbeeff",
        color: Color.primary,
        marginTop: 3,
      },
})