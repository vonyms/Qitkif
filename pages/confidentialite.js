/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {colors} from '../helpers/colors';
import {base_url} from '../helpers/url';
import Header from './components/header';
import {WebView} from 'react-native-webview';
export default class Confidentialite extends Component {
  // state = {
  //   loading: true,
  //   source: null,
  // };
  render() {
    return (
      <View style={styles.wrapper}>
  <Header
    title="Condition & confidentialité"
    navigation={this.props.navigation}
    accessibilityRole="header"
    accessibilityLabel="Écran des conditions et de la confidentialité"
  />
  <View
    style={{
      flex: 1,
      paddingBottom: 15,
      paddingHorizontal: 15,
      alignItems: 'center',
      position: 'relative',
    }}
  >
    <WebView
      source={{uri: base_url('confidentialite')}}
      style={{paddingTop: 170, width: Dimensions.get('window').width}}
      accessibilityRole="content"
      accessibilityLabel="Contenu des conditions et confidentialité"
    />
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.button}
      onPress={() => this.props.navigation.navigate('Register')}
      accessibilityRole="button"
      accessibilityLabel="Comprendre les conditions"
      accessibilityHint="Appuyez ici pour indiquer que vous avez compris les conditions"
    >
      <Text style={styles.button_text}>J'ai compris</Text>
    </TouchableOpacity>
  </View>
</View>

    );
  }
  // showLoading() {
  //   if (this.state.loading) {
  //     return (
  //       <ActivityIndicator
  //         style={styles.loading}
  //         size="large"
  //         color={colors.secondary}
  //       />
  //     );
  //   }
  //   return null;
  // }
  // componentDidMount() {
  //   axios
  //     .get(base_url('confidentialite'))
  //     .then(res => {
  //       this.setState({source: res.data});
  //     })
  //     .finally(() => {
  //       this.setState({loading: false});
  //     });
  // }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  button: {
    marginTop: 5,
    width: '100%',
    height: 40,
    backgroundColor: colors.primary,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button_text: {
    fontFamily: 'Feather',
    textTransform: 'uppercase',
    color: colors.light,
    fontSize: 18,
  },
  loading: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: Dimensions.get('window').width,
    height: '100%',
    backgroundColor: colors.light,
  },
});
