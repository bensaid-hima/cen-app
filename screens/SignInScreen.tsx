"use client"

import { useState, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Dimensions,
  StatusBar,
  Animated,
} from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Feather } from "@expo/vector-icons"

const { width } = Dimensions.get("window")

// Add onSignIn prop to handle authentication state
type SignInScreenProps = {
  onSignIn: () => void
}

export default function SignInScreen({ onSignIn }: SignInScreenProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Animation values
  const fadeAnim = useState(new Animated.Value(0))[0]
  const slideAnim = useState(new Animated.Value(50))[0]

  useEffect(() => {
    // Start animations when component mounts
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start()
  }, [])

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true)
      setError(null)

      // Simulate loading for a more realistic experience
      setTimeout(() => {
        // Call the onSignIn function to update authentication state
        onSignIn()
        setLoading(false)
      }, 1500) // Show loading for 1.5 seconds for demo purposes
    } catch (err: any) {
      setError("An error occurred during sign in")
      setLoading(false)
    }
  }

  return (
    <LinearGradient
      colors={["#B40000", "#8A0000"]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <StatusBar barStyle="light-content" backgroundColor="#B40000" />

      <Animated.View
        style={[
          styles.contentContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        {/* Logo and Branding */}
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <LinearGradient
              colors={["rgba(255,255,255,0.3)", "rgba(255,255,255,0.1)"]}
              style={styles.logoGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Feather name="book-open" size={48} color="#fff" />
            </LinearGradient>
          </View>
          <Text style={styles.logoText}>Center for</Text>
          <Text style={styles.logoTextBold}>Education News</Text>
        </View>

        {/* Welcome Text */}
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Welcome</Text>
          <Text style={styles.subtitleText}>Your trusted source for education news and insights</Text>
        </View>

        {/* Sign In Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.googleButton}
            onPress={handleGoogleSignIn}
            disabled={loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#B40000" />
            ) : (
              <>
                <Image
                  source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" }}
                  style={styles.googleIcon}
                />
                <Text style={styles.buttonText}>Sign in with Google</Text>
              </>
            )}
          </TouchableOpacity>

          {error && (
            <View style={styles.errorContainer}>
              <Feather name="alert-circle" size={16} color="#fff" />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}
        </View>

        {/* Footer Text */}
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>By continuing, you agree to our Terms of Service and Privacy Policy</Text>
        </View>
      </Animated.View>

      {/* Decorative Elements */}
      <View style={styles.decorCircle1} />
      <View style={styles.decorCircle2} />
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    overflow: "hidden",
  },
  contentContainer: {
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
    zIndex: 2,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 60,
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logoGradient: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  logoText: {
    fontSize: 20,
    color: "rgba(255,255,255,0.9)",
    fontWeight: "400",
    textAlign: "center",
  },
  logoTextBold: {
    fontSize: 28,
    fontWeight: "800",
    color: "#fff",
    textAlign: "center",
    letterSpacing: -0.5,
  },
  welcomeContainer: {
    alignItems: "center",
    marginBottom: 50,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 12,
    textAlign: "center",
  },
  subtitleText: {
    fontSize: 16,
    color: "rgba(255,255,255,0.8)",
    textAlign: "center",
    maxWidth: 280,
    lineHeight: 22,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 30,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    width: "100%",
    maxWidth: 300,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 12,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
    width: "100%",
    maxWidth: 300,
  },
  errorText: {
    color: "#fff",
    marginLeft: 8,
    fontSize: 14,
  },
  footerContainer: {
    position: "absolute",
    bottom: -100,
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  footerText: {
    fontSize: 12,
    color: "rgba(255,255,255,0.7)",
    textAlign: "center",
  },
  decorCircle1: {
    position: "absolute",
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: width * 0.4,
    backgroundColor: "rgba(255,255,255,0.05)",
    top: -width * 0.4,
    right: -width * 0.2,
    zIndex: 1,
  },
  decorCircle2: {
    position: "absolute",
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: width * 0.3,
    backgroundColor: "rgba(255,255,255,0.05)",
    bottom: -width * 0.3,
    left: -width * 0.2,
    zIndex: 1,
  },
})
