import React, { useState } from "react";

import { View, Text, Pressable, AccessibilityInfo } from "react-native";

import * as Speech from "expo-speech";

import { makeHomeStyles } from "../styles/homeStyles";

export default function HomeScreen({ theme, fontScale, bigTargets }) {
  const styles = makeHomeStyles({ theme, fontScale, bigTargets });

  const [items, setItems] = useState([
    { id: 1, text: "Ler as instruções de acessibilidade", done: false },
    { id: 2, text: "Testar com TalkBack/VoiceOver", done: false },
    { id: 3, text: "Ativar Alto contraste", done: false },
    { id: 4, text: "Aumentar tamanho de fonte", done: false },
  ]);

  const toggle = (id) => {
    setItems((prev) => {
      const updated = prev.map((it) =>
        it.id === id ? { ...it, done: !it.done } : it
      );

      const changed = updated.find((it) => it.id === it);

      AccessibilityInfo.announceForAccessibility(
        `${changed.text} marcado como ${
          changed.done ? "Concluído" : "pendente"
        }`
      );
      return updated;
    });
  };

  const announceSumary = () => {
    const done = items.filter((i) => i.done).length;
    const total = items.length;
    const msg = `Você concluiu ${done} de ${total} tarefas.`;

    Speech.speak(msg, { language: "pt-BR" });

    AccessibilityInfo.announceForAccessibility(msg);
  };

  return (
    <View style={{ gap: 16 }}>
      <View
        style={styles.card}
        accessible
        accessibilityLabel="Lista de Tarefas de acessibilidade"
      >
        <Text>CheckList de Acessibilidade</Text>

        {items.map((it) => {
          const checked = it.done;
          return (
            <Pressable
              key={it.id}
              onPress={() => toggle(it.id)}
              style={styles.item}
              accessibilityLabel={it.text}
              accessibilityRole="checkbox"
              accessibilityState={{ checked }}
              accessibilityHint="Toque para alternar concluído ou pendente."
            >
              <View style={[styles.checkbox, checked && styles.checkboxChecked]} />
              
              <Text style={styles.itemText}>{it.text}</Text>
            </Pressable>
          );
        })}

        <Pressable
          onPress={announceSumary}
          style={styles.announceBtn}
          accessibilityRole="button"
          accessibilityLabel="Ler resumo em voz alta"
          accessibilityHint="Lê em voz alta e envia ao leitor de tela quantas tarefas foram concluídas" 
        >
          <Text style={styles.announceText}> 🔈Ler Resumo</Text>
        </Pressable>

      </View>
    </View>
  );
}
