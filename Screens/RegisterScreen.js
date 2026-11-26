import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

export default function RegisterScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text variant="headlineSmall" style={styles.title}>Register for Event</Text>
        <Text variant="bodyMedium">Registration form coming on Day 5.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2374AB',
    padding: 16,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
});