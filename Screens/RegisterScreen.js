import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';

export default function RegisterScreen({ route, navigation }) {
  const selectedEvent = route?.params?.event || { title: 'Family Movie Night' };

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleRegister = () => {
    if (!name || !email) {
      Alert.alert('Missing Fields', 'Please enter your Full Name and Email to register.');
      return;
    }
    Alert.alert(
      'Registration Success!',
      `You have successfully registered for ${selectedEvent.title}.`,
      [{ text: 'OK', onPress: () => navigation.navigate('MainTabs') }]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.card}>
        <Text variant="titleMedium" style={styles.sectionLabel}>Select an event</Text>
        <View style={styles.eventSelector}>
          <Text style={styles.selectedEventText}>📅 {selectedEvent.title}</Text>
        </View>

        <TextInput
          label="Full name *"
          value={name}
          onChangeText={setName}
          mode="outlined"
          style={styles.input}
          right={<TextInput.Icon icon="close" onPress={() => setName('')} />}
        />

        <TextInput
          label="Email *"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          keyboardType="email-address"
          style={styles.input}
          right={<TextInput.Icon icon="close" onPress={() => setEmail('')} />}
        />

        <TextInput
          label="Phone (optional)"
          value={phone}
          onChangeText={setPhone}
          mode="outlined"
          keyboardType="phone-pad"
          style={styles.input}
          right={<TextInput.Icon icon="close" onPress={() => setPhone('')} />}
        />

        <Button 
          mode="contained" 
          buttonColor="#2374AB"
          style={styles.submitButton}
          onPress={handleRegister}
        >
          Submit Registration
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#2374AB' },
  contentContainer: { padding: 16 },
  card: { backgroundColor: '#FFFFFF', padding: 20, borderRadius: 12 },
  sectionLabel: { color: '#64748B', marginBottom: 6, fontSize: 12, fontWeight: 'bold' },
  eventSelector: { borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 8, padding: 14, backgroundColor: '#F8FAFC', marginBottom: 16 },
  selectedEventText: { fontWeight: '600', color: '#1E293B' },
  input: { marginBottom: 12, backgroundColor: '#FFFFFF' },
  submitButton: { borderRadius: 8, marginTop: 8 }
});