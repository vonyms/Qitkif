/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Appearance,
} from 'react-native';
import {colors} from '../../helpers/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';

const colorScheme = Appearance.getColorScheme();

class Footer extends Component {
  render() {
    return (
<View style={styles.footer}>
  {/* Section "Vendre" */}
  <TouchableOpacity
    style={styles.footer_menu}
    onPress={() =>
      this.props.navigation.navigate('ChoixVendeur', {type: 'vente'})
    }
    accessible={true}
    accessibilityRole="button"
    accessibilityLabel="Accéder à la section vendre"
    accessibilityHint="Appuyez pour accéder à la section vendre des produits">
    <AntDesign
      name="arrowdown"
      size={24}
      style={styles.footer_menu_icon}
      color={colors.light}
    />
    <Text style={{marginLeft: 10}}>Vendre</Text>
  </TouchableOpacity>

  {/* Section des icônes Message et Notifications */}
  <View
    style={{
      flexDirection: 'row',
      width: 95,
      justifyContent: 'space-between',
    }}>
    {/* Section Message */}
    <TouchableOpacity
      style={styles.footer_menu}
      onPress={() => this.props.navigation.navigate('ServiceClient')}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel="Accéder aux messages"
      accessibilityHint="Appuyez pour voir vos messages">
      <AntDesign
        name="message1"
        size={24}
        style={styles.footer_menu_icon_message}
        color={colors.light}
      />
      {this.props.unread.message ? (
        <Text style={styles.badge}>{this.props.unread.message}</Text>
      ) : null}
    </TouchableOpacity>

    {/* Section Notifications */}
    <TouchableOpacity
      style={styles.footer_menu}
      onPress={() => this.props.navigation.navigate('NotificationList')}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel="Accéder aux notifications"
      accessibilityHint="Appuyez pour voir vos notifications">
      <Ionicons
        name="notifications-outline"
        size={24}
        style={[
          styles.footer_menu_icon_message,
          {backgroundColor: colors.gold},
        ]}
        color={colors.light}
      />
      {this.props.unread.notification ? (
        <Text style={styles.badge}>{this.props.unread.notification}</Text>
      ) : null}
    </TouchableOpacity>
  </View>

  {/* Section "Acheter" */}
  <TouchableOpacity
    style={styles.footer_menu}
    onPress={() => this.props.navigation.navigate('ChoixVendeur')}
    accessible={true}
    accessibilityRole="button"
    accessibilityLabel="Accéder à la section acheter"
    accessibilityHint="Appuyez pour accéder à la section acheter des produits">
    <Text style={{marginRight: 10}}>Acheter</Text>
    <AntDesign
      name="arrowup"
      size={24}
      style={[
        styles.footer_menu_icon,
        {backgroundColor: colors.secondary},
      ]}
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
  footer_menu_icon: {
    backgroundColor: colors.primary,
    padding: 7,
    borderRadius: 24,
  },
  footer_menu_icon_message: {
    backgroundColor: colors.success,
    padding: 7,
    borderRadius: 5,
  },
  badge: {
    backgroundColor: colors.danger,
    paddingHorizontal: 5,
    color: colors.light,
    borderRadius: 5,
    marginLeft: -10,
    marginTop: -35,
  },
});

const mapStateToProps = state => {
  const {unread} = state;
  return {unread};
};
export default connect(mapStateToProps)(Footer);
