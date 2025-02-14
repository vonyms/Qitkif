import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useEffect, useState} from 'react';
import {
  Appearance,
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {base_url} from '../helpers/url';
import {useRoute} from '@react-navigation/native';
import {colors} from '../helpers/colors';
const windowForScroller = Dimensions.get('window').height;
const modeApp = Appearance.getColorScheme();
function TrouverLivreur(): JSX.Element {
  const [text, setText] = useState('');
  const [data, setData] = useState([]);
  const route = useRoute();
  useEffect(() => {
    const getResult = async () => {
      try {
        const res = await fetch(
          base_url('AllControllers/getLivreur/' + route.params.id),
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              value: text,
            }),
          },
        );
        if (res.ok) {
          const resultatText = await res.text();
          const result = JSON.parse(resultatText);
          if (result.success) {
            setData(result.data);
          }
        }
      } catch (err) {}
    };
    getResult();
  }, [text]);

  return (
<View style={styles.container} accessible={true} accessibilityRole="none">
  <View style={styles.containerHeader} accessible={true} accessibilityRole="none">
    <Image
      source={require('../assets/icons/livreur(1).png')}
      resizeMode="cover"
      style={styles.imageReform}
      accessible={true}
      accessibilityRole="image"
      accessibilityLabel="Icône de livreur"
    />
    <Text accessibilityRole="none">Trouver un livreur agréé Qitkif</Text>
    <View style={styles.barreRecherche} accessible={true} accessibilityRole="none">
      <TextInput
        placeholder="Rechercher"
        onChangeText={text => {
          setText(text);
        }}
        style={styles.input}
        accessibilityLabel="Barre de recherche"
        accessibilityHint="Tapez pour rechercher un livreur"
      />
      <FontAwesomeIcon icon={faMagnifyingGlass} accessible={true} accessibilityRole="image" accessibilityLabel="Icône de recherche" />
    </View>
  </View>
  <ScrollView style={styles.scrollerview}>
    {text === '' ? (
      <View style={styles.centeredMessageContainer} accessible={true} accessibilityRole="none">
        <Text style={styles.centeredMessageText} accessibilityRole="none">
          Commencez votre recherche pour voir les résultats ici
        </Text>
      </View>
    ) : (
      <>
        {data.length === 0 ? (
          <View style={styles.centeredMessageContainer} accessible={true} accessibilityRole="none">
            <Text style={styles.centeredMessageText} accessibilityRole="none">
              Aucun résultat trouvé pour votre recherche
            </Text>
          </View>
        ) : (
          data.map((item, index) => (
            <View key={index} style={styles.listForScroller} accessible={true} accessibilityRole="none">
              <View style={styles.imageForListForScroller} accessible={true} accessibilityRole="none">
                <Image
                  style={styles.imageForListForScroller}
                  source={require('../assets/img/avatar.png')}
                  accessible={true}
                  accessibilityRole="image"
                  accessibilityLabel="Image de profil de livreur"
                />
              </View>
              <View accessible={true} accessibilityRole="none">
                <Text style={styles.username} accessibilityRole="none">
                  {item.pseudo}
                </Text>
                <Text accessibilityRole="none">
                  {item.lastname} {item.firstname}
                </Text>
                <Text style={styles.username} accessibilityRole="none">
                  {item.zone_intervention}
                </Text>
                <Text style={styles.username} accessibilityRole="none">
                  +225 {item.num_telephone}
                </Text>
              </View>
            </View>
          ))
        )}
      </>
    )}
  </ScrollView>
</View>

  );
}
const styles = StyleSheet.create({
  container: {
    paddingRight: 10,
    paddingLeft: 10,
    flex: 1,
    backgroundColor: modeApp === 'dark' ? colors.dark : colors.light,
  },
  containerHeader: {
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textHeader: {
    fontSize: 12,
  },
  imageReform: {
    width: 35,
    height: 35,
  },
  barreRecherche: {
    marginTop: 10,
    width: '100%',
    paddingLeft: 10,
    height: 40,
    borderColor: '#0275d8',
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: '90%',
  },
  scrollerview: {
    marginTop: 10,
    height: windowForScroller - 200,
  },
  listForScroller: {
    width: '100%',
    height: 75,
    marginBottom: 10,
    flexDirection: 'row',
  },
  imageForListForScroller: {
    width: 40,
    height: 40,
    borderRadius: 200,
  },
  username: {
    fontWeight: 'bold',
  },
  centeredMessageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredMessageText: {
    color: colors.gray,
    textAlign: 'center',
  },
});
export default TrouverLivreur;
