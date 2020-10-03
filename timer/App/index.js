import React, { Component } from 'react';
import { StatusBar, Text, View, StyleSheet, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { Picker } from '@react-native-community/picker';

const screen = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#07121B',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    borderWidth: 10,
    borderColor: '#89AAFF',
    width: screen.width / 2,
    height: screen.width / 2,
    borderRadius: screen.width / 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30
  },
  buttonStop: {
    borderColor: '#FF851B'
  },
  buttonText: {
    fontSize: 45,
    color: '#89AAFF'
  },
  buttonStopText: {
    color: '#FF851B'
  },
  timerText: {
    color: '#fff',
    fontSize: 90
  },
  picker: {
    width: 50,
    ...Platform.select({
      android: {
        color: '#fff',
        backgroundColor: '#07121B',
        marginLeft: 10
      }
    })
  },
  pickerItem: {
    color: '#fff',
    fontSize: 20,
    
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});

const DEFAULT_TIMER = 5;
const formatNumber = number => `0${number}`.slice(-2);

const getRemaining = time => {
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;
  return { minutes: formatNumber(minutes), seconds: formatNumber(seconds) };
};

const createArray = length => {
  const arr = [];
  let i = 0;
  while (i < length) {
    arr.push(i.toString());
    i += 1;
  }
  return arr;
};
const AVAILABLE_MINUTES = createArray(10);
const AVAILABLE_SECONDS = createArray(60);

export default class App extends Component {
  state = {
    remainingSeconds: DEFAULT_TIMER,
    isRunning: false,
    selectedMinutes: '0',
    selectedSeconds: '5',
  }

  componentDidUpdate(prevProp, prevState) {
    if (this.state.remainingSeconds === 0 && prevState.remainingSeconds !== 0){
      this.stop();
    }
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  start = () => {
    this.setState(prevState => ({ 
      remainingSeconds: parseInt(prevState.selectedMinutes * 60, 10) + parseInt(prevState.selectedSeconds, 10),
      isRunning: true
    }));
  
    this.interval = setInterval(() => {
      this.setState(prevState => ({ 
        remainingSeconds: prevState.remainingSeconds - 1 
      }));
    }, 1000);
  };

  stop = () => {
    clearInterval(this.interval);
    this.interval = null;
    this.setState({ remainingSeconds: DEFAULT_TIMER, isRunning: false });
  }

  renderPickers = () => {
    const { selectedMinutes, selectedSeconds } = this.state;

    return (
      <View style={styles.pickerContainer}>
        <Picker
          style={styles.picker}
          itemStyle={styles.pickerItem}
          selectedValue={selectedMinutes}
          onValueChange={itemValue => {
            this.setState({ selectedMinutes: itemValue });
          }}
          mode="dropdown"
        >
          {AVAILABLE_MINUTES.map(value => (
            <Picker.Item key={value} label={value} value={value} />
          ))}
        </Picker>
        <Text style={styles.pickerItem}>minutes</Text>
        <Picker
          style={styles.picker}
          itemStyle={styles.pickerItem}
          selectedValue={selectedSeconds}
          onValueChange={itemValue => {
            this.setState({ selectedSeconds: itemValue });
          }}
          mode="dropdown"
        >
          {AVAILABLE_SECONDS.map(value => (
            <Picker.Item key={value} label={value} value={value} />
          ))}
        </Picker>
        <Text style={styles.pickerItem}>seconds</Text>
      </View>
    );
  }

  render() {
    const { remainingSeconds, isRunning } = this.state;
    const { minutes, seconds } = getRemaining(remainingSeconds);

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        { isRunning ? <Text style={styles.timerText}>{`${minutes}:${seconds}`}</Text> : this.renderPickers()}
        
        {
          isRunning ? (
            <TouchableOpacity onPress={this.stop} style={[styles.button, styles.buttonStop]}>
              <Text style={[styles.buttonText, styles.buttonStopText]}>Stop</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={this.start} style={styles.button}>
              <Text style={styles.buttonText}>Start</Text>
            </TouchableOpacity>
          )
        }
      </View>
    );
  }
}
