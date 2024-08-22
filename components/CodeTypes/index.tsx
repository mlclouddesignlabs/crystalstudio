import React, { useEffect } from "react";
import { FlatList, ScrollView, StyleSheet } from "react-native";
import {
  Avatar,
  Button,
  Card,
  FAB,
  Modal,
  Portal,
  Surface,
  Text,
} from "react-native-paper";
import CodeTypeInputs from "../CodeTypeInputs";
import { MOCK_CODE_TYPES } from "./mockData";

import { View } from "../Themed";
import SVCHelper from "@/core/service";

interface ICodeTypeInputsProps {}

const CodeTypes: React.FC<ICodeTypeInputsProps> = () => {
  const [isCodeInputsModalVisible, setIsCodeInputsModalVisible] =
    React.useState(false);

  // useEffect(() => {
  //   fetchCodeTypes();
  // }, []);

  const fetchCodeTypes = () => {
    SVCHelper.get("/codetypes").then((data) => {
      console.log(data);
    });
  };

  const showCodeTypeInputs = () => setIsCodeInputsModalVisible(true);
  const hideCodeTypeInputs = () => setIsCodeInputsModalVisible(false);

  return (
    <View style={styles.container}>
      <FAB icon="plus" onPress={fetchCodeTypes} />
      <Portal>
        <Modal
          visible={isCodeInputsModalVisible}
          onDismiss={hideCodeTypeInputs}
        >
          <CodeTypeInputs />
        </Modal>
      </Portal>
      <Surface style={styles.container}>
        <FlatList
          style={styles.codetypesContainer}
          data={MOCK_CODE_TYPES}
          renderItem={({ item: codeType }) => (
            <Card style={styles.cardStyle}>
              <Card.Title
                title={codeType.shortCode}
                left={(props) => (
                  <Avatar.Icon {...props} icon="record-circle" />
                )}
              />
              <Card.Content>
                <Text variant={"bodySmall"}>{codeType.description}</Text>
              </Card.Content>
            </Card>
          )}
        />
        <Button style={{ marginTop: 30 }} onPress={showCodeTypeInputs}>
          Add Code Types
        </Button>
      </Surface>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  codetypesContainer: {
    flex: 1,
  },
  cardStyle: { padding: 5, marginVertical: 2 },
});

export default CodeTypes;
