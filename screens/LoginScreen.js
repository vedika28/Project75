import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import db from "../config.js";
import { firebase } from "@firebase/app";

export default class LoginScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };
  }

  toLogin = async (password, email) => {
    if ((email, password)) {
      try {
        const response = await firebase
          .auth()
          .signInWithEmailAndPassword(email, password);
        if (response) {
          this.props.navigation.navigate("write");
        }
      } catch (error) {
        switch (error.code) {
          case "auth/user-not-found":
            Alert.alert("User is not valid");
            break;
          case "auth/invalid-email":
            Alert.alert("Enter the correct password");
            break;
        }
      }
    } else {
      Alert.alert("Enter email and passwrod again");
    }
  };

  render() {
    return (
      //create 2 input boxes for login and password.
      //Also create a login button using touchable opacity and style it.
      <KeyboardAvoidingView style={{ alignItems: "center", marginTop: 20 }}>
        <View>
          <TextInput
            style={styles.login}
            placeholder="Enter email address"
            keyboardType="email-address"
            onChangeText={(text) => {
              this.setState = {
                email: text,
              };
            }}
          />

          <TextInput
            style={styles.login}
            placeholder="Enter password"
            secureTextEntry={true}
            onChangeText={(text) => {
              this.setState = {
                password: text,
              };
            }}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.toLogin(this.state.password, this.state.email);
            }}
          >
            <Text style={{ textAlign: "center", fontSize: 25 }}>Submit</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  login: {
    width: 300,
    height: 50,
    borderWidth: 2,
    fontSize: 20,
    margin: 10,
    marginTop: 50,
    paddingLeft: 10,
    alignSelf: "center",
  },
  button: {
    height: 40,
    width: 100,
    borderWidth: 1.5,
    marginTop: 30,
    borderRadius: 6,
    alignSelf: "center",
  },
});
