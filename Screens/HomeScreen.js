import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Button, Searchbar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const HOME_EVENTS = [
  {
    id: '1',
    title: 'Morning Yoga',
    time: '08:30-09:15',
    location: 'Community Hall',
    spots: 5,
    tags: ['Fitness', 'Today'],
    description: 'Enjoy a refreshing yoga session to start your day. This class is for beginners or all levels, focusing on strength, flexibility, and mental calm.'
  },
  {
    id: '2',
    title: 'Trail Walk',
    time: '11:30-14:30',
    location: 'Forest Trails',
    spots: 15,
    tags: ['Fitness', 'Today', 'Social', 'Outdoors'],
    description: 'Join a guided group walk through the scenic Forest Trails. A great way to stay active and meet neighbors.'
  },
];

const CATEGORIES = ['All', 'Today', 'Fitness', 'Athletics', 'Music', 'Social', 'Outdoors', 'Family'];

export default function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredEvents = HOME_EVENTS.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || event.tags.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Welcome Card */}
      <View style={styles.card}>
        <Text variant="headlineSmall" style={styles.welcomeTitle}>Welcome</Text>
        <Text variant="bodyMedium" style={styles.welcomeSubtitle}>
          Find and register for Community Events
        </Text>
        <Button
          mode="contained"
          style={styles.primaryButton}
          buttonColor="#2374AB"
          onPress={() => navigation.navigate('Events')}
        >
          View Today's Events
        </Button>
      </View>

      {/* Search Bar & Interactive Category Chips */}
      <View style={styles.card}>
        <Searchbar
          placeholder="Search Events..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
        />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipRow}>
          {CATEGORIES.map((chip) => {
            const isSelected = selectedCategory === chip;
            return (
              <TouchableOpacity
                key={chip}
                style={[styles.chip, isSelected && styles.activeChip]}
                onPress={() => setSelectedCategory(chip)}
                accessibilityRole="button"
                accessibilityState={{ selected: isSelected }}
              >
                <Text style={[styles.chipText, isSelected && styles.activeChipText]}>
                  {chip}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Dynamic Section Header */}
      <Text variant="titleMedium" style={styles.sectionHeader}>
        Showing: {selectedCategory} - {filteredEvents.length} result{filteredEvents.length === 1 ? '' : 's'}
      </Text>

      {/* Filtered Events List or Empty State */}
      {filteredEvents.length > 0 ? (
        filteredEvents.map((event) => (
          <TouchableOpacity
            key={event.id}
            style={styles.eventCard}
            onPress={() => navigation.navigate('EventDetails', { event })}
          >
            <View style={styles.eventRow}>
              <Text variant="titleMedium" style={styles.eventTitle}>{event.title}</Text>
              <View style={styles.timeBadge}>
                <Ionicons name="time-outline" size={14} color="#64748B" />
                <Text style={styles.timeText}> {event.time}</Text>
              </View>
            </View>
            <Text style={styles.locationText}>
              {event.location} • Spots remaining: {event.spots}
            </Text>
            <View style={styles.tagRow}>
              {event.tags.map((tag, i) => (
                <View key={i} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <View style={styles.emptyCard}>
          <Ionicons name="search" size={40} color="#64748B" style={{ marginBottom: 8 }} />
          <Text variant="titleMedium" style={styles.emptyTitle}>
            No events match "{selectedCategory}"
          </Text>
          <Button
            mode="contained"
            buttonColor="#2374AB"
            style={{ marginTop: 12, borderRadius: 8 }}
            onPress={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
          >
            Clear filters
          </Button>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#2374AB' },
  contentContainer: { padding: 16, paddingBottom: 30 },
  card: { backgroundColor: '#FFFFFF', padding: 16, borderRadius: 12, marginBottom: 16 },
  welcomeTitle: { fontWeight: 'bold', color: '#1E293B', marginBottom: 4 },
  welcomeSubtitle: { color: '#64748B', marginBottom: 12 },
  primaryButton: { borderRadius: 8, marginTop: 4, minHeight: 44, justifyContent: 'center' },
  searchBar: { backgroundColor: '#F1F5F9', elevation: 0, marginBottom: 12 },
  chipRow: { flexDirection: 'row', marginBottom: 4 },
  chip: {
    backgroundColor: '#E2E8F0',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 16,
    marginRight: 8,
    minHeight: 44,
    justifyContent: 'center',
  },
  activeChip: { backgroundColor: '#2374AB' },
  chipText: { fontSize: 13, fontWeight: '600', color: '#334155' },
  activeChipText: { color: '#FFFFFF' },
  sectionHeader: { color: '#FFFFFF', fontWeight: 'bold', marginBottom: 12, marginTop: 4 },
  eventCard: { backgroundColor: '#FFFFFF', padding: 16, borderRadius: 12, marginBottom: 12 },
  eventRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  eventTitle: { fontWeight: 'bold', color: '#1E293B' },
  timeBadge: { flexDirection: 'row', alignItems: 'center' },
  timeText: { fontSize: 12, color: '#64748B' },
  locationText: { color: '#64748B', marginBottom: 10, fontSize: 13 },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap' },
  tag: { backgroundColor: '#E0F2FE', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, marginRight: 6, marginBottom: 4 },
  tagText: { fontSize: 11, color: '#0369A1', fontWeight: 'bold' },
  emptyCard: { backgroundColor: '#FFFFFF', padding: 28, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  emptyTitle: { fontWeight: 'bold', color: '#1E293B', textAlign: 'center' },
});