/**
 * ESTILOS DA TELA DE BLOQUEIO
 *
 * Estilos específicos para a tela de bloqueio que inclui autenticação
 * biométrica e opções de desbloqueio. Design centrado e acessível.
 */

import { StyleSheet } from "react-native";

/**
 * Gera estilos da tela de bloqueio baseados nas configurações de acessibilidade
 */
export const makeLockStyles = ({ theme, fontScale, bigTargets }) => {
  const base = 16 * fontScale; // Tamanho base da fonte
  const padding = bigTargets ? 18 : 12; // Padding maior para alvos grandes
  const radius = 20; // Raio mais arredondado

  return StyleSheet.create({
    // ===== CONTAINER PRINCIPAL =====
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.background,
      padding: 24, // Padding generoso para centralizar
    },

    // ===== EMOJI DECORATIVO =====
    lockEmoji: {
      fontSize: base * 3, // Grande para chamar atenção
      marginBottom: 12,
    },

    // ===== TÍTULO PRINCIPAL =====
    title: {
      fontSize: base * 1.2, // Maior que texto normal
      fontWeight: "800",
      color: theme.text,
      textAlign: "center",
      marginBottom: 8,
    },

    // ===== SUBTÍTULO EXPLICATIVO =====
    subtitle: {
      fontSize: base,
      color: theme.text,
      opacity: 0.8, // Texto ligeiramente transparente
      textAlign: "center",
      marginBottom: 18,
    },

    // ===== BOTÕES DE AUTENTICAÇÃO =====
    authBtn: {
      paddingVertical: padding, // Padding adaptativo
      paddingHorizontal: 20,
      backgroundColor: theme.primary,
      borderRadius: radius,
      borderWidth: 2,
      borderColor: theme.border,
    },

    // ===== TEXTO DOS BOTÕES =====
    authText: {
      fontSize: base,
      fontWeight: "800",
      color: "#000", // Contraste sobre cor primária
    },

    // ===== TEXTO DE AJUDA =====
    help: {
      marginTop: 14,
      fontSize: base * 0.9, // Ligeiramente menor
      color: theme.text,
      textAlign: "center",
    },
  });
};
