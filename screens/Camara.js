import React from "react";
import {AsyncStorage, StyleSheet} from "react-native";
import {Text} from "galio-framework";
import { View, TouchableOpacity } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import {Icon} from "../components";
import * as servicios from "../servicios";
import {WSnackBar} from 'react-native-smart-tip';

export default class Home extends React.Component {
    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
    };
    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }
    makeid(length) {
        let result           = '';
        let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    snap = async () => {
        if (this.camera) {
            const options = { quality: 0.2, base64: true, fixOrientation: true, exif: true,skipProcessing:false};
            let photo = await this.camera.takePictureAsync(options);
            const file = {
                uri: photo.uri,
                name: this.makeid(10)+".jpg",
                type: "image/jpeg"
            };
            this.enviar(file);
        }
    };
    enviar(foto){
        if(foto){
            AsyncStorage.getItem('token').then(token=>{
                WSnackBar.show({data: "Procesando"});
                servicios.imagenes.nueva(token,foto).then((response)=>{
                    WSnackBar.show({data: response.data.message});
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
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>No tiene acceso a la cámara</Text>;
        } else {
            return (
                <View style={styles.vista}>
                    <Camera style={styles.vista} type={this.state.type} ref={ref => {this.camera = ref;}}>
                        <View
                            style={styles.completa}>
                            <TouchableOpacity
                                style={styles.clickeable}
                                onPress={() => {
                                    this.setState({
                                        type:
                                            this.state.type === Camera.Constants.Type.back
                                                ? Camera.Constants.Type.front
                                                : Camera.Constants.Type.back,
                                    });
                                }}>
                                <Icon name="refresh-ccw" family="Feather" size={34} style={styles.icono}/>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.clickeable}
                                onPress={() =>this.snap()}>
                                <Icon name="controller-record" family="Entypo" size={64} style={styles.icono2}/>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.clickeable}
                                onPress={() => navigation.navigate('Home')}>
                                <Icon name="back" family="AntDesign" size={34} style={styles.icono}/>
                            </TouchableOpacity>
                        </View>
                    </Camera>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    vista:{
        flex:1
    },
    completa:{
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
    },
    clickeable:{
        flex: 0.1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    icono:{
        marginBottom: 10,
        marginLeft:10,
        width:40,
        color: 'white'
    },
    icono2:{
        marginBottom: 10,
        paddingLeft:20,
        paddingRight:20,
        marginLeft:20,
        marginRight:20,
        width:100,
        color: 'red'
    }
});
