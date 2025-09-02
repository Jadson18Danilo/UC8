// Importa React e hooks para estado e efeitos colaterais
import React, { useEffect, useState } from "react";
// Importa componentes do React Native para UI e interação
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    Alert,
    Keyboard,
} from "react-native";

// Importa módulos para armazenamento local, seguro e arquivos
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import * as FileSystem from "expo-file-system";

// Importa estilos personalizados
import styles from "../styles/styles";

// Chaves para armazenamento das notas e PIN
const NOTES_KEY = "@NOTAS";
const PIN_KEY = "user_pin";

// Componente principal do app
export default function App() {
    // Estados para controle do PIN e notas
    const [hasPin, setHasPin] = useState(null); // Se existe PIN configurado
    const [pinInput, setPinInput] = useState(""); // Valor digitado do PIN
    const [pinStep, setPinStep] = useState("enter"); // Etapa do fluxo do PIN
    const [tempPin, setTempPin] = useState(""); // PIN temporário para confirmação
    const [nota, setNota] = useState(""); // Texto da nota a ser adicionada
    const [notas, setNotas] = useState([]); // Lista de notas

    // Efeito para verificar se existe PIN salvo ao iniciar o app
    useEffect(() => {
        (async () => {
            try {
                const savedPin = await SecureStore.getItemAsync(PIN_KEY); // Busca PIN salvo
                setHasPin(!!savedPin); // Atualiza estado se existe PIN
                setPinStep(savedPin ? "enter" : "set"); // Define etapa inicial
            } catch (_error) {
                setHasPin(false); // Em caso de erro, assume que não há PIN
                setPinStep("set");
            }
        })();
    }, []);

    // Efeito para carregar notas salvas ao iniciar o app
    useEffect(() => {
        (async () => {
            try {
                const raw = await AsyncStorage.getItem(NOTES_KEY); // Busca notas salvas
                if (raw) setNotas(JSON.parse(raw)); // Atualiza estado das notas
            } catch (_error) {}
        })();
    }, []);

    // Função para salvar lista de notas no AsyncStorage
    const persistNotas = async (list) => {
        setNotas(list); // Atualiza estado local
        try {
            await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(list)); // Salva no armazenamento
        } catch (_error) {
            Alert.alert("Erro", "Não foi possível salvar suas notas."); // Alerta em caso de erro
        }
    };

    // Função para limpar todas as notas, com confirmação
    const clearNotas = () =>{
        Alert.alert(
            "Limpar tudo",
            "Ten certeza qye deseja apagar todas as notas?",
            [
                {text: "Cancelar", style: "cancel"},
                {
                    text: "Apagar",
                    style: "destructive",
                    onPress: async () => persistNotas([]), // Limpa notas se confirmado
                }
            ]
        )
    }

    // ==================== BACKUP VIA FILESYSTEM ====================
    // Função para exportar backup das notas para arquivo JSON
    const exportBackup = async () => {
        try {
            // Define caminho do arquivo no diretório de documentos do app
            const path = FileSystem.documentDirectory + "notes-backup.json";

            // Escreve as notas em formato JSON no arquivo
            await FileSystem.writeAsStringAsync(path, JSON.stringify(notas), {
                encoding: FileSystem.EncodingType.UTF8,
            });

            // Confirma sucesso para o usuário com caminho do arquivo
            Alert.alert("Backup criado", `Arquivo salvo em:\n${path}`);
        } catch (_error) {
            // Em caso de erro, notifica o usuário
            Alert.alert("Erro", "Falha ao criar backup.");
        }
    };

    // ==================== VISUALIZAR BACKUP ====================
    // Função para ler e exibir conteúdo do backup diretamente no app
    const showBackup = async () => {
        try {
            // Define mesmo caminho usado no export
            const path = FileSystem.documentDirectory + "notes-backup.json";

            // Lê conteúdo do arquivo
            const content = await FileSystem.readAsStringAsync(path);

            // Exibe conteúdo em um alerta
            Alert.alert("Backup encontrado", content);
        } catch (_error) {
            // Se arquivo não existe ou erro de leitura
            Alert.alert("Erro", "Não foi possível abrir o backup.");
        }
    };

    // Função para adicionar uma nova nota à lista
    const addNota = () => {
        const text = nota.trim(); // Remove espaços
        if (!text) return; // Não adiciona nota vazia
        const nova = { id: Date.now().toString(), text }; // Cria objeto nota
        persistNotas([nova, ...notas]); // Adiciona no início da lista
        setNota(""); // Limpa campo de texto
        Keyboard.dismiss(); // Fecha teclado
    };

    // Função para lidar com envio do PIN (criação, confirmação ou entrada)
    const handlePinSubmit = async () => {
        const code = pinInput.trim();

        if (code.length < 4) {
            Alert.alert("PIN inválido", "Use pelo menos 4 dígitos."); // PIN muito curto
            return;
        }

        if (pinStep === "set") {
            setTempPin(code); // Salva PIN temporário
            setPinInput(""); // Limpa campo
            setPinStep("confirm"); // Vai para etapa de confirmação
            return;
        }

        if (pinStep === "confirm") {
            if (code !== tempPin) {
                Alert.alert("Não confere", "Os PINs não são iguais"); // PINs não batem
                return;
            }

            try {
                await SecureStore.setItemAsync(PIN_KEY, code, {
                    keychainService: "appPin",
                }); // Salva PIN seguro

                setHasPin(true); // Marca que PIN existe
                setPinStep("enter"); // Vai para etapa de entrada
                setPinInput(""); // Limpa campo

                Alert.alert("Pronto", "PIN configurado com sucesso."); // Sucesso
            } catch (_error) {
                Alert.alert("Erro", "Não foi possível salvar o PIN"); // Erro ao salvar
            }
            return;
        }

        // Verifica PIN digitado para entrada
        try {
            const savedPin = await SecureStore.getItemAsync(PIN_KEY);
            if (savedPin && code === savedPin) {
                setPinInput(""); // PIN correto, limpa campo
                // Aqui poderia liberar acesso ao app
            } else {
                Alert.alert("PIN incorreto", "Tente novamente."); // PIN errado
            }
        } catch (_error) {
            Alert.alert("Erro", "Falha ao verificar PIN."); // Erro ao buscar PIN
        }
    };

    // Renderiza tela de carregamento enquanto verifica PIN
    if (hasPin === null) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Carregando…</Text>
            </View>
        );
    }

    // Renderiza tela de configuração ou entrada do PIN
    if (!hasPin || pinStep !== "enter") {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    {pinStep === "set"
                        ? "Crie um PIN"
                        : pinStep === "confirm"
                        ? "Confirme o PIN"
                        : "Digite seu PIN"}
                </Text>

                <TextInput
                    style={styles.input}
                    value={pinInput}
                    onChangeText={setPinInput}
                    placeholder="PIN (mín. 4 dígitos)"
                    keyboardType="numeric"
                    secureTextEntry
                    maxLength={10}
                />

                <TouchableOpacity style={styles.button} onPress={handlePinSubmit}>
                    <Text style={styles.buttonText}>
                        {pinStep === "enter" ? "Entrar" : "Salvar PIN"}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    // Renderiza tela principal do app (notas)
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Minhas Notas</Text>

            {/* Campo para adicionar nova nota */}
            <View style={styles.row}>
                <TextInput
                    style={[styles.input, { flex: 1 }]}
                    value={nota}
                    onChangeText={setNota}
                    placeholder="Escreva uma nota…"
                    returnKeyType="done"
                    onSubmitEditing={addNota}
                />

                <TouchableOpacity style={styles.button} onPress={addNota}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
            </View>

            {/* Lista de notas */}
            <FlatList
                data={notas}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ gap: 8, paddingVertical: 8 }}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.cardText}>{item.text}</Text>
                    </View>
                )}
                ListEmptyComponent={
                    <Text style={styles.muted}>Nenhuma nota ainda.</Text>
                }
            />

            {/* Botões de ações: limpar, exportar e mostrar backup */}
            <View style={styles.actions}>
                <TouchableOpacity onPress={clearNotas} style={[styles.button,styles.secondary]}>
                    <Text style={styles.buttonText}>Limpar tudo</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={exportBackup} style={[styles.button,styles.secondary]}>
                    <Text style={styles.buttonText}>Exportar Backup</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={showBackup} style={[styles.button,styles.secondary]}>
                    <Text style={styles.buttonText}>Mostrar Backup</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
