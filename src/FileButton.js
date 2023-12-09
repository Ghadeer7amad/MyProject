import {View, Image, Button, Platform , TouchableOpacity , Text} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {useState} from 'react';
import Color from './Common/Color';


const FileButton = ({setData}) => {
  const [photo, setPhoto] = useState(null);

  const handleChoosePhoto = async () => {
  const a = await  launchImageLibrary({noData: true}, response => {
      if (response) {
        setData(response.assets[0]);
        setPhoto(response.assets[0])
      }
    });
  };


  return (
    <View>
      {photo && (
        <>
          <Image
            source={{uri: photo.uri}}
            style={{width: 335, height: 200, margin: 20, borderRadius: 10 , marginLeft: 15}}
          />
        </>
      )}
      <TouchableOpacity
       style= { {width: 360 , borderRadius: 10 , backgroundColor: Color.background , paddingVertical: 10, }}
        onPress={handleChoosePhoto}
      ><Text  style= { { color : Color.secondary , fontWeight: '500' , fontSize: 17, textAlign: 'center'}}>Choose Photo</Text></TouchableOpacity>
    </View>
  );
};

export default FileButton;
