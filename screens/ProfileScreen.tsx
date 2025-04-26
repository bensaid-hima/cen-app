"use client"

import type React from "react"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, Switch, StatusBar, Platform } from "react-native"
import { Feather } from "@expo/vector-icons"

export default function ProfileScreen() {
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)

  const renderSectionHeader = (title: string) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  )

  const renderSettingRow = (
    label: string,
    icon: string,
    iconColor: string,
    onPress?: () => void,
    rightElement?: React.ReactNode,
  ) => (
    <TouchableOpacity style={styles.settingRow} onPress={onPress} disabled={!onPress} activeOpacity={onPress ? 0.7 : 1}>
      <View style={styles.settingLeft}>
        <View style={[styles.iconContainer, { backgroundColor: `${iconColor}15` }]}>
          <Feather name={icon as any} size={18} color={iconColor} />
        </View>
        <Text style={styles.settingLabel}>{label}</Text>
      </View>
      {rightElement || <Feather name="chevron-right" size={20} color="#ccc" />}
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Feather name="user" size={40} color="#666" />
              </View>
              <TouchableOpacity style={styles.editAvatarButton}>
                <Feather name="edit-2" size={14} color="#fff" />
              </TouchableOpacity>
            </View>

            <View style={styles.profileInfo}>
              <Text style={styles.name}>Guest User</Text>
              <Text style={styles.email}>guest@example.com</Text>
              <TouchableOpacity style={styles.editProfileButton} onPress={() => Alert.alert("Coming soon")}>
                <Text style={styles.editProfileText}>Edit Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Reading Preferences */}
        {renderSectionHeader("Reading Preferences")}
        <View style={styles.settingsSection}>
          {renderSettingRow(
            "Dark Mode",
            "moon",
            "#6C5CE7",
            undefined,
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: "#e0e0e0", true: "#B4000050" }}
              thumbColor={darkMode ? "#B40000" : "#f4f3f4"}
              ios_backgroundColor="#e0e0e0"
            />,
          )}
          {renderSettingRow("Text Size", "type", "#00B894", () => Alert.alert("Adjust text size for better reading"))}
          {renderSettingRow(
            "Notifications",
            "bell",
            "#F39C12",
            undefined,
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: "#e0e0e0", true: "#B4000050" }}
              thumbColor={notifications ? "#B40000" : "#f4f3f4"}
              ios_backgroundColor="#e0e0e0"
            />,
          )}
        </View>

        {/* Account */}
        {renderSectionHeader("Account")}
        <View style={styles.settingsSection}>
          {renderSettingRow("Saved Articles", "bookmark", "#2980B9", () => Alert.alert("View all your saved articles"))}
          {renderSettingRow("Reading History", "clock", "#8E44AD", () => Alert.alert("View your reading history"))}
          {renderSettingRow("Interests", "tag", "#E74C3C", () => Alert.alert("Manage your topic interests"))}
        </View>

        {/* Support */}
        {renderSectionHeader("Support")}
        <View style={styles.settingsSection}>
          {renderSettingRow("Help Center", "help-circle", "#3498DB", () => Alert.alert("View help articles"))}
          {renderSettingRow("Send Feedback", "mail", "#27AE60", () => Alert.alert("Email us at support@example.com"))}
          {renderSettingRow("About", "info", "#F1C40F", () => Alert.alert("About this app"))}
        </View>

        {/* Danger Zone */}
        {renderSectionHeader("Danger Zone")}
        <View style={styles.settingsSection}>
          {renderSettingRow("Clear Saved Articles", "trash-2", "#E74C3C", () =>
            Alert.alert("Clear Saved Articles", "Are you sure you want to delete all saved articles?", [
              { text: "Cancel", style: "cancel" },
              { text: "Clear All", style: "destructive", onPress: () => Alert.alert("Articles cleared") },
            ]),
          )}
          {renderSettingRow("Log Out", "log-out", "#E74C3C", () => Alert.alert("Log out of your account"))}
        </View>

        {/* App Version */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: "#111",
    letterSpacing: -0.5,
  },
  profileCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 24,
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    position: "relative",
    marginRight: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  editAvatarButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#B40000",
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111",
    marginBottom: 4,
  },
  email: {
    color: "#666",
    fontSize: 14,
    marginBottom: 12,
  },
  editProfileButton: {
    backgroundColor: "#f5f5f5",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  editProfileText: {
    color: "#555",
    fontSize: 13,
    fontWeight: "600",
  },
  sectionHeader: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "transparent",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#666",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  settingsSection: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 24,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    alignItems: "center",
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  settingLabel: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  versionContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  versionText: {
    fontSize: 14,
    color: "#999",
  },
})
