import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { Surface } from "react-native-paper";
import { ICodeType } from "../CodeTypes/types";
import CodeTypesListItem from "./CodeTypesListItem";

interface ICodeTypesListProps {
  codeTypes: ICodeType[];
}

const CodeTypesList: React.FC<ICodeTypesListProps> = ({ codeTypes }) => {
  return (
    <Surface elevation={0} style={styles.container}>
      <FlatList
        style={styles.codeTypesListContainer}
        data={codeTypes}
        renderItem={({ item }) => <CodeTypesListItem codeType={item} />}
      />
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  codeTypesListContainer: {
    flex: 1,
  },
});

export default CodeTypesList;
