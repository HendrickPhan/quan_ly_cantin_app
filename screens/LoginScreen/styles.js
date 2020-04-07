import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#aaa',
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center"
  },
  container: {
    flex: 0.8,
    height: 300,
    backgroundColor: '#fff',
    alignSelf: "center",
    padding: 10,
    borderWidth: 2,
    borderColor: "#222"
  },
  title: {
    fontSize: 40,
    alignSelf: "center",
    color: "#333"
  },
  textInput: {
    height: 40,
    padding: 6,
    margin: 10,
    borderBottomWidth: 1
  },
  error: {
    color: "red"
  },
})

export default styles