/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Appearance,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import {Button} from '../../elements';
import {colors} from '../../helpers/colors';
import {
  axiosConfig,
  capitalize,
  price,
  sendNotification,
  state_offre,
} from '../../helpers/util';
import {styles} from '../../helpers/styles';
import Header from '../components/header';
import axios from 'axios';
import {base_url, public_url} from '../../helpers/url';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const colorScheme = Appearance.getColorScheme();

class WaitValidation extends Component {
  state = {
    data: this.props.route.params.data,
    loading: null,
    pay: 0,
    frais: 0,
    titleInfoPaiement: 'A payer :',
  };
  render() {
    return (
<View style={styles.wrapper}>
  {/* <Header
    title="Validation d'une offre"
    navigation={this.props.navigation}
  /> */}
  <ScrollView>
    <View style={_styles.wrapper}>
      <Image
        source={
          this.state.data.client.photo
            ? {
                uri: public_url('images/profils/' + this.state.data.client.photo),
              }
            : {uri: public_url('images/avatar.png')}
        }
        style={styles.photo_profil}
        accessible={true}
        accessibilityLabel="Photo de profil de l'utilisateur"
      />
      <Text
        style={[styles.text, {fontSize: 24}]}
        accessible={true}
        accessibilityLabel={`Pseudo de l'utilisateur: ${this.state.data.client.pseudo}`}
      >
        {this.state.data.client.pseudo}
      </Text>
      <Text
        style={[styles.text, {fontSize: 18, marginVertical: 15}]}
        accessible={true}
        accessibilityLabel={`Message: ${this.state.data.message}`}
      >
        {this.state.data.message}
      </Text>
      <Text
        style={_styles.title}
        accessible={true}
        accessibilityLabel={`Offre: ${this.state.data.offre.nom_objet.toUpperCase()}`}
      >
        {this.state.data.offre.nom_objet.toUpperCase()}
      </Text>
      {this.state.data.msg ? (
        <View style={{flexDirection: 'row', width: '100%'}}>
          <MaterialCommunityIcons
            name="comment-quote"
            size={36}
            accessible={true}
            accessibilityLabel="Citation"
          />
          <View style={{paddingHorizontal: 10, width: '98%'}}>
            <Text
              style={{fontSize: 15, fontStyle: 'italic'}}
              accessible={true}
              accessibilityLabel={`Message supplémentaire: ${this.state.data.msg}`}
            >
              {this.state.data.msg}
            </Text>
          </View>
        </View>
      ) : null}
      <View style={_styles.info_container}>
        <Text
          style={_styles.info_label}
          accessible={true}
          accessibilityLabel="Mode de remise"
        >
          Mode de remise :
        </Text>
        <Text
          style={_styles.info_value}
          accessible={true}
          accessibilityLabel={`Mode de remise: ${capitalize(this.state.data.offre.mode_remise)}`}
        >
          {capitalize(this.state.data.offre.mode_remise)}
        </Text>
      </View>
      <View style={_styles.info_container}>
        <Text
          style={_styles.info_label}
          accessible={true}
          accessibilityLabel="Montant"
        >
          Montant :
        </Text>
        <Text
          style={_styles.info_value}
          accessible={true}
          accessibilityLabel={`Montant: ${price(this.state.data.offre.montant)} FCFA`}
        >
          {price(this.state.data.offre.montant)} FCFA
        </Text>
      </View>
      <View style={_styles.info_container}>
        <Text
          style={_styles.info_label}
          accessible={true}
          accessibilityLabel="Frais de service"
        >
          Frais de service :
        </Text>
        <Text
          style={_styles.info_value}
          accessible={true}
          accessibilityLabel={`Frais de service: ${price(this.state.frais)} FCFA`}
        >
          {price(this.state.frais)} FCFA
        </Text>
      </View>
      <View style={_styles.info_container}>
        <Text
          style={_styles.info_label}
          accessible={true}
          accessibilityLabel={this.state.titleInfoPaiement}
        >
          {this.state.titleInfoPaiement}
        </Text>
        <Text
          style={_styles.info_value}
          accessible={true}
          accessibilityLabel={`Montant à recevoir: ${price(this.state.pay)} FCFA`}
        >
          {price(this.state.pay)} FCFA
        </Text>
      </View>
      <View style={_styles.action_container}>
        <Button
          title="Accepter"
          color={colors.success}
          loading={this.state.loading === 'accept'}
          disabled={this.state.loading !== null}
          style={[
            _styles.button,
            {borderColor: colors.success},
            this.state.data.user_action === 'validation_contre' ? {width: '48%'} : {},
          ]}
          onPress={() => this.accept()}
          accessible={true}
          accessibilityLabel="Accepter l'offre"
          accessibilityRole="button"
        />
        <Button
          title="Refuser"
          color={colors.danger}
          loading={this.state.loading === 'reject'}
          disabled={this.state.loading !== null}
          style={[
            _styles.button,
            {borderColor: colors.danger},
            this.state.data.user_action === 'validation_contre' ? {width: '48%'} : {},
          ]}
          onPress={() => this.reject()}
          accessible={true}
          accessibilityLabel="Refuser l'offre"
          accessibilityRole="button"
        />
        {this.state.data.user_action !== 'validation_contre' ? (
          <Button
            title="Modifier"
            color={colorScheme === 'dark' ? colors.light : colors.dark}
            loading={this.state.loading === 'modify'}
            disabled={this.state.loading !== null}
            style={[_styles.button, {borderColor: colors.gray}]}
            onPress={() => this.modify()}
            accessible={true}
            accessibilityLabel="Modifier l'offre"
            accessibilityRole="button"
          />
        ) : null}
      </View>
    </View>
  </ScrollView>
</View>

    );
  }

