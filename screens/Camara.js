import React from "react";
import {StyleSheet} from "react-native";
import {Block, Text} from "galio-framework";
import { View, TouchableOpacity } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import {Icon} from "../components";

export default class Home extends React.Component {
    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
    };
    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }


    render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>No tiene acceso a la cámara</Text>;
        } else {
            return (
                <View style={styles.vista}>
                    <Camera style={styles.vista} type={this.state.type}>
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
    }
});
