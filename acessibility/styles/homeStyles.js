/**
 * ESTILOS DA TELA INICIAL (HOME)
 *
 * Estilos específicos para a tela inicial que contém a lista de tarefas
 * e o botão de síntese de voz. Todos os elementos se adaptam às
 * configurações de acessibilidade.
 */

import { StyleSheet } from "react-native";

/**
 * Gera estilos da tela inicial baseados nas configurações de acessibilidade
 */
export const makeHomeStyles = ({ theme, fontScale, bigTargets }) => {
  const base = 16 * fontScale; // Tamanho base da fonte
  const padding = bigTargets ? 16 : 10; // Padding adaptativo
  const radius = 16; // Raio dos elementos

  return StyleSheet.create({
    // ===== CARD PRINCIPAL =====
    card: {
      backgroundColor: theme.card,
      borderRadius: radius,
      padding: 16,
      borderWidth: 1,
      borderColor: theme.border,
      gap: 10, // Espaçamento entre elementos filhos
    },

    // ===== TÍTULO DA SEÇÃO =====
    title: {
      fontSize: base * 1.1, // Título ligeiramente maior
      fontWeight: "800",
      color: theme.text,
    },

    // ===== ITEM DA LISTA (CHECKBOX) =====
    item: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      paddingVertical: bigTargets ? 14 : 10, // Padding vertical adaptativo
    },

    // ===== CHECKBOX VISUAL =====
    checkbox: {
      width: bigTargets ? 32 : 26, // Tamanho adaptativo do checkbox
      height: bigTargets ? 32 : 26, // Maior para facilitar o toque
      borderRadius: 6,
      borderWidth: 2,
      borderColor: theme.text,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#0000", // Transparente por padrão
    },

    // ===== CHECKBOX MARCADO =====
    checkboxChecked: {
      backgroundColor: theme.success, // Verde quando marcado
    },

    // ===== TEXTO DO ITEM =====
    itemText: {
      flex: 1, // Ocupa espaço restante
      fontSize: base,
      color: theme.text,
    },

    // ===== BOTÃO DE SÍNTESE DE VOZ =====
    announceBtn: {
      marginTop: 8,
      alignSelf: "flex-start", // Alinha à esquerda
      paddingVertical: padding, // Padding adaptativo
      paddingHorizontal: 14,
      backgroundColor: theme.primary,
      borderRadius: radius,
    },

    // ===== TEXTO DO BOTÃO DE SÍNTESE =====
    announceText: {
      color: "#000", // Contraste sobre cor primária
      fontWeight: "800",
      fontSize: base * 0.9,
    },
  });
};
