

import { StyleSheet } from "react-native";

/**
 * @param {object} theme Tema de cores atual
 * @param {number} fontScale Escala de fonte (1.0 = normal, 1.5 = 50% maior, etc)
 * @param {boolean} bigTargets Se alvos grandes estão ativados
 * @returns Estilos globais baseados nas configurações atuais
 */
// ===== ESTILOS GLOBAIS =====
export const makeGlobalStyles = ({ theme, fontScale, bigTargets }) => {
  const base = 16 * fontScale; // Tamanho base da fonte
  const padding = bigTargets ? 16 : 10; // Padding adaptativo
  const radius = 16; // Raio padrão

  return StyleSheet.create({
   // ===== CONTAINER PRINCIPAL =====
    app: {
      flex: 1,
      backgroundColor: theme.background,

    },
    
    header:{
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: theme.card,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    headerTitle:{
      fontSize: base * 1.1,
      fontWeight: "700",
      color: theme.text,
    },

    tabBar:{
      flexDirection: "row",
      gap: 8,
      padding: 8,
      justifyContent: "space-around",
      alignItems: "center",
      borderTopWidth: 1,
      borderTopColor: theme.border,
      backgroundColor: theme.card,
    },
    tabBarBtn:{
      flex: 1,
      paddingVertical: padding,
      paddingHorizontal: 12,
      borderRadius: radius,
      alignItems: "center",
      borderWidth: 2,
      borderColor: "transparent",
    },
    tabBarBtnActive:{
      backgroundColor: theme.primary + 22,
      borderColor: theme.primary,
    },
    tabBarText:{
      fontSize: base * 0.95,
      fontWeight: "700",
      color: theme.text,
    },

    // ===== TEXTO PRINCIPAL =====
    text: {
      fontSize: base,
      color: theme.text,
    },
    lockNowBtn:{
      paddingVertical: padding,
      paddingHorizontal: 12,
      borderRadius: radius,
      backgroundColor: theme.danger,
      alignItems: "center",
    },
    lockNowText:{
      fontSize: base * 0.9,
      fontWeight: "bold",
      color: "#fff",
    },
    content:{
      flex: 1,
      padding: 16,
    }

  });
};
