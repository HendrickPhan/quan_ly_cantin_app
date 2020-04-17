import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#ddd"
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
  message: {
    fontSize: 16,
    alignSelf: "center",
    color: "#228B22",
    fontWeight: "bold"
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
  selectByingField: {
    borderRadius: 10,
    borderWidth: 1,
    flex: 5
  },
  selectItem: {
    padding: 0
  },
  fieldContainer: {
    flexDirection: "row",
    margin: 10
  },
  date: {
    flex: 3,
    alignSelf: "center",
  },
  btnContainer: {
    marginLeft: 10,
    flex: 1,
    alignSelf: "center"

  },
  buyingListTitle: {
    alignSelf: "center",
    fontSize: 18,
    fontWeight: "bold"
  },
  buyingListContainer: {
  },
  textInput: {
    height: 40,
    padding: 6,
    margin: 10,
    borderBottomWidth: 1,
    flex: 1
  },
  buyingQuantityInput: {
    borderBottomWidth: 1,
    alignSelf: "center",
    margin: 5
  },
  btn: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 3,
    fontSize: 20,
  }
})

export default styles