import React from 'react';
import {StyleSheet, Dimensions, ScrollView, AsyncStorage} from 'react-native';
import { Button, Block, Text, Input, theme } from 'galio-framework';

import { Icon, Product } from '../components/';

const { width } = Dimensions.get('screen');
import products from '../constants/products';
import * as servicios from "../servicios";

export default class Home extends React.Component {
  state={
    lista:[]
  };
  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      this.consultar();
    });
  }
  componentWillUnmount() {
    this.focusListener.remove();
  }
  error(){
    servicios.login.limpiar();
    this.props.navigation.navigate('Onboarding');
  }
  consultar() {

    AsyncStorage.getItem('token').then(token=>{
      servicios.imagenes.mundoFotos(token).then(response=>{
        this.setState({lista:response.data})
      }).catch(()=>{
        this.error();
      });
    }).catch(()=>{
      this.error();
    });
  }
  renderProducts = () => {
    const renderLista = this.state.lista.map(item => <Block flex row key={item._id}><Product product={item} /></Block>);
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.products}>
          <Block flex>
            {renderLista}
          </Block>
        </ScrollView>
    )
  }

  render() {
    return (
        <Block flex center style={styles.home}>
          {this.renderProducts()}
        </Block>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    elevation: 4,
    zIndex: 2,
  },
  tabs: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.50,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: '300'
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.MUTED,
  },
  products: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
  },
});
