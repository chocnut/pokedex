import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  StatusBar,
  ListView,
  Image,
  TouchableHighlight,
  Modal
} from 'react-native';
import Header from './Header';
import Details from './Details';

const POKE_API_URL = 'https://pokeapi.co/api/v2/pokemon/?limit=102';
const POKE_IMAGE_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

class PokemonList extends Component {

  constructor() {
    super();
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: null,
      modalVisible: false,
      selectedPoke: null,
    };
  }

  componentWillMount() {
    fetch(POKE_API_URL)
      .then(result => result.json())
      .then(result => this.setState({ dataSource: this.ds.cloneWithRows(result.results) }));
  }

  handleModalPress() {
    this.setState({ selectedPoke: null, modalVisible: false });
  }

  renderDetailModal() {
    return (
      <Modal
        animationType={'slide'}
        transparent={false}
        visible={this.state.modalVisible}
        onRequestClose={() => this.handleModalPress()}
      >
        <Details
          handleModalPress={() => this.handleModalPress()}
          selectedPoke={this.state.selectedPoke}
        />
      </Modal>
    );
  }

  renderCards(row) {
    const imagePath = parseInt(row.url.split('/pokemon/').pop(), 10);

    return (
      <TouchableHighlight
        style={styles.listItem}
        onPress={() => this.setState({ selectedPoke: row.name, modalVisible: true })}
      >
        <Image
          style={styles.cardImage}
          source={{ uri: `${POKE_IMAGE_URL}${imagePath}.png` }}
        >
          <Text style={styles.cardText}>{row.name}</Text>
        </Image>
      </TouchableHighlight>
    );
  }

  renderList() {
    if (this.state.dataSource) {
      return (
        <ListView
        initialListSize={102}
        contentContainerStyle={styles.list}
        dataSource={this.state.dataSource}
        renderRow={rowData => this.renderCards(rowData)}
        />
      );
    }
  }

  renderStatusBar() {
    if (Platform.OS === 'ios') {
      return (
        <StatusBar
         backgroundColor="white"
         barStyle="light-content"
        />
      );
    }
  }

  render() {
    return (
      /* eslint-disable global-require */
      <Image style={styles.bgImage} source={require('../images/bg.jpg')}>
        {this.renderStatusBar()}
        <Header />
        {this.renderList()}
        {this.renderDetailModal()}
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    width: null,
    height: null
  },
  list: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  listItem: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    margin: 10,
    width: 100,
    height: 100
  },
  cardImage: {
    width: 100,
    height: 100,
    justifyContent: 'flex-end'
  },
  cardText: {
    textAlign: 'center',
    backgroundColor: '#FF5855',
    flexDirection: 'row',
    marginTop: 20,
    width: 100,
    color: 'white'
  }
});

export default PokemonList;
