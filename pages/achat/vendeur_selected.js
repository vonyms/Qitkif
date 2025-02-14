/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Appearance,
} from 'react-native';
import {colors} from '../../helpers/colors';
import {boxShadow} from '../../helpers/box_shadow';
import Header from './header';
import {public_url} from '../../helpers/url';
import {connect} from 'react-redux';
import {styles} from '../../helpers/styles';
import {Button} from '../../elements';

const colorScheme = Appearance.getColorScheme();

class VendeurSelected extends Component {
  render() {
    return (
<View style={styles.wrapper}>
  <Header progress={1} navigation={this.props.navigation} />

  <View style={[_styles.banner, boxShadow.depth_2]}>
    <Image
      source={
        this.props.achat.user.photo
          ? { uri: public_url('images/profils/' + this.props.achat.user.photo) }
          : { uri: public_url('images/avatar.png') }
      }
      style={_styles.photo}
      accessible={true}
      accessibilityLabel={`Photo de profil de ${this.props.achat.user.pseudo}`}
    />
    
    <Text style={_styles.banner_title} accessibilityLabel={`Nom d'utilisateur : ${this.props.achat.user.pseudo}`}>
      {this.props.achat.user.pseudo}
    </Text>
    
    <Text style={_styles.banner_description} accessibilityLabel="Utilisateur vérifié">
      Profil vérifié
    </Text>

    <View style={_styles.avis_container}>
      <Text style={styles.text} accessibilityLabel={`Nombre d'achats et de ventes : ${this.props.achat.user.nbre_achat} ventes, ${this.props.achat.user.nbre_vente} achats`}>
        {this.props.achat.user.nbre_achat} ventes / {this.props.achat.user.nbre_vente} achat
      </Text>
      <Text style={styles.text} accessibilityLabel={`Nombre d'avis : ${this.props.achat.user.nbre_avis} avis`}>
        {this.props.achat.user.nbre_avis} Avis
      </Text>
    </View>

    <TouchableOpacity
      onPress={() =>
        this.props.navigation.navigate('Profil', {
          me: false,
          id: this.props.achat.user.id,
        })
      }
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={`Voir le profil complet de ${this.props.achat.user.pseudo}`}
      accessibilityHint="Appuyez pour voir le profil complet de cet utilisateur"
    >
      <Text style={_styles.profil_link}>Profil complet</Text>
    </TouchableOpacity>
  </View>

  <View style={_styles.main_container}>
    <Button
      title="Suivant"
      bg={colors.primary}
      onPress={() => this.submit()}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel="Passer à l'étape suivante"
      accessibilityHint="Appuyez pour soumettre et passer à l'étape suivante"
    />
  </View>
</View>

    );
  }
  submit() {
    this.props.navigation.navigate('QuestionAchat', {
      type: this.props.route.params.type,
    });
  }
}

const _styles = StyleSheet.create({
  banner: {
    marginHorizontal: 20,
    marginTop: -75,
    backgroundColor: colorScheme === 'dark' ? colors.black : '#FFF',
    minHeight: 150,
    borderRadius: 20,
    alignItems: 'center',
  },
  photo: {
    width: 70,
    height: 70,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: colors.gray,
    marginTop: -35,
    marginBottom: 10,
  },
  banner_title: {
    fontSize: 18,
    fontFamily: 'Feather',
    color: colors.primary,
  },
  banner_description: {
    fontSize: 16,
    fontFamily: 'Feather',
    color: colors.gray,
    textAlign: 'center',
  },
  avis_container: {
    alignItems: 'center',
    marginTop: 10,
    borderBottomColor: colors.gray,
    width: '100%',
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  profil_link: {
    textAlign: 'center',
    fontFamily: 'Feather',
    fontSize: 16,
    color: colors.primary,
    paddingVertical: 5,
  },
  main_container: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
});
const mapStateToProps = state => {
  const {achat} = state;
  return {achat};
};
export default connect(mapStateToProps)(VendeurSelected);
