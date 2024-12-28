import React from 'react';
import { View, StyleSheet } from 'react-native';
import TimezoneClock from './components/TimezoneClock';

const App = () => {
  return (
    <View style={styles.container}>
      <TimezoneClock />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

export default App;