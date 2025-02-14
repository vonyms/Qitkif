import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  Alert,
  Clipboar,
  Appearance,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Toast from 'react-native-toast-message';
import {base_url} from '../helpers/url';
import {useRoute} from '@react-navigation/native';
import Clipboard from '@react-native-clipboard/clipboard';
import {colors} from '../helpers/colors';
const modeApp = Appearance.getColorScheme();
function Parrainer({navigation}): JSX.Element {
  const route = useRoute();
  const [code, setCode] = useState('');
  const idUser = route.params.id;
  const copyToClipBoard = () => {
    Clipboard.setString(code);
    const textCode = code;
    Alert.alert('Succès', 'Le code est copié avec succès !');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          base_url('AllControllers/getCodeParrainer/' + idUser),
        );
        const jsonData = await response.json();
        setCode(jsonData[0]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
<View style={styles.container} accessible={true} accessibilityRole="none">
  <View style={styles.container1} accessible={true} accessibilityRole="none">
    <Image
      style={styles.reformImage}
      source={require('../assets/icons/cadeau.png')}
      resizeMode="cover"
      accessible={true}
      accessibilityRole="none"
      accessibilityLabel="Icône de cadeau" // Optional: Describes the image for screen readers
    />
    <Text style={styles.colorBlue} accessibilityRole="none">
      Code de parrainage
    </Text>
  </View>
  <View style={styles.container2} accessible={true} accessibilityRole="none">
    <Pressable 
      style={styles.codeContainer}
      accessibilityRole="button"
      accessibilityLabel="Code de parrainage"
      accessibilityHint="Appuyez pour voir le code de parrainage"
    >
      <Text style={styles.textColorBlue}>{code}</Text>
    </Pressable>
    <Pressable
      onPress={() => {
        copyToClipBoard();
      }}
      style={styles.btn}
      accessibilityRole="button"
      accessibilityLabel="Copier le code de parrainage"
      accessibilityHint="Appuyez pour copier votre code de parrainage"
    >
      <Text style={styles.btnTxt}>COPIER MON CODE</Text>
    </Pressable>
  </View>
</View>

  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10,
    flex: 1,
    backgroundColor: modeApp === 'dark' ? colors.dark : colors.light,
  },
  container1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  container2: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  codeContainer: {
    width: 100,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#0275d8',
    borderRadius: 10,
  },
  textColorBlue: {
    color: '#0275d8',
    fontSize: 20,
  },
  btn: {
    backgroundColor: '#0275d8',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 15,
    borderRadius: 10,
  },
  btnTxt: {
    color: 'white',
  },
  reformImage: {
    width: 25,
    height: 25,
  },
  colorBlue: {
    color: '#0275d8',
    fontSize: 12,
  },
});

export default Parrainer;
