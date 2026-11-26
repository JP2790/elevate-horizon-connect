import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

export default function EventDetailsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text variant="headlineSmall" style={styles.title}>Event Details</Text>
        <Text variant="bodyMedium">Full event info and Register button coming on Day 4.</Text>
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