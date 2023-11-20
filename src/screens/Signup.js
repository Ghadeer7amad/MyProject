import { StyleSheet, Text, View,TextInput, Image, TouchableOpacity, TouchableWithoutFeedback, Alert, Pressable } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEnvelope, faLock, faUser, faCheck, faHome, faPhone, faBirthdayCake } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faGoogle, faTwitter} from '@fortawesome/free-brands-svg-icons';
import { Linking } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import Color from '../Common/Color.js';
import React, {useState} from 'react'
import { useNavigation } from '@react-navigation/native';
import Spacing from '../Common/Spacing.js'
//import { format, isValid, parse } from 'date-fns';

const Signup = () => {
  const [isPasswordCValid, setPasswordCValid] = useState(true);
  const[FData, setFData] = useState({
    name : "",
    email: "",
    birthday: "",
    phone: "",
    address: "",
    password: "",
    passwordC: ""
  })
  const [fieldValid, setFieldValid] = useState({
    name: true,
    email: true,
    birthday: true,
    phone: true,
    address: true,
    password: true,
    passwordC: true
  });
  
 const navigation = useNavigation();

  const handleRegister = async() => {
    const errors = {};
    if (FData.name === "") {
      errors.name = false;
    }
    if (FData.email === "") {
      errors.email = false;
    }
    if (FData.birthday === "") {
      errors.birthday = false;
    }
    if (FData.phone === "") {
      errors.phone = false;
    }
    if (FData.address === "") {
      errors.address = false;
    }
    if (FData.password === "") {
      errors.password = false;
    }
    if (FData.passwordC === "") {
      errors.passwordC = false;
    }
    setFieldValid({ ...fieldValid, ...errors });

    // إذا كان هناك حقول غير صالحة، لا تقم بإرسال الطلب
    if (Object.values(errors).some(fieldValid => !fieldValid)) {
      return;
    }
    navigation.navigate('test');
   }

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const [showPasswordC, setShowPasswordC] = useState(false);

  const togglePasswordVisibilityC = () => {
    setShowPasswordC(!showPasswordC);
  };
  return (
    <View style={styles.contanier}> 
     <Text style={{color:Color.primary, fontSize: 25, fontWeight:"bold", marginLeft: 20, marginTop: 3, marginBottom: 1}}>

     <TouchableOpacity style={{marginLeft: Spacing*3}} 
                 onPress={() => {
                 navigation.navigate('ChoseScreen');
                }}>
                    <Ionicons name="arrow-back" color={Color.primary} size={Spacing*1.3}/>
    </TouchableOpacity>
       Dear Lady,
      </Text>

      <Text style={{color:Color.primary, fontSize: 17, marginLeft: 20, marginBottom: 3}}>please enter your complete information !!</Text>
      <View style={styles.formgroup}>
        <TextInput 
        value={FData.name}
        onChangeText={(text) => setFData({...FData, name: text})}
        onBlur={() => setFieldValid({ ...fieldValid, name: FData.name !== "" })}
        style={styles.input} 
        placeholder='Enter Your Name'/>
        <FontAwesomeIcon icon={faUser} style={styles.icon} />
      </View>
      {!fieldValid.name && <Text style={styles.textWrong}> Name is required </Text>}

      <View style={styles.formgroup}>
        <TextInput 
        value={FData.email}
        onChangeText={(text) => setFData({...FData, email: text})}
        onBlur={() => setFieldValid({ ...fieldValid, email: FData.email !== "" })}
        style={styles.input} 
        placeholder='example@gmail.com'/>
        <FontAwesomeIcon icon={faEnvelope} style={styles.icon} />
      </View>
      {!fieldValid.email && <Text style={styles.textWrong}> email is required </Text>}

      <View style={styles.formgroup}>
        <TextInput 
        value={FData.birthday}
        onChangeText={(text) => setFData({...FData, birthday: text})}
        onBlur={() => setFieldValid({ ...fieldValid, birthday: FData.birthday !== ""  })}
        style={styles.input} 
        placeholder='dd/mm/yy'/>
        <FontAwesomeIcon icon={faBirthdayCake} style={styles.icon} />
      </View>
      {!fieldValid.birthday && <Text style={styles.textWrong}> birthday is required </Text>}


      <View style={styles.formgroup}>
        <TextInput 
        value={FData.phone}
        onChangeText={(text) => setFData({...FData, phone: text})}
        onBlur={() => setFieldValid({ ...fieldValid, phone: FData.phone !== "" })}
        style={styles.input} 
        placeholder='+972 56-853-6463'/>
        <FontAwesomeIcon icon={faPhone} style={styles.icon} />
      </View>
      {!fieldValid.phone && <Text style={styles.textWrong}> phone is required </Text>}

      <View style={styles.formgroup}>
        <TextInput 
        value={FData.address}
        onChangeText={(text) => setFData({...FData, address: text})}
        onBlur={() => setFieldValid({ ...fieldValid, address: FData.address !== "" })}
        style={styles.input} 
        placeholder='City/Village'/>
        <FontAwesomeIcon icon={faHome} style={styles.icon} />
      </View>
      {!fieldValid.address && <Text style={styles.textWrong}> address is required </Text>}

      <View style={styles.formgroup}>
        <TextInput 
        secureTextEntry={!showPassword}
        value={FData.password}
        onChangeText={(text) => setFData({...FData, password: text})}
        onBlur={() => {
          setFieldValid({ ...fieldValid, password: FData.password !== "" & FData.password.length >= 5});
        }}
         style={styles.input} placeholder='Enter Your password'/>
        <TouchableWithoutFeedback onPress={togglePasswordVisibility}>
        <Ionicons style={styles.iconEye} name={showPassword ? 'eye' : 'eye-off'} size={20} />
      </TouchableWithoutFeedback>
        <FontAwesomeIcon icon={faLock} style={styles.icon} />
      </View>
      {!fieldValid.password && <Text style={styles.textWrong}> Password must be at least 5 characters </Text>}

      <View style={styles.formgroup}>
        <TextInput secureTextEntry={!showPasswordC}
        value={FData.passwordC}
        onChangeText={(text) => setFData({...FData, passwordC: text})} 
        onBlur={() => {
          setFieldValid({ ...fieldValid, passwordC: FData.passwordC !== "" });
          setPasswordCValid(FData.password === FData.passwordC);
        }}
        style={styles.input} placeholder='Confirm Your password'/>
        <TouchableWithoutFeedback onPress={togglePasswordVisibilityC}>
        <Ionicons style={styles.iconEye} name={showPasswordC ? 'eye' : 'eye-off'} size={20} />
        </TouchableWithoutFeedback>
        <FontAwesomeIcon icon={faCheck} style={styles.icon} />
      </View>
      {!fieldValid.passwordC && <Text style={styles.textWrong}> confirm password is required </Text>}
      {!isPasswordCValid && <Text style={styles.textWrong}>Your Password not match</Text>}

   
      <TouchableOpacity onPress={handleRegister}>
       <Text style={styles.buttonStyle}>Sign Up</Text>
      </TouchableOpacity>  

      <View style={styles.dividerContainer}>
      <View style={styles.dividerLine} />
      <Text style={styles.dividerText}>or with social media</Text>
      <View style={styles.dividerLine} />
      </View>

      <View style={styles.buttonsStyle}>
      <View style={styles.buttonFacebook}>
      <TouchableOpacity onPress={() => { Linking.openURL('https://facebook.com') }}>
      <FontAwesomeIcon icon={faFacebookF} style={styles.iconsFacebook}/>
      </TouchableOpacity>
      </View>
      
      <View style={styles.buttonGoogle}>
      <TouchableOpacity onPress={() => { Linking.openURL('https://google.com') }}> 
      <FontAwesomeIcon icon={faGoogle} style={styles.iconsGoogle} />
      </TouchableOpacity>
      </View>
     
      <View style={styles.buttonTiwtter}>
      <TouchableOpacity onPress={() => { Linking.openURL('https://twitter.com') }}>
      <FontAwesomeIcon icon={faTwitter} style={styles.iconsTiwtter} />
      </TouchableOpacity>
      </View>
      </View>

      <Text style={styles.TextStyle4}> Have An Account?
      <Text onPress={()=>navigation.navigate('Login')}
       style={styles.link}> Log in your Account..</Text>
      </Text>
      </View>
  )
}

