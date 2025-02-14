/* eslint-disable react-native/no-inline-styles */
import axios from 'axios';
import React, {Component} from 'react';
import {Image, StyleSheet, Text, ToastAndroid, View} from 'react-native';
import {Button, Confirm} from '../../elements';
import {colors} from '../../helpers/colors';
import {styles} from '../../helpers/styles';
import {base_url, public_url} from '../../helpers/url';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  axiosConfig,
  capitalize,
  price,
  sendNotification,
} from '../../helpers/util';
import Header from '../components/header';

export default class ActivePaiement extends Component {
  state = {
    data: this.props.route.params.data,
    loading: null,
    pay: 0,
    frais: 0,
    showConfirm: false,
    cancelling: false,
  };
  render() {
    return (
<View style={styles.wrapper}>
  <View style={styles.wrapper}>
    {/* <Header
      title="Activation du paiement"
      navigation={this.props.navigation}
    /> */}
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
      <Text style={[styles.text, {fontSize: 24}]} accessible={true} accessibilityLabel={`Pseudo de l'utilisateur: ${this.state.data.client.pseudo}`}>
        {this.state.data.client.pseudo}
      </Text>
      <Text
        style={[styles.text, {fontSize: 18, marginVertical: 15, textAlign: 'center'}]}
        accessible={true}
        accessibilityLabel={`Message: ${capitalize(this.state.data.message)}`}
      >
        {capitalize(this.state.data.message)}
      </Text>
      <Text style={_styles.title} accessible={true} accessibilityLabel={`Offre: ${this.state.data.offre.nom_objet.toUpperCase()}`}>
        {this.state.data.offre.nom_objet.toUpperCase()}
      </Text>
      {this.state.data.msg ? (
        <View style={{flexDirection: 'row', width: '100%'}}>
          <MaterialCommunityIcons name="comment-quote" size={36} accessible={true} accessibilityLabel="Citation" />
          <View style={{paddingHorizontal: 10, width: '98%'}}>
            <Text style={{fontSize: 15, fontStyle: 'italic'}} accessible={true} accessibilityLabel={`Message supplémentaire: ${this.state.data.msg}`}>
              {this.state.data.msg}
            </Text>
          </View>
        </View>
      ) : null}
      <View style={_styles.info_container}>
        <Text style={_styles.info_label} accessible={true} accessibilityLabel="Mode de remise">
          Mode de remise :
        </Text>
        <Text style={_styles.info_value} accessible={true} accessibilityLabel={`Mode de remise: ${capitalize(this.state.data.offre.mode_remise)}`}>
          {capitalize(this.state.data.offre.mode_remise)}
        </Text>
      </View>
      <View style={_styles.info_container}>
        <Text style={_styles.info_label} accessible={true} accessibilityLabel="Montant">
          Montant :
        </Text>
        <Text style={_styles.info_value} accessible={true} accessibilityLabel={`Montant: ${price(this.state.data.offre.montant)} FCFA`}>
          {price(this.state.data.offre.montant)} FCFA
        </Text>
      </View>
      <View style={_styles.info_container}>
        <Text style={_styles.info_label} accessible={true} accessibilityLabel="Frais de service">
          Frais de service :
        </Text>
        <Text style={_styles.info_value} accessible={true} accessibilityLabel={`Frais de service: ${price(this.state.frais)} FCFA`}>
          {price(this.state.frais)} FCFA
        </Text>
      </View>
      <View style={_styles.info_container}>
        <Text style={_styles.info_label} accessible={true} accessibilityLabel="Vous recevrez">
          Vous recevrez :
        </Text>
        <Text style={_styles.info_value} accessible={true} accessibilityLabel={`Vous recevrez: ${price(this.state.pay)} FCFA`}>
          {price(this.state.pay)} FCFA
        </Text>
      </View>
      <View style={_styles.action_container}>
        <Button
          title="Annuler"
          color={colors.danger}
          disabled={this.state.loading !== null}
          style={[_styles.button, {borderColor: colors.danger}]}
          onPress={() => this.setState({showConfirm: true})}
          accessible={true}
          accessibilityLabel="Annuler l'activation du paiement"
          accessibilityRole="button"
        />
        <Button
          title="Activer le paiement"
          color={colors.success}
          loading={this.state.loading === 'accept'}
          disabled={this.state.loading !== null}
          style={[_styles.button, {borderColor: colors.success}]}
          onPress={() => this.accept()}
          accessible={true}
          accessibilityLabel="Activer le paiement"
          accessibilityRole="button"
        />
      </View>
    </View>
  </View>
  <Confirm
    show={this.state.showConfirm}
    onConfirm={() => this.reject()}
    onCancel={() => this.setState({showConfirm: false})}
    loading={this.state.cancelling}
    accessible={true}
    accessibilityLabel="Confirmer l'annulation"
  />
</View>

    );
  }
  componentDidMount() {
    axios
      .get(base_url('paiement/getConfig'))
      .then(res => {
        let frais = Math.ceil(
          (this.state.data.montant * res.data.commission_vendeur) / 100,
        );
        let pay = this.state.data.montant - frais;
        this.setState({frais: frais, pay: pay});
      })
      .catch(err => {
        if (err.response.status === 403) {
          this.props.navigation.navigate('Login1');
        }
      });
  }
  accept() {
    console.log(base_url('offre/activatePaiement'), {
      idOffre: this.state.data.id_offre,
      idNotif: this.state.data.id,
      idClient: this.state.data.client.id,
      montant: this.state.data.montant,
    });
    console.log(this.state.id_user);
    this.setState({loading: 'accept'});
    axios
      .post(
        base_url('offre/activatePaiement'),
        {
          idOffre: this.state.data.id_offre,
          idNotif: this.state.data.id,
          idClient: this.state.data.client.id,
          montant: this.state.data.montant,
        },
        axiosConfig,
      )
      .then(response => {
        console.log(response.data);
        if (response.data.success) {
          ToastAndroid.show('Paiement activé', ToastAndroid.LONG);
          //getUnreadNotification();
          // sendNotification(this.state.data.client.id);
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
        if (response.data.success) {
          ToastAndroid.show('Offre réfusé! Offre fermé', ToastAndroid.LONG);
          //getUnreadNotification();
          sendNotification(this.state.data.client.id);
          this.props.navigation.navigate('Home');
        }
      })
      .catch(error => {
        if (error.response.status === 403) {
          this.props.navigation.navigate('Login1');
        }
      })
      .finally(() => {
        this.setState({loading: null, showConfirm: false});
      });
  }
}

const _styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: 20,
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
    width: '48%',
    paddingHorizontal: 15,
  },
});
