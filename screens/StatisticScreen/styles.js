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
  
  btnContainer: {
    margin: 5,
    borderWidth: 2,
    borderRadius: 10,
    flex: 1,
    justifyContent: "center",
  },
  btnText: {
    color: "#fff",
    fontSize: 24,
    alignSelf: "center",
    
  }
})

export default styles