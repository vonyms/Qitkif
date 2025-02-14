/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  ToastAndroid,
  Appearance,
  ScrollView,
} from 'react-native';
import {colors} from '../../helpers/colors';
import {boxShadow} from '../../helpers/box_shadow';
import Header from './header';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import axios from 'axios';
import {base_url} from '../../helpers/url';
import {styles} from '../../helpers/styles';
import {getStars, longDate, price, sendNotification} from '../../helpers/util';
import {Button} from '../../elements';

const colorScheme = Appearance.getColorScheme();

class DetailAchat extends Component {
  state = {
    loading: false,
    loadingInfo: true,
    stars: [],
    frais: 0,
    pay: 0,
    receive: 0,
  };
  render() {
    return (
<ScrollView style={styles.wrapper} accessible={true}>
  <View style={styles.wrapper}>
    <Header progress={4} navigation={this.props.navigation} />
    
    <View style={[_styles.banner, boxShadow.depth_2]}>
      <Image
        source={require('../../assets/img/avatar.png')}
        style={_styles.photo}
        accessible={true}
        accessibilityRole="image"
        accessibilityLabel="Image de profil"
      />
      
      <View style={_styles.star_container} accessible={true} accessibilityLabel="Évaluation par étoiles">
        {this.state.stars.map(star => {
          return (
            <FontAwesome
              name={star.name}
              color={star.color}
              size={24}
              style={{marginRight: 5}}
              key={star.id}
              accessible={true}
              accessibilityLabel={`Étoile ${star.name}`}
            />
          );
        })}
      </View>
      
      <Text style={_styles.pseudo} accessibilityRole="text" accessibilityLabel="Message de proposition">
        vous souhaiterez{' '}
        {this.props.route.params.type === 'vente' ? 'vendre' : 'acheter'}
        {' à '}
        {this.props.achat.user.pseudo}
      </Text>
      
      <Text style={[styles.text, _styles.article_name_modal]} accessibilityRole="text" accessibilityLabel="Nom de l'objet">
        {this.props.achat.nomObjet.toUpperCase()}
      </Text>
      
      <Text style={_styles.article_prix} accessibilityRole="text" accessibilityLabel="Prix de l'objet">
        {price(this.props.achat.montant)} FCFA
      </Text>
      
      <View style={_styles.info_container}>
        <Text style={[styles.text, _styles.info_text]} accessibilityRole="text">Envoyer le :</Text>
        <Text style={[styles.text, _styles.info_text]}>{longDate(new Date())}</Text>
      </View>
      
      <View style={_styles.info_container}>
        <Text style={[styles.text, _styles.info_text]} accessibilityRole="text">Catégorie :</Text>
        <Text style={[styles.text, _styles.info_text]}>{this.props.achat.categorie.nom}</Text>
      </View>
      
      <View style={_styles.info_container}>
        <Text style={[styles.text, _styles.info_text]} accessibilityRole="text">Paiement :</Text>
        <Text style={[styles.text, _styles.info_text]}>{this.props.achat.user.phone}</Text>
      </View>
      
      <View style={_styles.info_container}>
        <Text style={[styles.text, _styles.info_text]} accessibilityRole="text">Mode de remise :</Text>
        <Text style={[styles.text, _styles.info_text]}>{this.props.achat.remise}</Text>
      </View>
      
      <View style={[_styles.info_container, {marginTop: 20}]}>
        <Text style={[styles.text, _styles.info_text]} accessibilityRole="text">Montant :</Text>
        <Text style={[styles.text, _styles.info_text]}>{price(this.props.achat.montant)} FCFA</Text>
      </View>
    </View>
    
    <View style={[styles.wrapper, _styles.main_container]}>
      <View style={_styles.info_paiement_container}>
        <Text style={[styles.text, _styles.info_paiement_title]} accessibilityRole="header" accessibilityLabel="Information sur le paiement">
          Information sur le paiement :
        </Text>
        
        <View style={_styles.info_paiement_wrapper}>
          <Text style={styles.text} accessibilityRole="text">Frais de service :</Text>
          <Text style={styles.text} accessibilityRole="text">{this.showLoading('frais')}</Text>
        </View>
        
        <View style={_styles.info_paiement_wrapper}>
          <Text style={styles.text} accessibilityRole="text">
            {this.props.route.params.type === 'vente'
              ? "L'acheteur payera :"
              : 'Vous payerez :'}
          </Text>
          <Text style={styles.text}>{this.showLoading('pay')}</Text>
        </View>
        
        <View style={_styles.info_paiement_wrapper}>
          <Text style={styles.text} accessibilityRole="text">
            {this.props.route.params.type === 'vente'
              ? 'Vous recevrez :'
              : 'Le vendeur recevra :'}
          </Text>
          <Text style={styles.text}>{this.showLoading('receive')}</Text>
        </View>
      </View>
      
      <Button
        bg={colors.success}
        title="Envoyer ma proposition"
        loading={this.state.loading}
        onPress={() => this.submit()}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="Envoyer ma proposition"
        accessibilityHint="Appuyez pour envoyer votre proposition"
      />
    </View>
  </View>
</ScrollView>

    );
  }
  showLoading(field) {
    if (this.state.loadingInfo) {
      return <ActivityIndicator size="small" color={colors.primary} />;
    }
    if (field === 'frais') {
      return price(this.state.frais) + ' FCFA';
    } else if (field === 'pay') {
      return price(this.state.pay) + ' FCFA';
    }
    return price(this.state.receive) + ' FCFA';
  }
  submit() {
    this.setState({loading: true});
    let data = {
      id_vendeur: null,
      id_acheteur: null,
      montant: this.props.achat.montant,
      id_categorie: this.props.achat.categorie.id,
      nom_objet: this.props.achat.nomObjet,
      mode_remise: this.props.achat.remise,
      message: this.props.achat.message,
    };
    if (this.props.route.params.type === 'vente') {
      data.id_acheteur = this.props.achat.user.id;
    } else {
      data.id_vendeur = this.props.achat.user.id;
    }
    console.log(data);
    axios
      .post(base_url('offre/create/' + this.props.route.params.type), data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
      })
      .then(response => {
        console.log(response);
        if (response.data.success) {
          ToastAndroid.show('Demande envoyée', ToastAndroid.LONG);
          this.props.navigation.navigate('Home');
          // sendNotification(this.props.achat.user.id);
        } else {
        }
      })
      .catch(err => {
        console.log(err.response);
        if (err.response.status === 403) {
          this.props.navigation.navigate('Login1');
        }
      })
      .finally(() => {
        console.log('tsy nety ndrey !');
        this.setState({loading: false});
      });
  }
  componentDidMount() {
    this.setState({stars: getStars(this.props.achat.user)});
    axios
      .get(base_url('paiement/getConfig'))
      .then(res => {
        let commission =
          this.props.route.params.type === 'vente'
            ? res.data.commission_vendeur
            : res.data.commission_acheteur;
        let frais = Math.ceil((this.props.achat.montant * commission) / 100);
        let pay = 0;
        let receive = 0;
        if (this.props.route.params.type === 'vente') {
          pay =
            Number(this.props.achat.montant) +
            Math.ceil(
              (this.props.achat.montant * res.data.commission_acheteur) / 100,
            );
          receive =
            Number(this.props.achat.montant) -
            Math.ceil((this.props.achat.montant * commission) / 100);
        } else {
          pay =
            Number(this.props.achat.montant) +
            Math.ceil(
              (this.props.achat.montant * res.data.commission_vendeur) / 100,
            );
          receive =
            Number(this.props.achat.montant) -
            Math.ceil((this.props.achat.montant * commission) / 100);
        }
        this.setState({frais: frais, pay: pay, receive: receive});
      })
      .catch(err => {
        if (err.response.status === 403) {
          this.props.navigation.navigate('Login1');
        }
      })
      .finally(() => {
        this.setState({loadingInfo: false});
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
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  photo: {
    width: 60,
    height: 60,
    borderRadius: 60,
    position: 'absolute',
    top: -30,
    borderWidth: 1,
    borderColor: colors.gray,
  },
  star_container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
  },
  pseudo: {
    textAlign: 'center',
    fontFamily: 'Feather',
    fontSize: 17,
    color: colors.primary,
    marginTop: 10,
  },
  article_name_modal: {
    fontSize: 24,
    textAlign: 'center',
    marginTop: 10,
  },
  article_prix: {
    fontFamily: 'Feather',
    fontSize: 24,
    color: colors.primary,
    marginVertical: 10,
  },
  info_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  info_text: {
    fontSize: 17,
  },
  main_container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  info_paiement_container: {
    marginBottom: 15,
    position: 'relative',
  },
  info_paiement_title: {
    color: colors.primary,
    borderBottomColor: colors.gray,
    borderBottomWidth: 0.75,
    fontSize: 17,
    marginBottom: 10,
  },
  info_paiement_wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const mapStateToProps = state => {
  const {achat} = state;
  return {achat};
};

export default connect(mapStateToProps)(DetailAchat);
