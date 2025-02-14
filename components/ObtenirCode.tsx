import React, {useEffect, useState} from 'react';
import {
  Alert,
  Appearance,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {base_url} from '../helpers/url';
import {useRoute} from '@react-navigation/native';
import Clipboard from '@react-native-clipboard/clipboard';
import {ScrollView} from 'react-native-gesture-handler';
import {colors} from '../helpers/colors';
const modeApp = Appearance.getColorScheme();
function ObtenirCode({navigation}): JSX.Element {
  const [code, setCode] = useState('');
  const route = useRoute();
  const copyToClipBoard = () => {
    Clipboard.setString(code);
    const textCode = code;
    Alert.alert('Succès', 'Le code est copié avec succès !');
  };

  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          base_url('AllControllers/getOnlyCode/' + route.params.id),
        );

        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    // Set up interval to fetch data every second
    const intervalId = setInterval(() => {
      fetchData();
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);
  return (
<ScrollView style={styles.scroll} accessible={true} accessibilityRole="none">
  <View style={styles.container} accessible={true} accessibilityRole="none">
    {data.map((item, index) => (
      <View key={index} style={styles.container_code} accessible={true} accessibilityRole="none">
        <Text style={styles.the_code} accessibilityRole="none">
          {item.code}
        </Text>
        <Text style={styles.messages} accessibilityRole="none">
          {item.messages}
        </Text>
      </View>
    ))}
  </View>
</ScrollView>

    
  );
}
const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: modeApp === 'dark' ? colors.dark : colors.light,
  },
  container: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  container_code: {
    marginTop: 5,
    padding: 10,
    backgroundColor: '#dedede',
  },
  the_code: {
    fontSize: 20,
    fontWeight: 'bold',
    color: modeApp === 'dark' ? colors.dark : colors.light,
  },
  messages: {
    fontSize: 15,
    color: modeApp === 'dark' ? colors.dark : colors.light,
  },
  container1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
    width: 35,
    height: 35,
  },
  colorBlue: {
    color: '#0275d8',
    fontSize: 12,
  },
});
export default ObtenirCode;
