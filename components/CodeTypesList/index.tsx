import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { Avatar, Card, Surface, Text } from "react-native-paper";
import { ICodeType } from "../CodeTypes/types";

interface ICodeTypesListProps {
  codeTypes: ICodeType[];
}

const CodeTypesList: React.FC<ICodeTypesListProps> = ({ codeTypes }) => {
  return (
    <Surface elevation={0} style={styles.container}>
      <FlatList
        style={styles.codeTypesListContainer}
        data={codeTypes}
        renderItem={({ item: codeType }) => (
          <Card style={styles.cardStyle}>
            <Card.Title
              title={codeType.shortCode}
              left={(props) => <Avatar.Icon {...props} icon="record-circle" />}
            />
            <Card.Content>
              <Text variant={"bodySmall"}>{codeType.description}</Text>
            </Card.Content>
          </Card>
        )}
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
  cardStyle: { padding: 5, marginVertical: 2 },
});

export default CodeTypesList;
