/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors} from '../helpers/colors';
import axios from 'axios';
import {connect} from 'react-redux';
import {setPseudo, setId} from '../store/slices/logged_slice';
import {base_url} from '../helpers/url';
import {styles} from '../helpers/styles';
import {Keypad} from '../elements';
import {axiosConfig} from '../helpers/util';
import QTWebsocket from '../helpers/websocket';

class Register4 extends Component {
  state = {
    codeError: false,
    btnDisabled: false,
  };
  setCodeError() {
    if (this.state.codeError) {
      return (
        <Text style={styles.text_error}>
          Les deux codes ne sont pas identique
        </Text>
      );
    }
    return null;
  }
  render() {
    return (
      <View style={[styles.wrapper, _styles.wrapper]}>
        <Text style={_styles.title}>C'est bientôt fini !</Text>
        <Text style={_styles.subtitle}>
          Ressaisissez le code que vous venez d'entrer
        </Text>
        {this.setCodeError()}
        <View style={{marginVertical: 15}}>
          <Keypad
            onSubmit={(code, reset) => this.submit(code, reset)}
            loading={this.state.btnDisabled}
          />
        </View>
      </View>
    );
  }
  submit(code, reset) {
    this.setState({codeError: false});
    if (code.length < 4) {
      this.setState({codeError: true});
      return;
    }
    this.setState({codeError: false, btnDisabled: true});
    axios
      .post(
        base_url('register/stepFour'),
        {
          code: code,
          id: this.props.register.id,
        },
        axiosConfig,
      )
      .then(response => {
        this.setState({btnDisabled: false});
        if (!response.data.success) {
          reset();
          this.setState({codeError: true});
        } else {
          this.props.dispatch(setPseudo(response.data.pseudo));
          this.props.dispatch(setId(response.data.id));

          if (!this.props.connection.socket) {
            QTWebsocket.initialize();
          }

          this.props.navigation.navigate('Home', {time: Date.now()});
        }
      })
      .catch(error => {
        this.setState({btnDisabled: false});
      });
  }
}

const _styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontWeight: '400',
    fontSize: 28,
    color: colors.primary,
    textAlign: 'center',
    fontFamily: 'Feather',
  },
  subtitle: {
    fontWeight: '400',
    fontSize: 20,
    color: colors.secondary,
    textAlign: 'center',
    fontFamily: 'Feather',
  },
});

const mapStateToProps = state => {
  const {logged, connection, register} = state;
  return {logged, connection, register};
};
export default connect(mapStateToProps)(Register4);
