import { StyleSheet } from 'react-native';

const primary60 = "#ffffff";
const primary30 = "#e0dce4";
const primary10 = "#826cff";

export const styles = StyleSheet.create({
    form: {
        margin: 30,
        marginTop: 60 
    },
    label: {
        fontSize: 18,
        marginBottom: 30,
        textAlign: 'center',
        color: 'blue'
    },
    label: {
        fontSize: 18,
        textAlign: 'center'
    },
    title: {
        fontSize: 30,
        marginBottom: 30,
        textAlign: 'center'
    },
    textInput: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 15,
        paddingVertical: 4,
        paddingHorizontal: 2,
        textAlignVertical: 'top'
    },
    buttonContainer: {
      paddingVertical: 40,
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    button: {
        width: '100%',
        marginVertical: 10,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 15,
        lineHeight: 26,
    },
    listItem: {
        padding: 10,
        marginVertical: 10,
        borderColor: 'gray',
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
    },
    item: {
        alignSelf: 'stretch',
        textAlign: 'center',
        padding: 4
    },
    boxed: {
        padding: 80,
        marginBottom: 30,
        marginTop: 30,
        backgroundColor: "gray"
    },
    forgotPassword: {
        width: '100%',
        alignItems: 'flex-end',
        marginBottom: 24,
    },
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    label: {
        color: primary10,
    },
    link: {
        fontWeight: 'bold',
        color: primary10,
    },
    container: {
        flex: 1,
        backgroundColor: "transparent",
        alignItems: "center",
        justifyContent: "center",
    },
    card: {
        justifyContent: "center",
        alignItems: "center",
        width: 350,
        height: 550,
        bottom: 80
    },
    cardsText: {
        fontSize: 22,
    },
    surfaceContainer: {
        marginVertical: 7,
        alignItems: "center",
        justifyContent: "center",
    },
    surface: {
        width: '100%',
        backgroundColor: '#f0eef2',
        borderRadius: 20,
        borderColor: primary30,
        borderWidth:1,
        paddingVertical: 10,
        paddingHorizontal: 5
    },
    conversationSender: {
        marginLeft: 10
    },
    conversationLastMessage: {
        marginLeft: 10
    },
    icSend: {
        backgroundColor: 'transparent',

    },
    messengerButton: {
        marginHorizontal: 3,
    },
    admin_modules: {
        width: '50%',
        height: 100,
        padding: 10,
    }

});