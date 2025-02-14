import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, Appearance} from 'react-native';
import {colors} from '../../helpers/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

const colorScheme = Appearance.getColorScheme();
class Footer2 extends Component {
  render() {
    return (
<View style={styles.footer}>
  {/* Retour à l'écran précédent */}
  <TouchableOpacity 
    onPress={() => this.props.navigation.goBack()}
    accessible={true}
    accessibilityRole="button"
    accessibilityLabel="Retour à l'écran précédent"
    accessibilityHint="Appuyez pour revenir à l'écran précédent"
  >
    <AntDesign name="arrowleft" size={42} color={colors.secondary} />
  </TouchableOpacity>

  {/* Accéder à la page d'accueil */}
  <TouchableOpacity
    onPress={() => this.props.navigation.navigate('Home')}
    accessible={true}
    accessibilityRole="button"
    accessibilityLabel="Accéder à la page d'accueil"
    accessibilityHint="Appuyez pour revenir à la page d'accueil"
  >
    <Entypo name="home" size={42} color={colors.primary} />
  </TouchableOpacity>

  {/* Accéder aux messages */}
  <TouchableOpacity
    accessible={true}
    accessibilityRole="button"
    accessibilityLabel="Accéder aux messages"
    accessibilityHint="Appuyez pour voir vos messages"
  >
    <AntDesign
      name="message1"
      size={24}
      style={styles.footer_menu_icon_message}
      color={colors.light}
    />
  </TouchableOpacity>
</View>

    );
  }
}

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    height: 60,
    borderTopWidth: 1,
    borderTopColor: colors.gray,
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: colorScheme === 'dark' ? colors.dark : colors.light,
  },
  footer_menu: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footer_menu_icon_message: {
    backgroundColor: colors.success,
    padding: 7,
    borderRadius: 5,
  },
});

export default Footer2;
