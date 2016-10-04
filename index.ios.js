import React from 'react';
import { AppRegistry } from 'react-native';
import PokemonList from './src/components/PokemonList';

const App = () => {
  return <PokemonList />;
};

AppRegistry.registerComponent('pokedex', () => App);
