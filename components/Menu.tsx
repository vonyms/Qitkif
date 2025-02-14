import React, {useEffect, useState} from 'react';
import {
  Appearance,
  Button,
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {api_url, base_url} from '../helpers/url';
import axios from 'axios';
import {useRoute} from '@react-navigation/native';
import {colors} from '../helpers/colors';
const maxHeight = Dimensions.get('window').height;
const MONEY_CURRENCY = 'FCFA';
const modeApp = Appearance.getColorScheme();
function Menu({navigation}): JSX.Element {
  const route = useRoute();
  const [reductionPrice, setReductionPrice] = useState(0);
  const idUser = route.params.id;
  const monEtatRedux = useSelector(state => console.log(state)); // fangalana reducer

  const getReduction = async () => {
    try {
      const response = await fetch(
        base_url('AllControllers/getAllReducation/' + idUser),
      );
      const jsonData = await response.json();
      setReductionPrice(jsonData[0]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      getReduction();
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  });
  const doNavigation = (nav: string) => {
    switch (nav) {
      case 'TrouverLivreur':
        navigation.navigate('trouverLivreur', {id: idUser});
        break;
      case 'ServiceLivreur':
        navigation.navigate('serviceLivreur');
        break;
      case 'Accueil':
        navigation.navigate('Home');
        break;
      case 'compte':
        navigation.navigate('Profil', {me: true});
        break;
      case 'moyenPaiement':
        navigation.navigate('AddPaiement');
        break;
      case 'historiqueTransactions':
        navigation.navigate('Historique');
        break;
      case 'transactions':
        navigation.navigate('Encours', {id: idUser});
        break;
      case 'promotions':
        navigation.navigate('Promotion');
        break;
      case 'code':
        navigation.navigate('ObtenirCode', {id: idUser});
        break;
      case 'serviceClient':
        navigation.navigate('ServiceClient');
        break;
      case 'quitter':
        axios
          .get(base_url('logout'))
          .then(response => {
            if (response.data.success) {
              navigation.navigate('Welcome');
            }
          })
          .catch(error => {
            if (error.response.status === 403) {
              navigation.navigate('Welcome');
            }
          })
          .finally(() => {
            // this.setState({logoutLoading: false});
          });
        // navigation.navigate('Welcome');
        break;
    }
  };
  return (
<ScrollView style={styles.scroller} accessible={true} accessibilityRole="none">
  <View style={styles.reductionbox}>
    <Text style={styles.reductionText} accessibilityRole="text" accessibilityLabel="Réduction">Réduction</Text>
    <Text style={styles.money} accessibilityRole="text" accessibilityLabel={`Réduction montant: ${reductionPrice} ${MONEY_CURRENCY}`}>
      {reductionPrice} {MONEY_CURRENCY}
    </Text>
    <Pressable 
      style={styles.customBtn} 
      accessibilityRole="button" 
      accessibilityLabel="Obtenir plus de réduction" 
      accessibilityHint="Accédez à la page pour obtenir plus d'offres de réduction">
      <Text style={styles.customBtnText}>Obtenir plus</Text>
    </Pressable>
  </View>

  <TouchableOpacity
    onPress={() => {
      doNavigation('Accueil');
    }}
    style={styles.container}
    accessibilityRole="button"
    accessibilityLabel="Accueil"
    accessibilityHint="Accédez à la page d'accueil">
    <Image
      style={styles.image}
      resizeMode="contain"
      source={require('../assets/icons/bouton-daccueil.png')}
    />
    <Text style={styles.textContainer}>{'  '}Accueil</Text>
  </TouchableOpacity>

  <TouchableOpacity
    onPress={() => {
      doNavigation('compte');
    }}
    style={styles.container}
    accessibilityRole="button"
    accessibilityLabel="Mon compte"
    accessibilityHint="Accédez à la page de votre compte">
    <Image
      style={styles.image}
      resizeMode="contain"
      source={require('../assets/icons/compte.png')}
    />
    <Text style={styles.textContainer}>{'  '}Mon compte</Text>
  </TouchableOpacity>

  <TouchableOpacity
    onPress={() => {
      doNavigation('moyenPaiement');
    }}
    style={styles.container}
    accessibilityRole="button"
    accessibilityLabel="Moyens de paiements"
    accessibilityHint="Accédez à la page des moyens de paiements">
    <Image
      style={styles.image}
      resizeMode="contain"
      source={require('../assets/icons/paiement-securise.png')}
    />
    <Text style={styles.textContainer}>{'  '}Moyen de paiements</Text>
  </TouchableOpacity>

  <TouchableOpacity
    onPress={() => {
      doNavigation('historiqueTransactions');
    }}
    style={styles.container}
    accessibilityRole="button"
    accessibilityLabel="Historique des transactions"
    accessibilityHint="Accédez à l'historique de vos transactions">
    <Image
      style={styles.image}
      resizeMode="contain"
      source={require('../assets/icons/transfert-dargent.png')}
    />
    <Text style={styles.textContainer}>
      {'  '}Historique des transactions
    </Text>
  </TouchableOpacity>

  <TouchableOpacity
    onPress={() => {
      doNavigation('transactions');
    }}
    style={styles.container}
    accessibilityRole="button"
    accessibilityLabel="Transactions"
    accessibilityHint="Accédez à vos transactions récentes">
    <Image
      style={styles.image}
      resizeMode="contain"
      source={require('../assets/icons/transaction.png')}
    />
    <Text style={styles.textContainer}>{'  '}Transactions</Text>
  </TouchableOpacity>

  <TouchableOpacity
    onPress={() => {
      doNavigation('promotions');
    }}
    style={styles.container}
    accessibilityRole="button"
    accessibilityLabel="Promotions et infos"
    accessibilityHint="Accédez aux promotions et aux informations sur les offres">
    <Image
      style={styles.image}
      resizeMode="contain"
      source={require('../assets/icons/promotion.png')}
    />
    <Text style={styles.textContainer}>{'  '}Promotions et infos</Text>
  </TouchableOpacity>

  <TouchableOpacity
    onPress={() => {
      doNavigation('TrouverLivreur');
    }}
    style={styles.container}
    accessibilityRole="button"
    accessibilityLabel="Trouver un livreur"
    accessibilityHint="Accédez à la page pour trouver un livreur">
    <Image
      style={styles.image}
      resizeMode="contain"
      source={require('../assets/icons/livreur(1).png')}
    />
    <Text style={styles.textContainer}>{'  '}Trouver un livreur</Text>
  </TouchableOpacity>

  <TouchableOpacity
    onPress={() => {
      doNavigation('ServiceLivreur');
    }}
    style={styles.container}
    accessibilityRole="button"
    accessibilityLabel="Service livreur"
    accessibilityHint="Accédez à la page du service livreur">
    <Image
      style={styles.image}
      resizeMode="contain"
      source={require('../assets/icons/livreur.png')}
    />
    <Text style={styles.textContainer}>{'  '}Service livreur</Text>
  </TouchableOpacity>

  <TouchableOpacity
    onPress={() => {
      doNavigation('serviceClient');
    }}
    style={styles.container}
    accessibilityRole="button"
    accessibilityLabel="Service client"
    accessibilityHint="Accédez à la page du service client">
    <Image
      style={styles.image}
      resizeMode="contain"
      source={require('../assets/icons/service-client.png')}
    />
    <Text style={styles.textContainer}>{'  '}Service client</Text>
  </TouchableOpacity>

  <TouchableOpacity
    onPress={() => {
      doNavigation('quitter');
    }}
    style={styles.container}
    accessibilityRole="button"
    accessibilityLabel="Quitter"
    accessibilityHint="Quitter l'application ou la session en cours">
    <Image
      style={styles.image}
      resizeMode="contain"
      source={require('../assets/icons/bouton-fermer.png')}
    />
    <Text style={styles.textContainer}>{'  '}Quitter</Text>
  </TouchableOpacity>
</ScrollView>


  );
}

const styles = StyleSheet.create({
  scroller: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 2,
    height: maxHeight - 30,
    backgroundColor: modeApp === 'dark' ? colors.dark : colors.light,
  },
  container: {
    flexDirection: 'row',
    marginTop: 2,
    marginBottom: 2,
    height: 60,
    borderRadius: 5,
    padding: 5,
    // backgroundColor: 'white',
    alignItems: 'center',
    backgroundColor: modeApp === 'dark' ? colors.dark : colors.light,
  },
  textContainer: {
    fontSize: 18,
  },
  image: {
    width: 30,
    height: 30,
  },
  reductionbox: {
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    height: 150,
    borderWidth: 1,
    borderColor: '#0275d8',
  },
  reductionText: {
    fontSize: 17,
  },
  money: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  customBtn: {
    backgroundColor: '#42df42',
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 18,
  },
  customBtnText: {
    color: 'white',
  },
});

export default Menu;
