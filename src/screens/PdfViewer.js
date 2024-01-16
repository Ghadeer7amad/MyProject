import React from 'react';
import { View } from 'react-native';
import Pdf from 'react-native-pdf';

const PdfViewer = ({ route }) => {
  const { pdfUrl } = route.params;

  return (
    <View style={{ flex: 1 }}>
      <Pdf source={{ uri: pdfUrl, cache: true }} style={{ flex: 1 }} />
    </View>
  );
};

export default PdfViewer;
