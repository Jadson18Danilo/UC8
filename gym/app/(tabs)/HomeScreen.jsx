import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  Modal,
  Animated,
  Easing
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ theme }) {
  const [nome, setNome] = useState('');
  const [frequencia, setFrequencia] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [itemSelecionado, setItemSelecionado] = useState(null);

  // Controle da animação
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const iniciarAnimacao = () => {
    scaleAnim.setValue(0.5);
    opacityAnim.setValue(0);
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 250,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true
      })
    ]).start();
  };

  const registrarPresenca = () => {
    if (nome.trim() === '') return;
    const novoRegistro = { id: Date.now().toString(), nome };
    setFrequencia([novoRegistro, ...frequencia]);
    setNome('');
  };

  const confirmarExclusao = (item) => {
    setItemSelecionado(item);
    setModalVisible(true);
    iniciarAnimacao();
  };

  const excluirItem = () => {
    setFrequencia(frequencia.filter((i) => i.id !== itemSelecionado.id));
    setModalVisible(false);
    setItemSelecionado(null);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>
        Registro de Frequência da Academia
      </Text>

      <TextInput
        style={[styles.input, { backgroundColor: '#fff', color: '#000' }]}
        placeholder="Digite o nome do aluno"
        value={nome}
        onChangeText={setNome}
      />

      <Button title="Registrar Presença" onPress={registrarPresenca} />

      <FlatList
        data={frequencia}
        keyExtractor={(item) => item.id}
        style={{ marginTop: 20, width: '100%' }}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={[styles.itemText, { color: theme.text }]}>
              ✅ {item.nome}
            </Text>
            <TouchableOpacity onPress={() => confirmarExclusao(item)}>
              <Ionicons name="trash" size={22} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Modal com animação */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="none" // controlamos manualmente
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <Animated.View
            style={[
              styles.modalContent,
              { backgroundColor: theme.background, transform: [{ scale: scaleAnim }], opacity: opacityAnim }
            ]}
          >
            <Text style={[styles.modalText, { color: theme.text }]}>
              Tem certeza que deseja excluir &lquot {itemSelecionado?.nome} &rquot ?
            </Text>
            <View style={styles.modalButtons}>
              <Button title="Cancelar" onPress={() => setModalVisible(false)} />
              <Button title="Excluir" color="red" onPress={excluirItem} />
            </View>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
