import React, {Component} from 'react';
import {
  Appearance,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {boxShadow} from '../helpers/box_shadow';
import {colors} from '../helpers/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

const colorScheme = Appearance.getColorScheme();

export default class ChooseCamera extends Component {
  render() {
    if (this.props.show) {
      return (
<View style={styles.choose_container}>
  <View style={[styles.choose_content, boxShadow.depth_2]}>
    <TouchableOpacity
      style={styles.choose_item}
      onPress={() => this.props.onLibrary()}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel="Gallerie" // Label to describe the button for screen readers
      accessibilityHint="Accédez à votre galerie d'images" // Hint to describe the action performed
    >
      <FontAwesome
        name="photo"
        size={24}
        color={colorScheme === 'dark' ? colors.light : colors.dark}
      />
      <Text>Gallerie</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.choose_item}
      onPress={() => this.props.onCancel()}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel="Annuler" // Label for cancel action
      accessibilityHint="Annuler l'action en cours" // Hint for canceling the action
    >
      <FontAwesome
        name="times"
        size={24}
        color={colorScheme === 'dark' ? colors.light : colors.dark}
      />
      <Text>Annuler</Text>
    </TouchableOpacity>
  </View>
</View>

      );
    }
  }
}

const styles = StyleSheet.create({
  choose_container: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 2,
    backgroundColor: colorScheme === 'dark' ? '#000000AF' : '#00000080',
    width: '100%',
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  choose_content: {
    backgroundColor: colorScheme === 'dark' ? colors.black : '#FFF',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 40,
  },
  choose_item: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
