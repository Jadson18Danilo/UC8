import React, { useEffect, useState } from "react";
import { View, Text, Alert, AccessibilityInfo } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";

import BigButton from "../components/BigButton";

import { makeLockStyles } from "../styles/lockStyles";

export default function LockScreen({ theme, fontScale, bigTargets, onUnlock }) {
  const styles = makeLockStyles({ theme, fontScale, bigTargets });

  const [available, setAvailable] = useState(null);

  useEffect(() => {
    (async () => {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();

      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      setAvailable(hasHardware && isEnrolled);

      AccessibilityInfo.announceForAccessibility(
        "Tela bloqueada. Use sua digital ou encolha entrar sem digital"
      );
    })();
  }, []);

  const handleAuth = async () => {
    try {
      const res = await LocalAuthentication.authenticateAsync({
        promptMessage: "Desbloquear com biometria",
        cancelLabel: "Cancelar",
        disableDeviceFallback: false,
      });

      if (res.success) {
        AccessibilityInfo.announceForAccessibility("Desbloqueado com sucesso.");
        onUnlock();
      } else if (res.error) {
        Alert.alert("Erro", "Falha na autenticação" + res.error);
      }
    } catch (_error) {
      Alert.alert("Erro", "Não foi possível autenticar");
    }
  };

  return (
    <View
      style={styles.container}
      accessible
      accessibilityLabel="Tela de bloqueio"
    >
      <Text style={styles.lockEmoji} accessibilityElementsHidden>
        🔒
      </Text>

      <Text style={styles.title}>App Bloquead</Text>
      <Text style={styles.subtitle}>
        Por segurança, o conteúdo está oculto. Ecolha um forma de desbloquio.
      </Text>

      <BigButton
        title="Desbloquear com digital"
        onPress={handleAuth}
        style={styles.authBtn}
        textStyle={styles.authText}
        accessibilityHint="Abre o prompt do sistema para leitura da sua biometria."
      />

      <BigButton
        title="Entrar sem digital"
        onPress={() => {
          AccessibilityInfo.announceForAccessibility(
            "Desbloqueado sem biometria"
          );
          onUnlock();
        }}
        style={[
          styles.authBtn,
          { backgroundColor: theme.success, marginTop: 12 },
        ]}
        textStyle={[styles.authText, { color: "#fff" }]}
        accessibilityHint="Desbloqueia o aap sem usar digital."
      />

      {available === false && (
        <Text style={styles.help}>
          Biometria indisponível. Você pode entrar sem digital
        </Text>
      )}
    </View>
  );
}
