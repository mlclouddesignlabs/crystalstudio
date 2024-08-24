import SVCHelper from "@/core/service";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import {
  Button,
  Modal,
  Portal,
  Snackbar,
  Surface,
  TextInput,
} from "react-native-paper";
import CodeTypeInputs from "../CodeTypeInputs";
import CodeTypesList from "../CodeTypesList";
import { View } from "../Themed";
import { ICodeType } from "./types";
import CodeTypeTable from "../CodeTypesTable";
import CodeTypeFilter from "../CodeTypeFilter";

interface ICodeTypeInputsProps {}

const CodeTypes: React.FC<ICodeTypeInputsProps> = () => {
  const [isCodeInputsModalVisible, setIsCodeInputsModalVisible] =
    React.useState(false);
  const [showSnackBar, setShowSnackBar] = React.useState(false);
  const [codeTypes, setCodeTypes] = React.useState<ICodeType[]>([]);
  const [codeTypesOrig, setCodeTypesOrig] = React.useState<ICodeType[]>([]);

  useEffect(() => {
    fetchCodeTypes();
  }, []);

  const fetchCodeTypes = () => {
    // console.log(Constants.manifest2);
    SVCHelper.get("/codeTypes?_sort=id&_order=desc").then((data) => {
      setCodeTypes(data);
      setCodeTypesOrig(data);
    });
  };

  const updateCodeType = (updatedCodeType: ICodeType) => {
    return SVCHelper.post("/codeTypes", updatedCodeType).then((data) => {
      setCodeTypes([{ ...data }, ...codeTypes]);
      setShowSnackBar(true);
    });
  };

  const handleFilteringCodeTypes = (key: string) => {
    if (!key) {
      setCodeTypes(codeTypesOrig);
    }

    let searchKey = key.toLowerCase();

    setCodeTypes(
      codeTypesOrig.filter(({ shortCode, description }) => {
        return (
          shortCode.toLowerCase().includes(searchKey) ||
          description.toLowerCase().includes(searchKey)
        );
      })
    );
  };

  const showCodeTypeInputs = () => setIsCodeInputsModalVisible(true);
  const hideCodeTypeInputs = () => setIsCodeInputsModalVisible(false);
  const dismissSnackBar = () => setShowSnackBar(false);

  return (
    <View style={styles.container}>
      <Portal>
        <Modal
          visible={isCodeInputsModalVisible}
          onDismiss={hideCodeTypeInputs}
        >
          <CodeTypeInputs
            onSaveClick={updateCodeType}
            dismissModal={hideCodeTypeInputs}
          />
        </Modal>
      </Portal>
      <CodeTypeFilter onFilter={handleFilteringCodeTypes} />
      {/* <CodeTypesList codeTypes={codeTypes} /> */}
      <CodeTypeTable codeTypes={codeTypes} />
      <Surface elevation={2} style={styles.buttonContainer}>
        <Snackbar visible={showSnackBar} onDismiss={dismissSnackBar}>
          Code Type added successfully.
        </Snackbar>
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
