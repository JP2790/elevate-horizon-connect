import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Button, Searchbar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Welcome Card */}
      <View style={styles.card}>
        <Text variant="headlineSmall" style={styles.welcomeTitle}>Welcome</Text>
        <Text variant="bodyMedium" style={styles.welcomeSubtitle}>Find and register for Community Events</Text>
        <Button 
          mode="contained" 
          style={styles.primaryButton}
          buttonColor="#2374AB"
          onPress={() => navigation.navigate('Events')}
        >
          View Today's Events
        </Button>
      </View>

      {/* Search Bar & Category Chips */}
      <View style={styles.card}>
        <Searchbar
          placeholder="Search Events..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
        />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipRow}>
          {['Athletics', 'Today', 'Fitness', 'Music', 'Social', 'Outdoors', 'Family'].map((chip, index) => (
            <TouchableOpacity key={index} style={styles.chip}>
              <Text style={styles.chipText}>{chip}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Today's Events Section */}
      <Text variant="titleMedium" style={styles.sectionHeader}>Showing: Today - 2 result</Text>
      
      <TouchableOpacity 
        style={styles.eventCard}
        onPress={() => navigation.navigate('EventDetails')}
      >
        <View style={styles.eventRow}>
          <Text variant="titleMedium" style={styles.eventTitle}>Morning Yoga</Text>
          <View style={styles.timeBadge}>
            <Ionicons name="time-outline" size={14} color="#64748B" />
            <Text style={styles.timeText}> 08:30-09:15</Text>
          </View>
        </View>
        <Text variant="bodySmall" style={styles.locationText}>Community Hall • Spots remaining: 5</Text>
        <View style={styles.tagRow}>
          <View style={styles.tag}><Text style={styles.tagText}>Fitness</Text></View>
          <View style={styles.tag}><Text style={styles.tagText}>Today</Text></View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.eventCard}
        onPress={() => navigation.navigate('EventDetails')}
      >
        <View style={styles.eventRow}>
          <Text variant="titleMedium" style={styles.eventTitle}>Trail Walk</Text>
          <View style={styles.timeBadge}>
            <Ionicons name="time-outline" size={14} color="#64748B" />
            <Text style={styles.timeText}> 11:30-14:30</Text>
          </View>
        </View>
        <Text variant="bodySmall" style={styles.locationText}>Forest Trails • Spots remaining: 15</Text>
        <View style={styles.tagRow}>
          <View style={styles.tag}><Text style={styles.tagText}>Fitness</Text></View>
          <View style={styles.tag}><Text style={styles.tagText}>Today</Text></View>
          <View style={styles.tag}><Text style={styles.tagText}>Social</Text></View>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#2374AB' },
  contentContainer: { padding: 16, paddingBottom: 30 },
  card: { backgroundColor: '#FFFFFF', padding: 16, borderRadius: 12, marginBottom: 16 },
  welcomeTitle: { fontWeight: 'bold', color: '#1E293B', marginBottom: 4 },
  welcomeSubtitle: { color: '#64748B', marginBottom: 12 },
  primaryButton: { borderRadius: 8, marginTop: 4 },
  searchBar: { backgroundColor: '#F1F5F9', elevation: 0, marginBottom: 12 },
  chipRow: { flexDirection: 'row', marginBottom: 4 },
  chip: { backgroundColor: '#E2E8F0', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 16, marginRight: 8, minHeight: 36, justifyContent: 'center' },
  chipText: { fontSize: 12, fontWeight: '600', color: '#334155' },
  sectionHeader: { color: '#FFFFFF', fontWeight: 'bold', marginBottom: 12, marginTop: 4 },
  eventCard: { backgroundColor: '#FFFFFF', padding: 16, borderRadius: 12, marginBottom: 12 },
  eventRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  eventTitle: { fontWeight: 'bold', color: '#1E293B' },
  timeBadge: { flexDirection: 'row', alignItems: 'center' },
  timeText: { fontSize: 12, color: '#64748B' },
  locationText: { color: '#64748B', marginBottom: 10 },
  tagRow: { flexDirection: 'row' },
  tag: { backgroundColor: '#E0F2FE', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, marginRight: 6 },
  tagText: { fontSize: 10, color: '#0369A1', fontWeight: 'bold' }
});