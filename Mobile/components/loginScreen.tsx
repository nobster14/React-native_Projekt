import * as React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';

interface LoginState {
  username: string;
  password: string;
}


export const LoginScreen: React.FunctionComponent = ({route} : any) => {
  const [state, setState] = React.useState<LoginState>({
    username: '',
    password: '',
  });
  const navigation = useNavigation();

  const { loginToken, setLoginToken } = route.params;
  const [localLoginToken, setLocalLoginToken] = React.useState("");


  const handleLogin = () : boolean => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            username: state.username,
            password: state.password,
         })
    };

    fetch('https://pw-flatly.azurewebsites.net/auth/login', requestOptions)
        .then(response => response.json())
        .then(json => { setLocalLoginToken(json)})
        .catch(() => {setLoginToken("")})

        console.error(localLoginToken);
    return localLoginToken == "" ? false : true;
};
  return (
    <View style={styles.container}>
      <Text>Username:</Text>
      <TextInput
        style={styles.inputContainer}
        onChangeText={(username) => setState({ ...state, username })}
        value={state.username}
      />
      <Text>Password:</Text>
      <TextInput
        style={styles.inputContainer}
        onChangeText={(password) => setState({ ...state, password })}
        value={state.password}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={() => {
        if (handleLogin() === false)
        alert('Invalid username or password')}}>
        <Text>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register' as never)}>
        <Text>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

interface RegisterState {
  username: string;
  password: string;
  email: string;
}

export const RegisterScreen: React.FunctionComponent = () => {
  const [state, setState] = React.useState<RegisterState>({
    username: '',
    password: '',
    email: '',
  });
  const [error, setError] = React.useState('');

  const navigation = useNavigation();

  const handleRegister = () => {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (state.username.length < 5) {
      setError('Username must be at least 5 characters.');
      return;
    } else if (state.password.length < 5) {
      setError('Password must be at least 5 characters.');
      return;
    } else if (!emailRegex.test(state.email)) {
      setError('Email is not valid.');
      return;
    } else {
      setError('');

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            id: -1,
            username: state.username,
            password: state.password,
            email: state.email
         })
    };
    alert('Registering!');
    fetch('https://pw-flatly.azurewebsites.net/users', requestOptions)
        .then(response => response.json())
        .catch(() => {})
  };}

  return (
    <View style={styles.container}>
        {error !== '' && <Text style={styles.error}>{error}</Text>}
      <Text>Username:</Text>
      <TextInput
        style={styles.inputContainer}
        onChangeText={(username) => setState({ ...state, username })}
        value={state.username}
      />
      <Text>Password:</Text>
      <TextInput
        style={styles.inputContainer}
        onChangeText={(password) => setState({ ...state, password })}
        value={state.password}
        secureTextEntry={true}
      />
      <Text>Email:</Text>
      <TextInput
        style={styles.inputContainer}
        onChangeText={(email) => setState({ ...state, email })}
        value={state.email}
      />
      <TouchableOpacity style={styles.button} onPress={() => { handleRegister()}}>
        <Text>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate<never>('Login' as never)}>
        <Text>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputContainer: {
      width: '80%',
      margin: 10,
      padding: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 5,
    },
    input: {
      margin: 10,
      padding: 10,
      fontSize: 18,
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        width: 300,
        marginTop: 16,
      },
      error: {
        color: 'red',
        fontWeight: 'bold',
        margin: 10,
      },
    buttonContainer: {
      width: '80%',
      margin: 10,
      padding: 10,
      backgroundColor: 'tomato',
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
    }
  });

  