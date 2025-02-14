import {faArrowAltCircleRight} from '@fortawesome/free-regular-svg-icons/faArrowAltCircleRight';
import {faArrowAltCircleUp} from '@fortawesome/free-solid-svg-icons';
import {faArrowAltCircleDown} from '@fortawesome/free-solid-svg-icons/faArrowAltCircleDown';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Dimensions,
  Image,
  Share,
  Alert,
  Appearance,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Encours from '../pages/encours';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {axiosConfig} from '../helpers/util';
import {base_url} from '../helpers/url';
import {colors} from '../helpers/colors';
const modeApp = Appearance.getColorScheme();
const windowHeight = Dimensions.get('window').height;

const MONEY_CURRENCY = 'FCFA';
function Home({navigation}): JSX.Element {
  const [totalVente, setTotalVente] = useState(0);
  const [totalAchat, setTotalAchat] = useState(0);
  const [seePartager, setSeePartager] = useState(false);
  const [totalNotif, setTotalNotif] = useState(0);
  const idUser = useSelector(state => state.logged.id);
  const goToScreen = val => {
    if (val == 'Parrainer') {
      navigation.navigate(val, {id: idUser});
    } else {
      navigation.navigate(val);
    }
  };
  const [data, setData] = useState(null);

  // const loadViewPartager = () => {
  //   setSeePartager(true);
  // };

  // Test partage package react native share built-in:
  const loadViewPartager = async () => {
    try {
      const result = await Share.share({
        message:
          'https://play.google.com/store/apps/details?id=com.packagenirinfo.qitkif2&hl=fr',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.messsage);
    }
  };

  const open_close = () => {
    if (seePartager) {
      setSeePartager(false);
    } else {
      setSeePartager(true);
    }
  };
  const fetchNotification = async () => {
    // console.log(base_url('AllControllers/getNotificationNotRead/' + idUser));
    try {
      const response = await fetch(
        base_url('AllControllers/getNotificationNotRead/' + idUser),
      );
      const jsonData = await response.json();

      // console.log(jsonData);

      setTotalNotif(jsonData[0]);
      // console.log(jsonData) ;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // useEffect(() => {
  useEffect(() => {
    // Fetch data initially
    fetchData();

    // Set up interval to fetch data every second
    const intervalId = setInterval(() => {
      fetchData();
      fetchNotification();
      // console.log(modeApp);
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [idUser]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        base_url('AllControllers/getEtatUserPaiement/' + idUser),
      );
      const jsonData = await response.json();
      setTotalVente(jsonData[1]);
      setTotalAchat(jsonData[0]);
      // console.log(jsonData) ;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();

  // }, [navigation]);

  return (
<View accessible={true} accessibilityRole="none" accessibilityLabel="Main container" style={styles.masterContainer}>
    <View style={styles.container}>
    <View style={styles.subContainer1}>
      <Pressable 
        style={[styles.btnMenu, styles.color1]} 
        accessibilityRole="button" 
        accessibilityLabel="Vos ventes" 
        accessibilityHint="Accédez à vos ventes pour voir vos transactions">
        <Text style={styles.textInfoBtn}>Vos ventes</Text>
        <Text style={styles.textInfoBtn}>
          {totalVente} {MONEY_CURRENCY}
        </Text>
      </Pressable>
      <Pressable 
        style={[styles.btnMenu, styles.color2]} 
        accessibilityRole="button" 
        accessibilityLabel="Vos achats" 
        accessibilityHint="Accédez à vos achats pour voir vos transactions">
        <Text style={styles.textInfoBtn}>Vos achats</Text>
        <Text style={styles.textInfoBtn}>
          {totalAchat} {MONEY_CURRENCY}
        </Text>
      </Pressable>
    </View>
    <View style={styles.subContainer2}>
      <Text style={styles.textCenter} accessibilityRole="text" accessibilityLabel="Quoi de neuf ?">Quoi de neuf ?</Text>
    </View>
    <View style={styles.subContainer3}>
      <Pressable 
        onPress={() => {
          navigation.navigate('ChoixVendeur', {
            type: 'vente',
            tracer: true,
          });
        }} 
        style={[styles.btnMenuSection2, styles.radius, styles.btnVente]} 
        accessibilityRole="button" 
        accessibilityLabel="Vendre" 
        accessibilityHint="Accédez à la page pour vendre des articles">
        <FontAwesomeIcon icon={faArrowAltCircleUp} color="white" size={20} />
        <Text style={styles.textInfoBtnSection2}> Vendre</Text>
      </Pressable>
      <Pressable 
        onPress={() => {
          navigation.navigate('ChoixVendeur', { tracer: false });
        }} 
        style={[styles.btnMenuSection2, styles.radius, styles.btnAcheter]} 
        accessibilityRole="button" 
        accessibilityLabel="Acheter" 
        accessibilityHint="Accédez à la page pour acheter des articles">
        <FontAwesomeIcon icon={faArrowAltCircleDown} color="white" size={20} />
        <Text style={styles.textInfoBtnSection2}> Acheter</Text>
      </Pressable>
    </View>
    <View style={styles.subContainer4}>
      <Encours navigation={navigation} id={idUser} />
    </View>
  </View>

  {seePartager ? (
    <View style={styles.bottomMenuNew}>
      <Text 
        onPress={() => open_close()} 
        style={styles.fermer} 
        accessibilityRole="button" 
        accessibilityLabel="Fermer le menu" 
        accessibilityHint="Fermer le menu de partage">
        x
      </Text>
      <Pressable 
        style={styles.pressableMenuNew} 
        accessibilityRole="button" 
        accessibilityLabel="Messenger" 
        accessibilityHint="Accédez à Messenger pour discuter">
        <Image 
          source={require('../assets/social/messager.png')} 
          style={styles.reformImage} 
          resizeMode="cover" />
        <Text style={styles.textMenu}>Messenger</Text>
      </Pressable>
      <Pressable 
        style={styles.pressableMenuNew} 
        accessibilityRole="button" 
        accessibilityLabel="Facebook" 
        accessibilityHint="Accédez à Facebook pour discuter avec vos amis">
        <Image 
          source={require('../assets/social/facebook.png')} 
          style={styles.reformImage} 
          resizeMode="cover" />
        <Text style={styles.textMenu}>Facebook</Text>
      </Pressable>
      <Pressable 
        style={styles.pressableMenuNew} 
        accessibilityRole="button" 
        accessibilityLabel="Instagram" 
        accessibilityHint="Accédez à Instagram pour partager des photos">
        <Image 
          source={require('../assets/social/instagram.png')} 
          style={styles.reformImage} 
          resizeMode="cover" />
        <Text style={styles.textMenu}>Instagram</Text>
      </Pressable>
      <Pressable 
        style={styles.pressableMenuNew} 
        accessibilityRole="button" 
        accessibilityLabel="LinkedIn" 
        accessibilityHint="Accédez à LinkedIn pour voir votre réseau professionnel">
        <Image 
          source={require('../assets/social/linkedin.png')} 
          style={styles.reformImage} 
          resizeMode="cover" />
        <Text style={styles.textMenu}>Linkedin</Text>
      </Pressable>
      <Pressable 
        style={styles.pressableMenuNew} 
        accessibilityRole="button" 
        accessibilityLabel="WhatsApp" 
        accessibilityHint="Accédez à WhatsApp pour discuter avec vos contacts">
        <Image 
          source={require('../assets/social/whatsapp.png')} 
          style={styles.reformImage} 
          resizeMode="cover" />
        <Text style={styles.textMenu}>Whatsapp</Text>
      </Pressable>
      <Pressable 
        style={styles.pressableMenuNew} 
        accessibilityRole="button" 
        accessibilityLabel="Message" 
        accessibilityHint="Accédez à l'application de messagerie">
        <Image 
          source={require('../assets/social/messages.png')} 
          style={styles.reformImage} 
          resizeMode="cover" />
        <Text style={styles.textMenu}>Message</Text>
      </Pressable>
      <Pressable 
        style={styles.pressableMenuNew} 
        accessibilityRole="button" 
        accessibilityLabel="Gmail" 
        accessibilityHint="Accédez à votre boîte Gmail">
        <Image 
          source={require('../assets/social/gmail.png')} 
          style={styles.reformImage} 
          resizeMode="cover" />
        <Text style={styles.textMenu}>Gmail</Text>
      </Pressable>
      <Pressable 
        style={styles.pressableMenuNew} 
        accessibilityRole="button" 
        accessibilityLabel="Lien" 
        accessibilityHint="Accédez à un lien partagé">
        <Image 
          source={require('../assets/social/lien.png')} 
          style={styles.reformImage} 
          resizeMode="cover" />
        <Text style={styles.textMenu}>Lien</Text>
      </Pressable>
    </View>
  ) : (
    <View style={styles.bottomMenu}>
      <Pressable 
        style={styles.pressableMenu} 
        onPress={() => goToScreen('Parrainer')} 
        accessibilityRole="button" 
        accessibilityLabel="Parrainer" 
        accessibilityHint="Accédez à la page pour parrainer un ami">
        <Image 
          source={require('../assets/icons/cadeau.png')} 
          style={styles.reformImage} 
          resizeMode="cover" />
        <Text style={styles.textMenu}>Parrainer</Text>
      </Pressable>
      <Pressable 
        style={styles.pressableMenu} 
        onPress={() => navigation.navigate('ServiceClient')} 
        accessibilityRole="button" 
        accessibilityLabel="Nous contacter" 
        accessibilityHint="Accédez à la page de service client">
        <Image 
          source={require('../assets/icons/bavardage.png')} 
          style={styles.reformImage} 
          resizeMode="cover" />
        <Text style={styles.textMenu}>Nous contacter</Text>
      </Pressable>
      <Pressable 
        style={styles.pressableMenu} 
        onPress={() => navigation.navigate('NotificationList', {id: idUser})} 
        accessibilityRole="button" 
        accessibilityLabel="Notifications" 
        accessibilityHint="Accédez à vos notifications">
        <Image 
          source={require('../assets/icons/cloche.png')} 
          style={styles.reformImage} 
          resizeMode="cover" />
        {totalNotif > 0 && (
          <View style={styles.boribory}>
            <Text style={styles.notification_contenu_boribory}>{totalNotif}</Text>
          </View>
        )}
        <Text style={styles.textMenu}>Notifications</Text>
      </Pressable>
      <Pressable 
        style={styles.pressableMenu} 
        onPress={() => loadViewPartager()} 
        accessibilityRole="button" 
        accessibilityLabel="Partager" 
        accessibilityHint="Accédez à la page de partage">
        <Image 
          source={require('../assets/icons/partage.png')} 
          style={styles.reformImage} 
          resizeMode="cover" />
        <Text style={styles.textMenu}>Partager</Text>
      </Pressable>
    </View>
  )}
</View>

  );
}

const styles = StyleSheet.create({
  masterContainer: {
    backgroundColor: modeApp === 'dark' ? colors.dark : colors.light,
  },
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: modeApp === 'dark' ? colors.dark : colors.light,
  },
  subContainer1: {
    width: '100%',
    marginTop: 10,
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subContainer2: {
    height: 25,
  },
  subContainer3: {
    height: 50,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textCenter: {
    margin: 2,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 13,
    color: modeApp === 'dark' ? colors.dark : colors.light,
  },
  btnMenu: {
    width: '48%',
    height: 60,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 3,
    backgroundColor: modeApp === 'dark' ? colors.light : colors.light,
  },
  btnMenuSection2: {
    width: '48%',
    height: 50,
    // borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  color1: {
    borderColor: '#42df42',
  },
  color2: {
    borderColor: '#0275d8',
  },
  textInfoBtn: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
    color: modeApp === 'dark' ? colors.dark : colors.dark,
  },
  textInfoBtnSection2: {
    borderRadius: 15,
    fontSize: 17,
    color: 'white',
  },
  radius: {
    borderRadius: 5,
  },
  bottomMenu: {
    height: 65,
    paddingLeft: 20,
    paddingRight: 20,
    bottom: -(windowHeight - (windowHeight - 75) - 64),
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
    alignItems: 'center',
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    position: 'relative',
    flexDirection: 'row',
    backgroundColor: modeApp === 'dark' ? colors.dark : colors.light,
  },
  bottomMenuNew: {
    padding: 20,
    height: 180,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: 'white',
    bottom: -(windowHeight - (windowHeight - 75) - 150),
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    alignItems: 'center',
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    position: 'relative',
    flexDirection: 'row',
  },
  fermer: {
    fontSize: 20,
    position: 'absolute',
    right: 20,
    color: 'red',
    top: 0,
  },
  reformImage: {
    width: 35,
    height: 35,
  },
  textMenu: {
    fontSize: 10,
    textAlign: 'center',
    width: 70,
    fontWeight: 'bold',
  },
  pressableMenu: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 65,
  },
  pressableMenuNew: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 85,
    height: 65,
  },
  subContainer4: {
    marginTop: 10,
    height: windowHeight - 310,
    borderColor: '#dddddd',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'white',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  btnVente: {
    backgroundColor: '#42df42',
  },
  btnAcheter: {
    backgroundColor: colors.primary,
  },
  boribory: {
    width: 20,
    height: 20,
    backgroundColor: 'red',
    borderRadius: 100,
    position: 'absolute',
    bottom: 20,
    right: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notification_contenu_boribory: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default Home;
