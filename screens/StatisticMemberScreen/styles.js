import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#aaa',
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
    fontSize: 30,
    alignSelf: "center",
    color: "#355C7D",
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
    fontSize: 16,
    flex: 2,
    alignSelf: "center",
  },
  btnContainer: {
    flex: 1,
    marginLeft: 10,
    alignSelf: "center"
  },
  listTitleContainer: {
    flexDirection: "row",
  },
  listTitle: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    fontSize: 16
  },
  listItemContainer: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd"
  },
  listItem: {
    flex: 1
  }

})

export default styles