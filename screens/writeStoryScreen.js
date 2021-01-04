import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { Header } from "react-native-elements";
import { firebase } from "@firebase/app";
import db from "../config";

export default class readStoryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      author: "",
      story: "",
    };
  }

  submitStory = async () => {
    db.collection("Book").add({
      title: this.state.title,
      author: this.state.author,
      story: this.state.story,
    });
    this.setState({
      title: "",
      author: "",
      story: "",
    });
    Alert.alert("Your story has been submitted");
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <Header
          backgroundColor={"rgb(9, 173, 168)"}
          style={{ marginBottom: 200 }}
          centerComponent={{
            text: "Story Hub",
            style: { color: "#fff", fontSize: 35, fontWeight: "bold" },
          }}
        />

        <TextInput
          style={[styles.input, { marginTop: 120 }]}
          placeholder="Title of the book"
          onChangeText={(title) => {
            this.setState({ title: title });
          }}
          value={this.state.title}
        />

        <TextInput
          style={styles.input}
          placeholder="Author of the book"
          onChangeText={(author) => {
            this.setState({ author: author });
          }}
          value={this.state.author}
        />

        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder="Story of the book"
          onChangeText={(story) => {
            this.setState({ story: story });
          }}
          value={this.state.story}
          multiline={true}
        />

        <TouchableOpacity style={styles.button}>
          <Text
            style={{ textAlign: "center", fontSize: 25, fontWeight: "bold" }}
            onPress={this.submitStory}
          >
            Submit
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lavender",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: 200,
    height: 60,
    borderWidth: 2,
    fontSize: 20,
    marginTop: 50,
  },
  button: {
    marginTop: 100,
    marginBottom: 60,
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 15,
    backgroundColor: "#add8e6",
    width: 200,
    height: 50,
  },
});
