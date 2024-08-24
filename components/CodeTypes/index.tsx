import SVCHelper from "@/core/service";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { Button, Modal, Portal, Surface } from "react-native-paper";
import CodeTypeInputs from "../CodeTypeInputs";
import CodeTypesList from "../CodeTypesList";
import { View } from "../Themed";
import { ICodeType } from "./types";

interface ICodeTypeInputsProps {}

const CodeTypes: React.FC<ICodeTypeInputsProps> = () => {
  const [isCodeInputsModalVisible, setIsCodeInputsModalVisible] =
    React.useState(false);
  const [codeTypes, setCodeTypes] = React.useState<ICodeType[]>([]);

  useEffect(() => {
    fetchCodeTypes();
  }, []);

  const fetchCodeTypes = () => {
    // console.log(Constants.manifest2);
    SVCHelper.get("/codeTypes").then((data) => {
      setCodeTypes(data);
    });
  };

  const showCodeTypeInputs = () => setIsCodeInputsModalVisible(true);
  const hideCodeTypeInputs = () => setIsCodeInputsModalVisible(false);

  return (
    <View style={styles.container}>
      <Portal>
        <Modal
          visible={isCodeInputsModalVisible}
          onDismiss={hideCodeTypeInputs}
        >
          <CodeTypeInputs />
        </Modal>
      </Portal>
      <CodeTypesList codeTypes={codeTypes} />
      <Surface elevation={2} style={styles.buttonContainer}>
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
  buttonContainer: {
    flex: 1,
    maxHeight: 80,
  },
});

export default CodeTypes;
