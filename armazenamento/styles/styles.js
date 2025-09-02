import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#0b132b",
        paddingTop: 48
    },
    title: {
        fontSize: 24,
        fontWeight: "700",
        marginBottom: 16,
        color: "#fff"
    },
    input: {
        backgroundColor: "#1c2541",
        color: "#fff",
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 12,
        marginBottom: 12,
    },
    button: {
        backgroundColor: "#3a86ff",
        paddingHorizontal: 16,
        paddingVertical: 12,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 8,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "700",
    },
    row: {
        flexDirection: "row",
        alignItems: "center"
    },
    card: {
        backgroundColor: "#1c2541",
        borderRadius: 12,
        padding: 12,
    },
    cardText: {
        color: "#fff",
        fontWeight: "16",
    },
    muted: {
        color: "#cbd5e1",
        textAlign: "center",
        marginTop: 12,
    },
    actions: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 12,
        gap: 8
    },
    secundary: {
        backgroundColor: "#1c2541",
        borderRadius: 12,
        padding: 12,
    },
    footer: {
        color: "#cbd5e1",
        marginTop: 12,
        fontSize: 12,
    }
})