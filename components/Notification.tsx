import {View, Text, StyleSheet, Image, Appearance} from 'react-native';
import React from 'react';
import {colors} from '../helpers/colors';
const modeApp = Appearance.getColorScheme();
function Notification({}): JSX.Element {
  return (
    <View accessible={true} accessibilityRole="none" style={styles.container}>
      <View accessible={true} accessibilityRole="none" style={styles.container1}>
        <Image
          style={styles.reformImage}
          source={require('../assets/icons/cloche.png')}
          resizeMode="cover"
          accessibilityRole="none" // Image doesn't need a role unless it's interactive
        />
        <Text 
          style={styles.colorBlue}
          accessibilityRole="none" // Text role set to none
          accessibilityLabel="Aucune notification pour le moment" // Optional label for screen readers
        >
          Aucune notification pour le moment
        </Text>
      </View>
      {/* <View accessible={true} accessibilityRole="none" style={styles.container2}>
        <Pressable style={styles.codeContainer}>
          <Text style={styles.textColorBlue}>{code}</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            copyToClipBoard();
          }}
          style={styles.btn}
        >
          <Text style={styles.btnTxt}>COPIER MON CODE</Text>
        </Pressable>
      </View> */}
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10,
    flex: 1,
    backgroundColor: modeApp === 'dark' ? colors.dark : colors.light,
  },
  container1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  container2: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  codeContainer: {
    width: 100,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#0275d8',
    borderRadius: 10,
  },
  textColorBlue: {
    color: '#0275d8',
    fontSize: 20,
  },
  btn: {
    backgroundColor: '#0275d8',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 15,
    borderRadius: 10,
  },
  btnTxt: {
    color: 'white',
  },
  reformImage: {
    width: 25,
    height: 25,
  },
  colorBlue: {
    color: '#0275d8',
    fontSize: 12,
  },
});

export default Notification;
