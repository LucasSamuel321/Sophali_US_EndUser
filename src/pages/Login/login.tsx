
import { ThemedText } from '@/src/components/ThemedText';
import { ThemedView } from '@/src/components/ThemedView';
import { toast } from '@/src/hooks/use-toast';
import useAuth from '@/src/hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const { signin } = useAuth();
  const navigation = useNavigation();


  const login = async () => {
    
    if(!email || !password) {
      toast({
        title: 'Enter correctly!',
        type: 'error',
        description: "Enter correctly!"
      });
      return;
    }
    await signin({ email: email.trim(), password: password.trim()})
 
  }


  return (
    <ThemedView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.container}>
  
          {/* Card */}
          <View style={styles.card}>
            <ThemedText type="title" style={styles.title}>Welcome Back!</ThemedText>
            <ThemedText style={styles.subtitle}>Sign in to your account</ThemedText>

            {/* Email */}
            <ThemedText style={styles.label}>Email</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="example@gmail.com"
              placeholderTextColor="#A0A0A0"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
            />

            {/* Password */}
            <ThemedText style={styles.label}>Password</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="••••••••••••"
              placeholderTextColor="#A0A0A0"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            {/* Remember me & Forgot password */}
            <View style={styles.row}>
              <Pressable style={styles.checkboxRow} onPress={() => setRememberMe(v => !v)}>
                <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                  {rememberMe && <View style={styles.checkboxDot} />}
                </View>
                <ThemedText style={styles.rememberMe}>Remember me</ThemedText>
              </Pressable>
              <TouchableOpacity style={styles.forgot} onPress={() => {}}>
                <ThemedText style={styles.forgotText}>Forgot password?</ThemedText>
              </TouchableOpacity>
            </View>

            {/* Sign In Button */}
            <TouchableOpacity style={styles.signInButton} onPress={login}>
              <ThemedText style={styles.signInButtonText}>SIGN IN</ThemedText>
            </TouchableOpacity>
          </View>

          {/* Sign Up Link */}
          <View style={styles.signUpRow}>
            <ThemedText style={styles.signUpText}>Don't have an account? </ThemedText>
            <TouchableOpacity onPress={() => { navigation.navigate('Register' as never) }}>
              <ThemedText style={styles.signUpLink}>Sign Up</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingTop: 4,
  },

  card: {
    width: '95%',
    maxWidth: 400,
    elevation: 4,
    alignItems: 'stretch',
  },
  title: {
    textAlign: 'center',
    marginBottom: 4,
    color: '#222',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 24,
    color: '#444',
    fontSize: 16,
    fontWeight: '400',
  },
  label: {
    marginTop: 12,
    marginBottom: 4,
    color: '#222',
    fontSize: 14,
    fontWeight: '500',
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#F8F8F8',
    fontSize: 16,
    marginBottom: 4,
    color: '#222',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#A0A0A0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    backgroundColor: '#fff',
  },
  checkboxChecked: {
    borderColor: '#0a7ea4',
  },
  checkboxDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#0a7ea4',
  },
  rememberMe: {
    fontSize: 14,
    color: '#222',
  },
  forgot: {
    marginLeft: 'auto',
  },
  forgotText: {
    color: '#0a7ea4',
    fontSize: 14,
    fontWeight: '500',
  },
  signInButton: {
    backgroundColor: '#181B23',
    borderRadius: 8,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  signInButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  signUpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  signUpText: {
    fontSize: 15,
  },
  signUpLink: {
    color: '#0a7ea4',
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 2,
    textAlign: "center"
  },
}); 