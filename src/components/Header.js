import React from 'react';
import { View, Text } from 'react-native';

const Header = () => {
  return(
    <View style={styles.container}>
      <Text style={styles.title}>Pokedex</Text>
    </View>
  );
};

const styles = {
  container: {
    backgroundColor: '#FF5855',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
  },
  title: {
    fontSize: 20,
    paddingTop: 10,
    color: 'white'
  }
}

export default Header;
