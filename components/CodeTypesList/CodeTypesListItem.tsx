import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { Avatar, Card, Text } from "react-native-paper";
import { ICodeType } from "../CodeTypes/types";

interface ICodeTypesListItemProps {
  codeType: ICodeType;
}

const CodeTypesListItem: React.FC<ICodeTypesListItemProps> = React.memo(
  ({ codeType }) => {
    return (
      <Card style={styles.cardStyle} key={codeType.id}>
        <Card.Title
          title={codeType.shortCode}
          left={(props) => <Avatar.Icon {...props} icon="record-circle" />}
        />
        <Card.Content>
          <Text variant={"bodySmall"}>{codeType.description}</Text>
        </Card.Content>
      </Card>
    );
  }
);

const styles = StyleSheet.create({
  cardStyle: { padding: 5, marginVertical: 2 },
});

export default CodeTypesListItem;
