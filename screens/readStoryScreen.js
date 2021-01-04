import * as React from "react";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import db from "../config.js";
import { SearchBar } from "react-native-elements";
import { firebase } from "@firebase/app";

export default class readStoryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allStories: [],
      dataSource: [],
      search: "",
    };
  }

  retreiveStories = async () => {
    var allStories = [];
    var stories = await db
      .collection("Book")
      .get()
      .then((query) => {
        query.forEach((doc) => {
          allStories.push(doc.data());
        });
        this.setState({
          allStories: allStories,
        });
      });
  };

  componentDidMount() {
    this.retreiveStories();
  }

  SearchFilterFunction = (text) => {
    const newData = this.state.allStories.filter((item) => {
      const itemData = item.title ? item.title.toUpperCase() : "".toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) >= 0;
    });
    this.setState({
      dataSource: newData,
      search: text,
    });
  };

  updateSearch = (search) => {
    this.setState({ search });
  };

  render() {
    return (
      <View style={styles.container}>
        <SearchBar
          style={styles.input}
          placeholder="Enter the book name"
          onChangeText={(text) => this.SearchFilterFunction(text)}
          onClear={(text) => this.SearchFilterFunction("")}
          value={this.state.search}
        />

        <FlatList
          data={
            this.state.search == ""
              ? this.state.allStories
              : this.state.dataSource
          }
          renderItem={({ item }) => (
            <View style={{ borderBottomWidth: 4, margin: 15, fontSize: 15 }}>
              <Text>{"title: " + item.title}</Text>
              <Text>{"author: " + item.author}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lavender",
  },
  input: {
    height: 25,
    width: 200,
    marginTop: 20,
  },
});
