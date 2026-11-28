import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

export default function EventDetailsScreen({ route, navigation }) {
  const event = route?.params?.event || {
    title: 'Morning Yoga',
    time: '08:30-09:15',
    location: 'Community Hall',
    spots: 5,
    tags: ['Fitness', 'Today'],
    description: 'Enjoy a refreshing yoga session to start your day. This class is for beginners or all levels, and details the types of poses, any props used, and the overall pace and goals, like building strength, flexibility, or mental calm.'
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.card}>
        <Text variant="headlineSmall" style={styles.title}>{event.title}</Text>
        <Text variant="bodyMedium" style={styles.description}>
          {event.description || 'Join us for this community event! Enjoy a great session with neighbors and friends.'}
        </Text>

        <View style={styles.metaRow}>
          <Ionicons name="time-outline" size={18} color="#64748B" />
          <Text style={styles.metaText}> {event.time}</Text>
        </View>

        <View style={styles.metaRow}>
          <Ionicons name="location-outline" size={18} color="#64748B" />
          <Text style={styles.metaText}> {event.location}</Text>
        </View>

        <View style={styles.metaRow}>
          <Ionicons name="people-outline" size={18} color="#64748B" />
          <Text style={styles.metaText}> Spots remaining: {event.spots}</Text>
        </View>

        <View style={styles.tagRow}>
          {event.tags?.map((tag, i) => (
            <View key={i} style={styles.tag}><Text style={styles.tagText}>{tag}</Text></View>
          ))}
        </View>

        <Button 
          mode="contained" 
          buttonColor="#2374AB"
          style={styles.registerButton}
          onPress={() => navigation.navigate('RegisterEvent', { event })}
        >
          Register
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#2374AB' },
  contentContainer: { padding: 16 },
  card: { backgroundColor: '#FFFFFF', padding: 20, borderRadius: 12 },
  title: { fontWeight: 'bold', color: '#1E293B', marginBottom: 12 },
  description: { color: '#334155', lineHeight: 22, marginBottom: 16 },
  metaRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  metaText: { color: '#64748B', fontSize: 14 },
  tagRow: { flexDirection: 'row', marginTop: 8, marginBottom: 20 },
  tag: { backgroundColor: '#E0F2FE', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6, marginRight: 6 },
  tagText: { fontSize: 12, color: '#0369A1', fontWeight: 'bold' },
  registerButton: { borderRadius: 8, marginTop: 8 }
});