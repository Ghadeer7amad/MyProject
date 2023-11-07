import { StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native'
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faLock, faUser, faCheck} from '@fortawesome/free-solid-svg-icons';
import Color from '../../Common/Color.js';
import React, {useState} from 'react'

const ResetPassword = () => {
    const navigation = useNavigation();
    const[password, setpassword] = useState("")
    const[passwordC, setpasswordC] = useState("")
    const [fieldValid, setFieldValid] = useState({
        password: true,
        passwordC: true
    })

  return (
   <View style={styles.contanier}>
    <Image style={styles.contanier1}
        source={require("../../../assets/check.png")}
    />
    <View style={styles.contanier2}>
    <Text style={styles.TextStyleHeader}>Reset password Confirmation</Text>

    <View style={styles.formgroup}>
        <TextInput 
        value={password}
        onChangeText={(text) => setpassword(text)}
        //label = {<Text style={{}}>Email</Text>}
        onBlur={() => setFieldValid({ ...fieldValid, password: password !== "" })}
        style={styles.input} 
        placeholder='New Password'
        />
        <FontAwesomeIcon icon={faLock} style={styles.icon} />
    </View>
    {!fieldValid.password && <Text style={styles.textWrong}> password is required </Text>}

    <View style={styles.formgroup}>
        <TextInput 
        value={passwordC}
        onChangeText={(text) => setpasswordC(text)}
        //label = {<Text style={{}}>Email</Text>}
        onBlur={() => setFieldValid({ ...fieldValid, passwordC: passwordC !== "" })}
        style={styles.input} 
        placeholder='Confirm your Password'
        />
        <FontAwesomeIcon icon={faCheck} style={styles.icon} />
    </View>
    {!fieldValid.passwordC && <Text style={styles.textWrong}>confrim password is required </Text>}

    <TouchableOpacity onPress={() => {
            navigation.navigate('SendCode');
          }}>
       <Text style={[styles.buttonStyle, styles.buttonStyle1]}>Submit</Text>
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

export default ResetPassword

const styles = StyleSheet.create({
    contanier:{
        width:"100%",
        height:"100%",
      },
      contanier1: {
        height: "35%",
        width: "100%",
        justifyContent: "center",
       
      },
      contanier2: {
        height: "65%",
        backgroundColor: "#f4f4f4",
      },
      TextStyleHeader:{
        fontWeight: "bold",
        color:Color.primary, 
        fontSize: 30,
        marginBottom: 10,
        textAlign: "center",
        textTransform:"uppercase"
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
        borderRadius: 20,
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
      TextStyle: {
        marginTop: 20,
        marginBottom: 5,
        marginHorizontal: 10,
        fontWeight: '300',
        fontSize: 20,
        textAlign:"center",
        color: Color.primary,
      }
})