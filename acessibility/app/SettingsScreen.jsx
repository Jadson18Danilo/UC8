import { View, Text } from "react-native";
import BigButton from "../components/BigButton";
import { makeSettingsStyles } from "../styles/settingsStyles";

export default function SettingsScreen({
  theme,
  fontScale,
  setFontScale,
  isHighContrast,
  setIsHighContrast,
  bigTargets,
  setBigTargets,
}) {
  const styles = makeSettingsStyles({ theme, fontScale, bigTargets });

  // Funções para controle de escala

  const dec = () =>
    setFontScale((v) => Math.max(0.8, Number((v - 0.1).toFixed(1))));

  const inc = () =>
    setFontScale((v) => Math.min(2.0, Number((v + 0.1).toFixed(1))));

  return (
    <View style={{ gap: 16 }}>
      <View
        style={styles.group}
        accessible
        accessibilityLabel="Grupo de fonte e amostra"
      >
        <Text style={styles.groupTitle}>Tamanho da Fonte</Text>

        <View style={styles.row}>
          <Text style={styles.label}>
            Escala Atual: {fontScale.toFixed(1)}x{" "}
          </Text>

          <View>
            <BigButton
              title="A-"
              onPress={dec}
              style={[styles.switchBtn, styles.switchOff]}
              textStyle={styles.switchText}
              accessibilityLabel="Diminuir tamanho da fonte"
            />

            <BigButton
              title="A+"
              onPress={inc}
              style={[styles.switchBtn, styles.switchOn]}
              textStyle={styles.switchText}
              accessibilityLabel="Aumentar tamanho da fonte"
            />
          </View>
        </View>

        <View style={styles.sample} accessibilityLabel="Amostra de Texto">
          <Text style={styles.sampleText}>
            Dragon ball é melhor que Naruto.
          </Text>
        </View>
      </View>

      <View
        style={styles.group}
        accessible
        accessibilityLabel="Grupo de alto contraste"
      >
        <Text style={styles.groupTitle}>Contraste</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Alto Contraste</Text>

          <BigButton
            title={isHighContrast ? "Ativado" : "Desativado"}
            onPress={() => setIsHighContrast((v) => !v)}
            role="switch"
            style={[
              styles.switchBtn,
              isHighContrast ? styles.switchOn : styles.switchOff,
            ]}
            textStyle={styles.switchText}
            accessibilityState={{ checked: isHighContrast }}
            accessibilityHint="Alterna um tema com alto contraste e cores fortes."
          />
        </View>
      </View>

      <View
        style={styles.group}
        accessible
        accessibilityLabel="Grupo de alvos de toque"
      >
        <Text style={styles.groupTitle}>Acessibilidade tátil</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Alvos de toque</Text>

          <BigButton
            title={bigTargets ? "Ativado" : "Desativado"}
            onPress={() => setBigTargets((v) => !v)}
            role="switch"
            style={[
              styles.switchBtn,
              bigTargets ? styles.switchOn : styles.switchOff,
            ]}
            textStyle={styles.switchText}
            accessibilityState={{ checked: bigTargets }}
            accessibilityHint="Aumenta áreas de toque e espaçamentos."
          />
        </View>

      </View>
      
    </View>
  );
}
