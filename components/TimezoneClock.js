// components/TimezoneClock.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const TimezoneClock = () => {
  const [time, setTime] = useState(new Date());
  const [hourRotation] = useState(new Animated.Value(0));
  const [minuteRotation] = useState(new Animated.Value(0));
  const [secondRotation] = useState(new Animated.Value(0));

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      setTime(now);

      const hours = now.getHours() % 12; // Chỉ lấy giờ trong phạm vi 12 giờ
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();

      // Tính toán góc xoay của từng kim
      const hourAngle = (360 / 12) * hours + (360 / 12) * (minutes / 60);
      const minuteAngle = (360 / 60) * minutes + (360 / 60) * (seconds / 60);
      const secondAngle = (360 / 60) * seconds;

      // Cập nhật các góc xoay
      Animated.timing(hourRotation, {
        toValue: hourAngle,
        duration: 1000,
        useNativeDriver: true,
      }).start();

      Animated.timing(minuteRotation, {
        toValue: minuteAngle,
        duration: 1000,
        useNativeDriver: true,
      }).start();

      Animated.timing(secondRotation, {
        toValue: secondAngle,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }, 1000);

    return () => clearInterval(intervalId);
  }, [hourRotation, minuteRotation, secondRotation]);

  // Hàm để vẽ các số trên đồng hồ
  const renderClockNumbers = () => {
    const numbers = [];
    for (let i = 1; i <= 12; i++) {
      const angle = (i * 30) * (Math.PI / 180); // Tính góc cho mỗi số
      const x = Math.cos(angle) * 75; // Vị trí x của số (cách tâm 75px)
      const y = Math.sin(angle) * 75; // Vị trí y của số (cách tâm 75px)
      numbers.push(
        <Text key={i} style={[styles.clockNumber, { transform: [{ translateX: x }, { translateY: y }] }]}>
          {i}
        </Text>
      );
    }
    return numbers;
  };

  return (
    <View style={styles.clockContainer}>
      <View style={styles.clockFace}>
        {/* Kim giờ */}
        <Animated.View
          style={[
            styles.hourHand,
            { transform: [{ rotate: hourRotation.interpolate({ inputRange: [0, 360], outputRange: ['0deg', '360deg'] }) }] },
          ]}
        />
        {/* Kim phút */}
        <Animated.View
          style={[
            styles.minuteHand,
            { transform: [{ rotate: minuteRotation.interpolate({ inputRange: [0, 360], outputRange: ['0deg', '360deg'] }) }] },
          ]}
        />
        {/* Kim giây */}
        <Animated.View
          style={[
            styles.secondHand,
            { transform: [{ rotate: secondRotation.interpolate({ inputRange: [0, 360], outputRange: ['0deg', '360deg'] }) }] },
          ]}
        />
        {/* Số trên đồng hồ */}
        {renderClockNumbers()}
      </View>
      <Text style={styles.timeText}>
        {time.toLocaleTimeString()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  clockContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  clockFace: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 10,
    borderColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  hourHand: {
    position: 'absolute',
    width: 8,
    height: 50,
    backgroundColor: '#333',
    top: 50,
    left: 96, // Căn kim vào giữa
    transformOrigin: '50% 100%',
  },
  minuteHand: {
    position: 'absolute',
    width: 4,
    height: 70,
    backgroundColor: '#555',
    top: 30,
    left: 98, // Căn kim vào giữa
    transformOrigin: '50% 100%',
  },
  secondHand: {
    position: 'absolute',
    width: 2,
    height: 80,
    backgroundColor: '#f00',
    top: 20,
    left: 99, // Căn kim vào giữa
    transformOrigin: '50% 100%',
  },
  centerCircle: {
    width: 10,
    height: 10,
    backgroundColor: '#333',
    borderRadius: 5,
    position: 'absolute',
  },
  timeText: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  clockNumber: {
    position: 'absolute',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default TimezoneClock;
