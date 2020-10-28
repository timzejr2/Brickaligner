import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { Constants, Accelerometer } from 'expo-sensors';

export default class App extends Component {
  state = {
    accelerometerData: { x: 0, y: 0, z: 0 },
  };

  componentWillUnmount() {
    this._unsubscribeFromAccelerometer();
  }

  componentDidMount() {
    this._subscribeToAccelerometer();
  }

  UNSAFE_componentWillMount() {
    const { width, height } = Dimensions.get('window');
    this.screenWidth = width;
    this.screenHeight = height;
    this.boxWidth = this.screenWidth / 10.0;
  }

  _subscribeToAccelerometer = () => {
    this._accelerometerSubscription = Accelerometer.addListener(
      accelerometerData => this.setState({ accelerometerData })
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.target}></View>
        <View
          style={{
            position: 'absolute',
            top:
              (-this.screenHeight * (this.state.accelerometerData.y - 1.0)) /
                2.0 -
              this.boxWidth / 2.0,
            left:
              (this.screenWidth * (this.state.accelerometerData.x + 1.0)) /
                2.0 -
              this.boxWidth / 2.0,
            width: this.screenWidth / 10.0,
            height: this.screenWidth / 10.0,
            borderRadius: this.screenWidth / 5.0,
            backgroundColor: 'blue',
          }}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>Brick aligner</Text>

          <Text style={styles.anglevalue}>
            x = {(this.state.accelerometerData.x.toFixed(2)*90).toFixed(0)}
            {'°, '}y = {(this.state.accelerometerData.y.toFixed(2)*90).toFixed(0)}
            {'°, '}z = {(this.state.accelerometerData.z.toFixed(2)*90).toFixed(0)}°
          </Text>
          
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(50, 100, 100)',
  },
  title: {
    margin: 10,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'yellow',
  },
  anglevalue: {
    margin: 10,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'yellow',
  },
  textContainer: {
    position: 'absolute',
    top: 40,
  },
  target: {
    position: 'relative',
    backgroundColor: 'yellow',
    height: 50,
    width: 50,
    borderRadius: 25,
  },
});