  componentDidMount() {
    axios
      .get(base_url('paiement/getConfig'))
      .then(res => {
        if (this.state.data.offre.etat === state_offre.WAIT_VALIDATION) {
          this.updateConfig(res.data);
        } else if (
          this.state.data.offre.etat === state_offre.WAIT_VALIDATION_CONTRE
        ) {
          this.updateConfigContre(res.data);
        }
      })
      .catch(err => {
        if (err.response.status === 403) {
          this.props.navigation.navigate('Login1');
        }
      });
  }
  updateConfig(config) {
    let frais = 0;
    let pay = 0;
    let title;
    if (this.state.data.offre.action === 'vente') {
      frais = Math.ceil(
        (this.state.data.montant * config.commission_vendeur) / 100,
      );
      pay = this.state.data.montant + frais;
      title = 'Vous payerez :';
    } else {
      frais = Math.ceil(
        (this.state.data.montant * config.commission_acheteur) / 100,
      );
      pay = this.state.data.montant - frais;
      title = 'Vous recevrez :';
    }
    this.setState({pay: pay, frais: frais, titleInfoPaiement: title});
  }
  updateConfigContre(config) {
    let frais = 0;
    let pay = 0;
    let title;
    if (this.state.data.offre.action === 'vente') {
      frais = Math.ceil(
        (this.state.data.montant * config.commission_vendeur) / 100,
      );
      pay = this.state.data.montant - frais;
      title = 'Vous recevrez :';
    } else {
      frais = Math.ceil(
        (this.state.data.montant * config.commission_acheteur) / 100,
      );
      pay = this.state.data.montant + frais;
      title = 'Vous payerez :';
    }
    this.setState({pay: pay, frais: frais, titleInfoPaiement: title});
  }
  accept() {
    this.setState({loading: 'accept'});
    axios
      .post(
        base_url('offre/accept'),
        {
          idOffre: this.state.data.id_offre,
          idNotif: this.state.data.id,
          idClient: this.state.data.client.id,
          montant: this.state.data.montant,
        },
        axiosConfig,
      )
      .then(response => {
        if (response.data.success) {
          ToastAndroid.show('Offre accepté', ToastAndroid.LONG);
          sendNotification(this.state.data.client.id);
          this.props.navigation.navigate('Home');
        }
      })
      .catch(error => {
        console.log(error.response);
        if (error.response.status === 403) {
          this.props.navigation.navigate('Login1');
        }
      })
      .finally(() => {
        this.setState({loading: null});
      });
  }
  reject() {
    this.setState({loading: 'reject'});
    axios
      .post(
        base_url('offre/reject'),
        {
          idOffre: this.state.data.id_offre,
          idNotif: this.state.data.id,
          idClient: this.state.data.client.id,
          montant: this.state.data.montant,
        },
        axiosConfig,
      )
      .then(response => {
        console.log(response);
        if (response.data.success) {
          ToastAndroid.show('Offre réfusé! Offre fermé', ToastAndroid.LONG);
          //getUnreadNotification();
          // sendNotification(this.state.data.client.id);
          this.props.navigation.navigate('Home');
        }
      })
      .catch(error => {
        console.error(error);
        if (error.response.status === 403) {
          this.props.navigation.navigate('Login1');
        }
      })
      .finally(() => {
        console.log('finally');
        this.setState({loading: null});
      });
  }
  modify() {
    this.props.navigation.navigate('ModificationOffre', {
      offre: this.state.data,
    });
  }
}

const _styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
  },
  info_container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: '100%',
  },
  info_label: {
    width: '50%',
    fontSize: 17,
  },
  info_value: {
    width: '50%',
    textAlign: 'right',
    fontSize: 22,
    fontWeight: '400',
  },
  action_container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  button: {
    borderWidth: 1,
    borderRadius: 10,
    width: '33%',
    paddingHorizontal: 15,
  },
});

export default WaitValidation;
