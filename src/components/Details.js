import React, { Component } from 'react';
import { View, StyleSheet, Text, StatusBar, ListView, Image, TouchableHighlight, Modal } from 'react-native';

const POKE_URL = 'https://pokeapi.co/api/v2/pokemon/';

class Details extends Component {

  constructor() {
    super();
    this.state = {
      pokemon: null
    }
  }

  componentWillMount() {
    fetch(POKE_URL+ this.props.selectedPoke)
      .then( result => result.json())
      .then( result => this.setState({ pokemon: result }) )
      .catch( () => this.props.handleModalPress() ) // if API cannot handle the request close the modal.
  }

  renderInfo() {
    if(this.state.pokemon) {
      return (
        <View>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{uri: this.state.pokemon.sprites.front_default }}>
            </Image>
          </View>
          <View style={styles.infoHead}>
            <View style={styles.textContainer}>
              <Text style={styles.label}>Type: </Text>
              <Text>
                {this.state.pokemon.types[0].type.name}/{this.state.pokemon.types[1].type.name}
              </Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.label}>Weight: </Text>
              <Text>
                {this.state.pokemon.weight}
              </Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.label}>Height: </Text>
              <Text>
                {this.state.pokemon.height}
              </Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.label}>Base Experience: </Text>
              <Text>
                {this.state.pokemon.base_experience}
              </Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.label}>Pokedex ID: </Text>
              <Text>
                {this.state.pokemon.id}
              </Text>
            </View>
          </View>
        </View>
      )
    }
  }

  render() {
    return(
      <View>
       <View style={styles.headerContainer}>
         <Text style={styles.headertitle}>{this.props.selectedPoke}</Text>
         <TouchableHighlight style={styles.closeButton} onPress={this.props.handleModalPress} underlayColor='transparent'>
           <Text style={styles.closeButtonText}>Close</Text>
         </TouchableHighlight>
       </View>
       {this.renderInfo()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#FF5855',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headertitle: {
    fontSize: 20,
    color: 'white'
  },
  closeButton: {
    position: 'absolute',
    left: 0,
    top: 32,
    paddingLeft: 5
  },
  closeButtonText: {
    color: 'white'
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
  },
  infoHead: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  label: {
    marginTop: 30,
    color: 'red'
  },
  textContainer: {
    paddingLeft: 40
  }
});

export default Details;
