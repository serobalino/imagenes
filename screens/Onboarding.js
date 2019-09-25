import React from 'react';
import { ImageBackground, StyleSheet, StatusBar, Dimensions, Platform } from 'react-native';
import {Block, Button, Input, Text, theme} from 'galio-framework';

const { height, width } = Dimensions.get('screen');

import materialTheme from '../constants/Theme';
import Images from '../constants/Images';
import {Icon} from "../components";

export default class Onboarding extends React.Component {
  state={
    formulario:{
      usuario:null,
      contrasena:null,
    }
  };
  render() {
    const { navigation } = this.props;
    const iconUser = <Icon size={16} color={theme.COLORS.MUTED} name="person" family="material" />
    const iconPass = <Icon size={16} color={theme.COLORS.MUTED} name="security" family="material" />

    return (
      <Block flex style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Block flex center>
          <ImageBackground
            source={ Images.Onboarding }
            style={{ height: height, width: width, marginTop: '-45%', zIndex: 1 }}
          />
        </Block>
        <Block flex space="between" style={styles.padded}>
          <Block flex space="around" style={{ zIndex: 2 }}>
            <Block>
              <Block>
                <Text color="white" size={60}>Lion</Text>
              </Block>
              <Text size={16} color='rgba(255,255,255,0.6)'>
                Ingresa tus credenciales
              </Text>
            </Block>
            <Block center>
              <Input
                  right
                  color="black"
                  style={styles.input}
                  iconContent={iconUser}
                  placeholder="Usuario"
              />
              <Input
                  right
                  color="black"
                  style={styles.input}
                  iconContent={iconPass}
                  placeholder="Contraseña"
              />
              <Button
                shadowless
                style={styles.button}
                color={materialTheme.COLORS.BUTTON_COLOR}
                onPress={() => navigation.navigate('Home')}>
                Iniciar
              </Button>
            </Block>
          </Block>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.BLACK,
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: 'relative',
    bottom: theme.SIZES.BASE,
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
  },
  input: {
    height: 48,
    width: width - theme.SIZES.BASE * 4,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
  },
});
