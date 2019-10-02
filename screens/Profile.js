import React from 'react';
import {StyleSheet, Dimensions, ScrollView, ImageBackground, Platform, AsyncStorage} from 'react-native';
import  { Block, Text, theme, Input, Button } from 'galio-framework';
import { LinearGradient } from 'expo-linear-gradient';

import Icon from '../components/Icon';

import { materialTheme } from '../constants';
import { HeaderHeight } from "../constants/utils";
import * as servicios from "../servicios";

const { width, height } = Dimensions.get('screen');
const thumbMeasure = (width - 48 - 32) / 3;

export default class Profile extends React.Component {

  state = {
    lista:[],
    texto:null,
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

  consultar(){
    const { navigation } = this.props;
    const elemento  = navigation.dangerouslyGetParent().getParam('product');
    AsyncStorage.getItem('token').then(token=>{
      servicios.comentarios.especifico(token,elemento).then(response=>{
        this.setState({lista:response.data})
      }).catch(()=>{
        this.error();
      });
    }).catch(()=>{
      this.error();
    });
  }
  enviar(){
    const { navigation } = this.props;
    const elemento  = navigation.dangerouslyGetParent().getParam('product');
    if(this.state.texto){
      AsyncStorage.getItem('token').then(token=>{
        servicios.comentarios.nuevo(token,elemento,this.state.texto).then(()=>{
          this.setState({texto:null});
          this.consultar();
        }).catch(()=>{
          this.error();
        });
      }).catch(()=>{
        this.error();
      });
    }
  }
  error(){
    servicios.login.limpiar();
    this.props.navigation.navigate('Onboarding');
  }

  render() {
    const { navigation } = this.props;
    const elemento  = navigation.dangerouslyGetParent().getParam('product');

    const renderLista = this.state.lista.map(item =>
            <Block row space="between" style={{ flexWrap: 'wrap' }} key={item._id}>
              <Text size={16}>{item.texto_co}</Text>
              <Text size={12}>{item.autor.name}</Text>
            </Block>
        );

    return (
      <Block flex style={styles.profile}>
        <Block flex>
          <ImageBackground
            source={{uri: elemento.ruta_im}}
            style={styles.profileContainer}
            imageStyle={styles.profileImage}>
            <Block flex style={styles.profileDetails}>
              <Block style={styles.profileTexts}>
                <Block row space="between">
                  <Block row>
                    <Text color="white" size={16} muted style={styles.seller}>{elemento.nombre_im}</Text>
                  </Block>
                </Block>
              </Block>
              <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']} style={styles.gradient} />
            </Block>
          </ImageBackground>
        </Block>
        <Block flex style={styles.options}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Block row space="between" style={{ paddingVertical: 4, alignItems: 'baseline' }}>
              <Text size={16}>Comentarios</Text>
              <Text size={12} color={materialTheme.COLORS.PRIMARY} onPress={() => this.props.navigation.navigate('Home')}>Regresar</Text>
            </Block>
            <Block>
              <Block row >
                <Input
                    right
                    color="black"
                    style={styles.search}
                    placeholder="Comentario"
                    onBlur={() => this.enviar()}
                    onChangeText={(texto) => this.setState({texto:texto})}
                    value={this.state.texto}
                    iconContent={<Icon size={16} color={theme.COLORS.MUTED} name="send" family="MaterialCommunityIcons" />}
                />
              </Block>
            </Block>
            <Block style={{ paddingBottom: -HeaderHeight * 2 }}>
              {renderLista}
            </Block>
          </ScrollView>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  profile: {
    marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
    marginBottom: -HeaderHeight * 2,
  },
  profileImage: {
    width: width * 1.1,
    height: 'auto',
  },
  profileContainer: {
    marginTop:-10,
    width: width,
    height: height / 2,
  },
  profileDetails: {
    paddingTop: theme.SIZES.BASE * 4,
    justifyContent: 'flex-end',
    position: 'relative',
  },
  profileTexts: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
    zIndex: 2
  },
  pro: {
    backgroundColor: materialTheme.COLORS.LABEL,
    paddingHorizontal: 6,
    marginRight: theme.SIZES.BASE / 2,
    borderRadius: 4,
    height: 19,
    width: 38,
  },
  seller: {
    marginRight: theme.SIZES.BASE / 2,
  },
  options: {
    position: 'relative',
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: -theme.SIZES.BASE * 7,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: 'center',
    width: thumbMeasure,
    height: thumbMeasure
  },
  gradient: {
    zIndex: 1,
    left: 0,
    right: 0,
    bottom: 0,
    height: '30%',
    position: 'absolute',
  },
  search: {
    height: 48,
    width: width - 100,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
  },
});
