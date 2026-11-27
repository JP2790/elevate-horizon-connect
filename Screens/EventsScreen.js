import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Searchbar, Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const ALL_EVENTS = [
  { id: '1', title: 'Morning Yoga', time: '08:30-09:15', location: 'Community Hall', spots: 5, tags: ['Fitness', 'Today'] },
  { id: '2', title: 'Trail Walk', time: '11:30-14:30', location: 'Forest Trails', spots: 15, tags: ['Fitness', 'Today', 'Social'] },
  { id: '3', title: 'Beach Run', time: '11:40-15:30', location: 'Sandy Beach', spots: 3, tags: ['Fitness', 'Outdoors'] },
];

export default function EventsScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filteredEvents = ALL_EVENTS.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          event.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedFilter === 'All' || event.tags.includes(selectedFilter);
    return matchesSearch && matchesCategory;
  });

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Search and Filters Card */}
      <View style={styles.card}>
        <Searchbar
          placeholder="Search Events..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
        />
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipRow}>
          {['All', 'Today', 'Fitness', 'Social', 'Outdoors', 'Family', 'Music', 'Athletics'].map((filter, index) => (
            <TouchableOpacity 
              key={index} 
              style={[styles.chip, selectedFilter === filter && styles.activeChip]}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text style={[styles.chipText, selectedFilter === filter && styles.activeChipText]}>{filter}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.filterFooter}>
          <Text style={styles.dateText}>📅 Today - Mon 24 Aug</Text>
          <TouchableOpacity onPress={() => { setSearchQuery(''); setSelectedFilter('All'); }}>
            <Text style={styles.clearText}>Clear filters</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text variant="titleMedium" style={styles.sectionHeader}>
        Showing: {selectedFilter} - {filteredEvents.length} result(s)
      </Text>

      {/* Event List or Empty State (EventsNotFound) */}
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
            <Text variant="bodySmall" style={styles.locationText}>{event.location} • Spots remaining: {event.spots}</Text>
            <View style={styles.tagRow}>
              {event.tags.map((tag, i) => (
                <View key={i} style={styles.tag}><Text style={styles.tagText}>{tag}</Text></View>
              ))}
            </View>
          </TouchableOpacity>
        ))
      ) : (
        /* EventsNotFound State */
        <View style={styles.emptyCard}>
          <Ionicons name="search" size={48} color="#64748B" style={{ marginBottom: 12 }} />
          <Text variant="titleMedium" style={styles.emptyTitle}>No events match these filters</Text>
          <Button 
            mode="contained" 
            buttonColor="#2374AB"
            style={{ marginTop: 12 }}
            onPress={() => { setSearchQuery(''); setSelectedFilter('All'); }}
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
  searchBar: { backgroundColor: '#F1F5F9', elevation: 0, marginBottom: 12 },
  chipRow: { flexDirection: 'row', marginBottom: 12 },
  chip: { backgroundColor: '#E2E8F0', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 16, marginRight: 8, minHeight: 36, justifyContent: 'center' },
  activeChip: { backgroundColor: '#2374AB' },
  chipText: { fontSize: 12, fontWeight: '600', color: '#334155' },
  activeChipText: { color: '#FFFFFF' },
  filterFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 4, borderTopWidth: 1, borderTopColor: '#F1F5F9' },
  dateText: { fontSize: 12, color: '#64748B', fontWeight: '500' },
  clearText: { fontSize: 12, color: '#2374AB', fontWeight: 'bold' },
  sectionHeader: { color: '#FFFFFF', fontWeight: 'bold', marginBottom: 12, marginTop: 4 },
  eventCard: { backgroundColor: '#FFFFFF', padding: 16, borderRadius: 12, marginBottom: 12 },
  eventRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  eventTitle: { fontWeight: 'bold', color: '#1E293B' },
  timeBadge: { flexDirection: 'row', alignItems: 'center' },
  timeText: { fontSize: 12, color: '#64748B' },
  locationText: { color: '#64748B', marginBottom: 10 },
  tagRow: { flexDirection: 'row' },
  tag: { backgroundColor: '#E0F2FE', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, marginRight: 6 },
  tagText: { fontSize: 10, color: '#0369A1', fontWeight: 'bold' },
  emptyCard: { backgroundColor: '#FFFFFF', padding: 32, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginTop: 10 },
  emptyTitle: { fontWeight: 'bold', color: '#1E293B', textAlign: 'center' }
});