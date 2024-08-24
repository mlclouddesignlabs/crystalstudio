import React from "react";
import { ICodeType } from "../CodeType/types";
import { DataTable, Surface, TextInput, Text } from "react-native-paper";
import { ScrollView } from "react-native";
import { FlatList, StyleSheet } from "react-native";
import CodeTypeTableRow from "./CodeTypeTableRow";

interface ICodeTypeTableProps {
  codeTypes: ICodeType[];
  onEditClick: (codeType: ICodeType) => void;
  onDeleteClick: (codeType: ICodeType) => void;
}

const CodeTypeTable: React.FC<ICodeTypeTableProps> = React.memo(
  ({ codeTypes, onEditClick, onDeleteClick }) => {
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
              <CodeTypeTableRow
                key={codeType.id}
                codeType={codeType}
                onEditClick={onEditClick}
                onDeleteClick={onDeleteClick}
              />
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
  titleText: {
    color: "black",
  },
  denseCol: {
    maxWidth: "30%",
  },
});

export default CodeTypeTable;
