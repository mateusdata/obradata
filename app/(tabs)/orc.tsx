import { Text, View, StyleSheet } from "react-native";

export default function AboutBudgetScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Como Personalizar o Orçamento</Text>
      <Text style={styles.description}>
        Para personalizar o orçamento no app, siga os passos abaixo:
      </Text>
      <Text style={styles.step}>
        1. Acesse a aba "Configurações" no menu principal.
      </Text>
      <Text style={styles.step}>
        2. Insira os dados da sua empresa, como nome, contato e serviços
        oferecidos.
      </Text>
      <Text style={styles.step}>
        3. Salve as alterações para aplicar no orçamento.
      </Text>
      <Text style={styles.note}>
        Nota: Certifique-se de preencher todos os campos necessários para
        garantir um orçamento personalizado e profissional.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    color: "#555",
    textAlign: "center",
  },
  step: {
    fontSize: 16,
    marginBottom: 10,
    color: "#666",
    textAlign: "left",
    width: "100%",
  },
  note: {
    fontSize: 14,
    marginTop: 20,
    color: "#999",
    fontStyle: "italic",
    textAlign: "center",
  },
});