export default Signup;

const styles = StyleSheet.create({
  contanier:{
    marginTop: 55,
    height: "100%",
    width: "100%"
  },
  TextStyleHeader:{
    fontWeight:"500",
    color: Color.primary, 
    fontSize: 20,
    marginTop:10,
    marginBottom: 5,
    textAlign: "center",
    textTransform:"uppercase"
  },
  formgroup:{
    display:"flex",
    position:"relative",
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    position: 'absolute', // تحديد موقع الأيقونة بالنسبة لحقل النص
    color: Color.primary,
    marginHorizontal: 20, // المسافة من اليسار
    padding: 11,
  },
  iconEye:{
    position: 'absolute', // تحديد موقع الأيقونة بالنسبة لحقل النص
    marginHorizontal: 370, // المسافة من اليسار
  },

  input: {
    flex: 1, // استخدم flex لاستغلال المساحة المتاحة بالكامل لحقل النص
    borderBottomWidth: 1, // إضافة حدود لحقل النص
    paddingVertical: 10, // تضبيط المسافة الرأسية داخل حقل النص
    padding: 50,
    marginHorizontal: 10,
    borderRadius: 20,
    borderColor: Color.background,
    borderWidth: 2, // تحديد عرض الإطار 
  },
  
  TextStylePassword:{
    display: "flex",
    alignItems: "flex-end",
    marginHorizontal: 10,
    marginVertical: 20,
    marginBottom: 20,
  },

  buttonStyle:{
    padding: 20,
    marginTop: 20,
    marginBottom: 7,
    marginHorizontal: 10,
    backgroundColor: Color.primary,
    fontWeight: '300',
    fontSize: 20,
    textAlign:"center",
    color:"#fff",
    borderRadius: 30
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  dividerText: {
    flex: 1, // يأخذ المساحة المتاحة بشكل كامل
    textAlign: 'center', // توسيط النص
    color: "gray"
  },
  dividerLine: {
    flex: 0.7, // يأخذ المساحة المتاحة بشكل كامل
    borderBottomColor: 'black', // لون الخط
    borderBottomWidth: 0.5, // عرض الخط (بالنقاط)
  },
  buttonsStyle:{
    flexDirection: "row",
    marginBottom: 10,
    marginLeft: 115
 },
 buttonFacebook: {
  flexDirection: 'row', 
  alignItems: 'center', 
  backgroundColor: '#4d727e',
  borderRadius: 50,
  paddingVertical: 10, 
  paddingHorizontal: 20, 
  marginRight: 10,
},
iconsFacebook: {
  fontSize: 14,
  color: '#fff',
  marginRight: 3, 
},

buttonGoogle: {
    flexDirection: 'row',
    alignItems: 'center', 
    backgroundColor: Color.background,
    borderRadius: 50,
    paddingVertical: 10, 
    paddingHorizontal: 20, 
    marginRight: 10,
},
iconsGoogle: {
    fontSize: 14,
    color: '#fff',
    marginRight: 3, 
},

 buttonTiwtter: {
      flexDirection: 'row', 
      alignItems: 'center', 
      backgroundColor: '#7fc5ca',
      borderRadius: 50,
      paddingVertical: 10,
      paddingHorizontal: 20, 
      marginRight: 10,
 },
iconsTiwtter: {
      fontSize: 14,
      color: '#fff',
      marginRight: 3, 
},
TextStyle4:{
  marginHorizontal: 70,
  marginVertical: 14,
  marginTop:1,
},
link:{
  color: Color.primary,
  fontWeight: "bold"
},
textWrong:{
   color: "#ff847c",
   marginLeft: 10,
}
})