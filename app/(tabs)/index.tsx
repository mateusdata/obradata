import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Provider, TextInput as PaperInput, Button as PaperButton } from 'react-native-paper';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

export default function App() {
  const [ferramenta, setFerramenta] = useState('');
  const [valor, setValor] = useState('');
  const [descricao, setDescricao] = useState('');
  const [itens, setItens] = useState([]);

  const adicionarItem = () => {
    if (ferramenta && valor && descricao) {
      setItens([...itens, { ferramenta, valor, descricao }]);
      setFerramenta('');
      setValor('');
      setDescricao('');
    }
  };

  const gerarPDF = async () => {
    const html = `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              text-align: left;
              background-color: #f9f9f9;
            }
            .container {
              padding: 20px;
              text-align: center;
              color: #333;
            }
            h1 {
              color: #0056b3;
              font-size: 24px;
              margin-bottom: 10px;
            }
            .subheader {
              color: #0056b3;
              font-size: 18px;
              margin-bottom: 20px;
            }
            .contact {
              margin-bottom: 20px;
              font-size: 16px;
              color: #333;
            }
            .services {
              font-size: 14px;
              margin-bottom: 20px;
              color: #666;
            }
            .item {
              margin-bottom: 20px;
              padding: 10px;
              border: 1px solid #ddd;
              border-radius: 5px;
              background-color: #fff;
              text-align: left;
            }
            .item h2 {
              font-size: 18px;
              color: #0056b3;
            }
            .item p {
              font-size: 14px;
              color: #555;
              margin: 5px 0;
            }
            .quote {
              font-style: italic;
              margin-top: 20px;
              color: #555;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="contact">
              <p>Contato: 📱 (17) 98841-1886 | 📱 (17) 99613-4858</p>
            </div>
            <h1>Lucas Santos - Serviços</h1>
            <div class="subheader">Orçamento</div>
            <div class="services">
              <p>CONSTRUÇÕES E REFORMAS</p>
              <p>CALHAS - RUFOS</p>
              <p>PINTURAS EM GERAL</p>
              <p>ELÉTRICA E HIDRÁULICA</p>
            </div>
            ${itens
        .map(
          (item) => `
              <div class="item">
                <h2>Ferramenta:</h2>
                <p>${item.ferramenta}</p>
                <h2>Valor:</h2>
                <p>R$ ${item.valor}</p>
                <h2>Descrição:</h2>
                <p>${item.descricao}</p>
              </div>
            `
        )
        .join('')}
            <div class="quote">
              "Do trabalho de tuas mãos comerás, feliz serás, e tudo te irá bem." Salmos 128:2
            </div>
          </div>
        </body>
      </html>
    `;

    const { uri, } = await Print.printToFileAsync({ html });
    const timestamp = new Date().getTime();

    const newPath = `${FileSystem.documentDirectory}Orçamento1.pdf`;

    await FileSystem.moveAsync({
      from: uri,
      to: newPath,
    });

    console.log('File has been saved to:', newPath);

    // Compartilha o arquivo a partir do novo caminho
    await shareAsync(newPath, { UTI: '.pdf', mimeType: 'application/pdf' });
  };

  return (
    <Provider>
      <View style={styles.container}>
        <PaperInput
          label="Ferramenta"
          value={ferramenta}
          onChangeText={setFerramenta}
          mode="outlined"
          style={styles.input}
        />
        <PaperInput
          label="Valor"
          value={valor}
          onChangeText={setValor}
          keyboardType="numeric"
          mode="outlined"
          style={styles.input}
        />
        <PaperInput
          label="Descrição"
          value={descricao}
          onChangeText={setDescricao}
          mode="outlined"
          multiline
          style={styles.input}
        />
        <PaperButton mode="contained" onPress={adicionarItem} style={styles.button}>
          Adicionar Item
        </PaperButton>
        <FlatList
          data={itens}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Text style={styles.listText}>Ferramenta: {item.ferramenta}</Text>
              <Text style={styles.listText}>Valor: R$ {item.valor}</Text>
              <Text style={styles.listText}>Descrição: {item.descricao}</Text>
            </View>
          )}
        />
        <PaperButton mode="contained" onPress={gerarPDF} style={styles.pdfButton}>
          Gerar PDF
        </PaperButton>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginBottom: 20,
  },
  listItem: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#e8f5e9',
  },
  listText: {
    fontSize: 16,
  },
  pdfButton: {
    marginTop: 20,
    backgroundColor: '#0056b3',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  pdfButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
