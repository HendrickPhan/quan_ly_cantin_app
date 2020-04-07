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
    padding: 10,
    borderWidth: 2,
    borderRadius: 20,
    margin: 5,
    flex: 1,
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 35,
    alignSelf: "center",
    color: "#355C7D",
    fontWeight: "bold"
  },
  fieldContainer: {
    flexDirection: "row",
    margin: 10
  },
  selectTitle: {
    alignSelf: "center",
    fontSize: 20,
    flex: 1
  },
  selectField: {
    borderRadius: 10,
    borderWidth: 1,
    flex: 1
  },
})

export default styles