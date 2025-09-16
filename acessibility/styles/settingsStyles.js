/**
 * ESTILOS DA TELA DE CONFIGURAÇÕES
 *
 * Estilos específicos para a tela de configurações onde o usuário
 * pode ajustar todas as opções de acessibilidade da aplicação.
 */

import { StyleSheet } from "react-native";

/**
 * Gera estilos da tela de configurações baseados nas configurações atuais
 */
export const makeSettingsStyles = ({ theme, fontScale, bigTargets }) => {
  const base = 16 * fontScale; // Tamanho base da fonte
  const padding = bigTargets ? 16 : 10; // Padding adaptativo
  const radius = 16; // Raio padrão

  return StyleSheet.create({
    // ===== GRUPO DE CONFIGURAÇÕES =====
    group: {
      backgroundColor: theme.card,
      borderRadius: radius,
      padding: 16,
      borderWidth: 1,
      borderColor: theme.border,
      gap: 14, // Espaçamento interno
      marginBottom: 16, // Espaçamento entre grupos
    },

    // ===== TÍTULO DOS GRUPOS =====
    groupTitle: {
      fontSize: base * 1.05, // Ligeiramente maior
      fontWeight: "800",
      color: theme.text,
    },

    // ===== LINHA DE CONFIGURAÇÃO =====
    row: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 10,
    },

    // ===== LABEL DAS CONFIGURAÇÕES =====
    label: {
      flex: 1, // Ocupa espaço disponível
      fontSize: base,
      color: theme.text,
    },

    // ===== CONTAINER DOS BOTÕES +/- =====
    plusMinusWrap: {
      flexDirection: "row",
      gap: 8,
      alignItems: "center",
    },

    // ===== ÁREA DE AMOSTRA =====
    sample: {
      backgroundColor: theme.background, // Contraste com o card
      borderRadius: radius,
      padding: 12,
      borderWidth: 1,
      borderColor: theme.border,
    },

    // ===== TEXTO DE AMOSTRA =====
    sampleText: {
      color: theme.text,
      fontSize: base * 1.1, // Ligeiramente maior para demonstração
    },
    // ===== BOTÕES TIPO SWITCH =====
    switchBtn: {
      paddingVertical: padding, // Padding adaptativo
      paddingHorizontal: 14,
      borderRadius: 999, // Totalmente arredondado
      borderWidth: 2,
    },

    // ===== SWITCH ATIVADO =====
    switchOn: {
      backgroundColor: theme.success + "22", // Verde com transparência
      borderColor: theme.success,
    },

    // ===== SWITCH DESATIVADO =====
    switchOff: {
      backgroundColor: "#0000", // Transparente
      borderColor: theme.border,
    },

    // ===== TEXTO DOS SWITCHES =====
    switchText: {
      color: theme.text,
      fontWeight: "700",
      fontSize: base * 0.9,
    },
  });
};
