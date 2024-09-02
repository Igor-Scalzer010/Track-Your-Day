import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const storedUsers = await AsyncStorage.getItem('users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      const user = users.find(u => u.email === email && u.password === password);

      if (user) {
        Alert.alert('Sucesso', `Bem-vindo, ${user.name}!`);
        // Navegar para a tela principal do app
      } else {
        Alert.alert('Erro', 'Email ou senha incorretos!');
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao fazer login.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#999"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.signupButton]}
        onPress={() => navigation.navigate('Signup')}
      >
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000', // Fundo preto
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    color: '#fff', // Cor do texto branco
    marginBottom: 40,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#444', // Borda mais escura para contraste
    backgroundColor: '#222', // Fundo do campo de texto preto
    color: '#fff', // Texto branco
    padding: 12,
    marginBottom: 20,
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#6a0dad', // Roxo para o botão
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff', // Texto branco
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupButton: {
    marginTop: 20, // Distância entre os botões
  },
});

export default LoginScreen;
