import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {faBars} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useSelector} from 'react-redux';

function Navbar({navigation}): JSX.Element {
  const [userName, setUserName] = useState('Edouk');
  const nomUser = useSelector(state => state.logged.pseudo);
  const idUser = useSelector(state => state.logged.id);
  return (
<View style={styles.nav} accessible={true} accessibilityRole="none">
  <Text style={styles.textWhite} accessibilityLabel={`Hello, ${nomUser}`}>
    Hello {nomUser}
  </Text>
  <Pressable
    onPress={() => {
      navigation.navigate('Menu', {id: idUser});
    }}
    accessibilityRole="button"
    accessibilityLabel="Open menu"
    accessibilityHint="Opens the menu screen where you can navigate to different sections"
  >
    <FontAwesomeIcon icon={faBars} style={styles.textWhite} size={25} />
  </Pressable>
</View>


  );
}

const styles = StyleSheet.create({
  nav: {
    height: 35,
    backgroundColor: '#0275d8',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
  },
  textWhite: {
    color: 'white',
  },
});

export default Navbar;
