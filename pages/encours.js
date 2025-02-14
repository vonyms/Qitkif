/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {colors} from '../helpers/colors';
import Header from './components/header';
import Footer from './components/footer';
import axios from 'axios';
import {base_url} from '../helpers/url';
import {styles} from '../helpers/styles';
import {price} from '../helpers/util';

import Entypo from 'react-native-vector-icons/Entypo';

class Encours extends Component {
  state = {
    loading: true,
    data: [],
    states: [],
  };

  // Perform initial data fetch when the component mounts
  componentDidMount() {
    this.loadData();
  }

  // Method to fetch data
  loadData = () => {
    this.setState({loading: true});

    // console.log(this.props.id);
    // console.log(this.props);
    var the_id;
    if (this.props.id != undefined) {
      the_id = this.props.id;
    } else {
      the_id = this.props.route.params.id;
    }
    console.log(base_url('offre/inprogress/' + the_id));
    axios
      .get(base_url('offre/inprogress/' + the_id))
      .then(response => {
        // console.log(this.state.data);

        this.setState({
          data: response.data.lists,
          states: response.data.states,
        });
        console.log(this.state.data);
      })
      .catch(error => {
        if (error.response && error.response.status === 403) {
          this.props.navigation.navigate('Login1');
        }
      })
      .finally(() => {
        this.setState({loading: false});
      });
  };

  // Manual refresh function
  forceRefresh = () => {
    this.loadData();
  };

  render() {
    const {data, loading} = this.state;
    return (
      <View style={styles.wrapper}>
        <View style={_styles.main_container}>
          {data.length === 0 && !loading && (
            <View style={_styles.centeredMessageContainer}>
              <Text style={_styles.padding}>
                Aucun rendu disponible pour le moment
              </Text>
            </View>
          )}
          <SectionList
            sections={this.state.data}
            renderItem={({item}) => this.renderListContent(item)}
            renderSectionHeader={({section}) => (
              <Text style={_styles.date}>{section.date}</Text>
            )}
            keyExtractor={(item, index) => `basicListEntry-${index}`}
          />
          {this.showLoading()}

          {/* Refresh button */}
          <TouchableOpacity
            style={_styles.refreshButton}
            onPress={this.forceRefresh}>
            <Text style={_styles.refreshButtonText}>Actualiser</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderListContent(item) {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        style={_styles.list_content}
        onPress={() => this.goToDetail(item)}>
        <View style={{paddingTop: 5}}>
          <View style={_styles.indicator} />
        </View>
        <View style={{marginLeft: 10, flex: 1}}>
          <Text style={_styles.article_name}>{item.nom_objet}</Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={[styles.text, {color: colors.primary, fontWeight: '700'}]}>
              {item.vendeur.pseudo}
            </Text>
            <Entypo
              name="arrow-long-right"
              size={18}
              style={{marginTop: 2, marginHorizontal: 5}}
            />
            <Text
              style={[styles.text, {color: colors.success, fontWeight: '700'}]}>
              {item.acheteur.pseudo}
            </Text>
          </View>
          <Text style={styles.text}>{item.ref}</Text>
        </View>
        <View>
          <Text style={[styles.text, _styles.article_prix]}>
            {price(item.montant)} FCFA
          </Text>
          <Text
            style={[
              _styles.article_state,
              this.state.states[Number(item.etat)] === 'Annuler'
                ? {color: colors.danger}
                : {},
            ]}>
            {this.state.states[Number(item.etat)]}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  goToDetail(item) {
    // console.log(item.id_user);
    this.props.navigation.navigate('EncoursDetail', {
      idOffre: item.id,
      id: item.id_user,
    });
  }

  showLoading() {
    if (this.state.loading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={colors.secondary} />
        </View>
      );
    }
    return null;
  }
}

const _styles = StyleSheet.create({
  main_container: {
    flex: 1,
    // backgroundColor: 'red',
    position: 'relative',
    paddingBottom: 10,
  },
  date: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    fontFamily: 'Feather',
    color: colors.gray,
    borderBottomColor: colors.primary,
    borderBottomWidth: 1,
    fontSize: 16,
  },
  list_content: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomColor: colors.gray,
    borderBottomWidth: 1,
  },
  indicator: {
    width: 12,
    height: 12,
    borderRadius: 12,
    backgroundColor: colors.primary,
  },
  article_name: {
    color: colors.primary,
    fontFamily: 'Feather',
  },
  article_prix: {
    textAlign: 'right',
  },
  article_state: {
    marginTop: 5,
    color: colors.success,
    fontFamily: 'Feather',
    fontSize: 14,
    textAlign: 'right',
  },
  // Centered message container styles
  centeredMessageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredMessageText: {
    fontSize: 18,
    color: colors.gray,
    textAlign: 'center',
  },
  // Refresh button styles
  refreshButton: {
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
  },

  refreshButtonText: {
    color: colors.primary,
    fontWeight: 'bold',
  },
});

export default Encours;