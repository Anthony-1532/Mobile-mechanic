import { StatusBar } from "expo-status-bar";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

const featureGroups = [
  {
    title: "Booking & Scheduling",
    items: ["24/7 online booking (home/work)", "Automated SMS + email reminders", "GPS route optimization sequencing", "Google/Outlook calendar sync"]
  },
  {
    title: "Job & Customer Management",
    items: ["Digital vehicle inspections with photo/video", "VIN + license plate scanning workflow", "Customer portal for records and quotes", "Electronic signatures on estimates/invoices"]
  },
  {
    title: "Invoicing & Payments",
    items: ["On-site branded PDF invoices", "Credit card, Apple Pay, and Google Pay", "QuickBooks/Xero synchronization"]
  },
  {
    title: "Inventory & Operations",
    items: ["On-truck inventory tracking + reorder points", "Offline-first data capture and sync", "Two-way SMS/WhatsApp messaging", "Labor guides, mileage, and expense tracking"]
  }
];

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.kicker}>Figma-ready product foundation</Text>
        <Text style={styles.title}>Mobile Mechanic Platform</Text>
        <Text style={styles.subtitle}>Clean professional frontend for iOS, Android, and web with modular domain feature blocks.</Text>

        {featureGroups.map((group) => (
          <View key={group.title} style={styles.card}>
            <Text style={styles.cardTitle}>{group.title}</Text>
            {group.items.map((item) => (
              <Text key={item} style={styles.item}>• {item}</Text>
            ))}
          </View>
        ))}

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Summary of Popular Mobile Mechanic Platforms</Text>
          <Text style={styles.item}>• Fullbay: strong shop operations + parts workflows</Text>
          <Text style={styles.item}>• AutoLeap: scheduling, CRM, and invoicing focus</Text>
          <Text style={styles.item}>• Housecall Pro: field-service dispatch + payments</Text>
          <Text style={styles.item}>• Shopmonkey: integrated repair orders and reporting</Text>
        </View>
      </ScrollView>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F4F7FB" },
  content: { padding: 20, gap: 14 },
  kicker: { color: "#3457D5", fontWeight: "700", marginTop: 8 },
  title: { fontSize: 30, fontWeight: "800", color: "#0F172A" },
  subtitle: { fontSize: 15, color: "#475569", lineHeight: 22 },
  card: { backgroundColor: "#FFFFFF", borderRadius: 14, padding: 16, borderWidth: 1, borderColor: "#E2E8F0" },
  cardTitle: { fontSize: 18, fontWeight: "700", color: "#111827", marginBottom: 8 },
  item: { fontSize: 14, color: "#334155", lineHeight: 21 }
});
