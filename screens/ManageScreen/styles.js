import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: "row",
  },
  container: {
    flex: 1
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