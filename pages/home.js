import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {colors} from '../helpers/colors';
import Header from './components/header';
import Footer from './components/footer';
import {connect} from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import axios from 'axios';
import {base_url} from '../helpers/url';
import {getUnreadMessage, getUnreadNotification} from '../helpers/util';
import {styles} from '../helpers/styles';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
<View style={styles.wrapper}>
  <Header
    title={'Hello ' + this.props.logged.pseudo}
    navigation={this.props.navigation}
    home={true}
    accessible={true}
    accessibilityLabel={`Bienvenue ${this.props.logged.pseudo}`}
  />
  <View style={_styles.main_container}>
    <TouchableOpacity
      activeOpacity={0.8}
      style={_styles.menu_item}
      onPress={() => this.props.navigation.navigate('Historique')}
      accessible={true}
      accessibilityLabel="Accéder à l'historique"
      accessibilityHint="Cliquez ici pour voir l'historique des transactions">
      <Text style={_styles.menu_item_text}>Historique</Text>
    </TouchableOpacity>
    <TouchableOpacity
      activeOpacity={0.8}
      style={_styles.menu_item}
      onPress={() => this.props.navigation.navigate('Encours')}
      accessible={true}
      accessibilityLabel="Voir les transactions en cours"
      accessibilityHint="Cliquez ici pour voir les transactions en cours">
      <Text style={_styles.menu_item_text}>En cours</Text>
    </TouchableOpacity>
    <TouchableOpacity
      activeOpacity={0.8}
      style={_styles.menu_item}
      onPress={() => this.props.navigation.navigate('Promotion')}
      accessible={true}
      accessibilityLabel="Voir les promotions"
      accessibilityHint="Cliquez ici pour voir les promotions actuelles">
      <Text style={_styles.menu_item_text}>News</Text>
    </TouchableOpacity>
    <TouchableOpacity
      activeOpacity={0.8}
      style={_styles.menu_item}
      onPress={() => this.props.navigation.navigate('ServiceClient')}
      accessible={true}
      accessibilityLabel="Accéder au service client"
      accessibilityHint="Cliquez ici pour contacter le service client">
      <Text style={_styles.menu_item_text}>Service client</Text>
    </TouchableOpacity>
  </View>
  <Footer
    navigation={this.props.navigation}
    accessible={true}
    accessibilityLabel="Accéder au pied de page"
  />
</View>

    );
  }
  componentDidMount() {
    this.getToken();
    getUnreadNotification();
    getUnreadMessage();
  }
  componentDidUpdate() {
    getUnreadNotification();
    getUnreadMessage();
  }
  async getToken() {
    // Register the device with FCM
    await messaging().registerDeviceForRemoteMessages();
    // Get the token
    await messaging()
      .getToken()
      .then(res => {
        axios
          .post(
            base_url('notification/registerDevice'),
            {
              token: res,
            },
            {
              headers: {
                'Content-Type':
                  'application/x-www-form-urlencoded; charset=UTF-8',
              },
            },
          )
          .then(response => {})
          .catch(err => {
            console.log(err);
          });
      });
  }
  // realTime(count = -1) {
  //   axios
  //     .get(base_url('realtime.php'), {
  //       params: {
  //         userType: 'user',
  //         idUser: this.props.logged.id,
  //         count: count,
  //       },
  //     })
  //     .then(res => {
  //       let data = res.data;
  //       if (data.updated) {
  //         if (
  //           this.props.screen.message &&
  //           this.props.screen.message_service_id ===
  //             Number(data.last.id_service)
  //         ) {
  //           this.getReceivedMessage(data.last);
  //         }
  //         getUnreadMessage();
  //       }
  //       this.realTime(data.count);
  //     })
  //     .catch(() => {
  //       this.realTime();
  //     });
  // }
}

const _styles = StyleSheet.create({
  main_container: {
    flex: 1,
    justifyContent: 'center',
    padding: 15,
  },
  menu_item: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: colors.secondary,
    borderRadius: 10,
    marginBottom: 20,
  },
  menu_item_text: {
    color: colors.light,
    fontSize: 17,
  },
});

const mapStateToProps = state => {
  const {logged, unread, connection, screen, message} = state;
  return {logged, unread, connection, screen, message};
};

export default connect(mapStateToProps)(Home);
