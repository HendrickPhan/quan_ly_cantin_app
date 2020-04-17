    import { StyleSheet } from "react-native"

    const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#ddd"
    },
    container: {
        margin: 7,
        flex: 1,
        backgroundColor: "#fff",
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    title: {
        fontSize: 35,
        alignSelf: "center",
        color: "#355C7D",
        fontWeight: "bold",
        marginTop: 10,
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
        borderRadius: 5,
        borderWidth: 1,
        flex: 1,
        margin: 10,
    },
    sortDate: {
        borderRadius: 5,
        borderWidth: 1,
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        paddingBottom: 15,
        paddingTop: 16,
        alignSelf: 'center',
    },
    selectByingField: {
        borderRadius: 10,
        borderWidth: 1,
        flex: 5
    },
    selectItem: {
        padding: 0,
    },
    fieldContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    date: {
        textAlign: "center"
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
    },
    rowField: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 7,
        paddingBottom: 7,
        flex: 4
    },
    colField: {
        flex: 1,
        textAlign: "center",
        alignSelf: "center"
    }
    })

    export default styles