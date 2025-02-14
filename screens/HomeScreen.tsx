import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Home from '../components/Home';
import Navbar from '../components/Navbar';

function HomeScreen({navigation}): JSX.Element {
  return (
    <SafeAreaView
      style={{ flex: 1 }}
      accessible={true}
      accessibilityLabel="Écran principal de l'application">
      <Navbar navigation={navigation} />
      <Home navigation={navigation} />
    </SafeAreaView>
  );
}

export default HomeScreen;
