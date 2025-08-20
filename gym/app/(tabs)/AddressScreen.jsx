

import React, {useState} from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";

export default function AddressScreen({route, navigation, theme}){
    const {alunoNome} = route.params || {}
    const [cep, setCep] = useState("")
    const [endereco, setEndereco] = useState(null)


    async function buscarEndereco() {
        if (cep.length !== 8) {
            Alert.alert("Erro", "Digite um CEP válido com 8 digitos.");
            return;
        }

        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();
            if (data.erro) {
                Alert.alert("Erro", "CEP não encontrado.");
                return;
            }
            else {
                setEndereco(data);
            }
        } catch (_error) {
            Alert.alert("Erro", "Não foi possível buscar o endereço.");
        }
    }

    async function salvarEndereco() {
        try {
            Alert.alert("Sucesso", `Endereço salvo com sucesso para ${alunoNome}!`);
            navigation.goBack();
        } catch (_error) {
            Alert.alert("Erro", "Não foi possível salvar o endereço.");
        }
    }

    
}