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
    flex: 1,
    backgroundColor: '#fff',
    padding: 10
  },
  title: {
    fontSize: 35,
    alignSelf: "center",
    color: "#355C7D",
    fontWeight: "bold"
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
  buttonContainer: {
    width:100,
    height: 50,
    color: "#fff",
    alignSelf: "center",
    marginTop: 10
  },

  goodItemContainer: {
    flexDirection: "row"
  },

  goodItemName: {
    flex: 3,
    alignContent: "center",
    fontSize: 18
  },
  goodItemUnit: {
    flex: 1,
    alignContent: "center",
    fontSize: 18
  },
  goodItemPrice: {
    flex: 2,
    alignContent: "center",
    fontSize: 18
  },

  goodItemBtn: {
    margin: 2,
    flex: 1
  },


  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(52, 52, 52, 0.8)'
  },

  modalView: {
    padding: 10,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderRadius: 10,
  }
})

export default styles