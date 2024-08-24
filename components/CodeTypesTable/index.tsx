import React from "react";
import { ICodeType } from "../CodeType/types";
import { DataTable, Surface, TextInput, Text } from "react-native-paper";
import { ScrollView } from "react-native";
import { FlatList, StyleSheet } from "react-native";

interface ICodeTypeTableProps {
  codeTypes: ICodeType[];
}

const CodeTypeTable: React.FC<ICodeTypeTableProps> = React.memo(
  ({ codeTypes }) => {
    return (
      <Surface elevation={0} style={styles.container}>
        <DataTable style={styles.dataTable}>
          <DataTable.Header>
            <DataTable.Title
              maxFontSizeMultiplier={6}
              style={{ ...styles.denseCol }}
            >
              <Text variant="titleMedium" style={styles.titleText}>
                Short Code
              </Text>
            </DataTable.Title>
            <DataTable.Title>
              <Text variant="titleMedium" style={styles.titleText}>
                Description
              </Text>
            </DataTable.Title>
          </DataTable.Header>
          <ScrollView>
            {codeTypes?.map((codeType) => (
              <DataTable.Row key={codeType.id} style={styles.dataTableRow}>
                <DataTable.Cell
                  maxFontSizeMultiplier={6}
                  style={styles.denseCol}
                >
                  <Text variant="bodySmall" style={styles.titleText}>
                    {codeType.shortCode}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell>
                  <Text variant="bodySmall" style={styles.titleText}>
                    {codeType.description}{" "}
                  </Text>
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </ScrollView>
        </DataTable>
      </Surface>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dataTable: {
    flex: 1,
  },
  dataTableHeader: { minHeight: 40 },
  dataTableRow: { borderColor: "rgba(0,0,0,0.5)" },
  titleText: {
    color: "black",
  },
  denseCol: {
    maxWidth: "30%",
  },
});

export default CodeTypeTable;
