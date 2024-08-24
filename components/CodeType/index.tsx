import SVCHelper from "@/core/service";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { Button, Modal, Portal, Snackbar, Surface } from "react-native-paper";
import CodeTypeFilter from "../CodeTypeFilter";
import CodeTypeInputs from "../CodeTypeInputs";
import CodeTypeTable from "../CodeTypesTable";
import { View } from "../Themed";
import { ICodeType } from "./types";

interface ICodeTypeInputsProps {}

const CodeType: React.FC<ICodeTypeInputsProps> = () => {
  const [isCodeInputsModalVisible, setIsCodeInputsModalVisible] =
    React.useState(false);
  const [showSnackBar, setShowSnackBar] = React.useState(false);
  const [selCodeType, setSelCodeType] = React.useState<ICodeType | undefined>(
    undefined
  );
  const [codeTypes, setCodeTypes] = React.useState<ICodeType[]>([]);
  const [codeTypesOrig, setCodeTypesOrig] = React.useState<ICodeType[]>([]);

  const showCodeTypeInputs = () => setIsCodeInputsModalVisible(true);
  const hideCodeTypeInputs = () => setIsCodeInputsModalVisible(false);
  const dismissSnackBar = () => setShowSnackBar(false);

  useEffect(() => {
    fetchCodeType();
  }, []);

  const fetchCodeType = () => {
    // console.log(Constants.manifest2);
    SVCHelper.get("/codeTypes?_sort=id&_order=desc").then((data) => {
      setCodeTypes(data);
      setCodeTypesOrig(data);
    });
  };

  const createCodeType = (codeType: ICodeType) => {
    return SVCHelper.post("/codeTypes", codeType).then((data) => {
      let modifiedCodeTypes = [{ ...data }, ...codeTypes];
      setCodeTypes(modifiedCodeTypes);
      setShowSnackBar(true);
    });
  };

  const updateCodeType = (codeType: ICodeType) => {
    return SVCHelper.put(`/codeTypes/${codeType.id}`, codeType).then((data) => {
      let modifiedCodeTypes = [...codeTypes];
      let index = modifiedCodeTypes.findIndex(({ id }) => id === codeType.id);
      if (index >= 0) {
        modifiedCodeTypes[index] = { ...data };
      }
      setCodeTypes(modifiedCodeTypes);
      setSelCodeType(undefined);
      setShowSnackBar(true);
    });
  };

  const deleteCodeType = (codeType: ICodeType) => {
    return SVCHelper.delete(`/codeTypes/${codeType.id}`).then((data) => {
      let modifiedCodeTypes = [...codeTypes];
      let index = modifiedCodeTypes.findIndex(({ id }) => id === codeType.id);
      if (index >= 0) {
        modifiedCodeTypes.splice(index, 1);
        setCodeTypes(modifiedCodeTypes);
      }
    });
  };

  const handleSaveCodeType = (codeType: ICodeType) => {
    return codeType.id ? updateCodeType(codeType) : createCodeType(codeType);
  };

  const handleEditClick = (codeType: ICodeType) => {
    setSelCodeType(codeType);
    showCodeTypeInputs();
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

  return (
    <View style={styles.container}>
      <Portal>
        <Modal
          visible={isCodeInputsModalVisible}
          onDismiss={hideCodeTypeInputs}
        >
          <CodeTypeInputs
            codeType={selCodeType}
            onSaveClick={handleSaveCodeType}
            dismissModal={hideCodeTypeInputs}
          />
        </Modal>
      </Portal>
      <CodeTypeFilter onFilter={handleFilteringCodeTypes} />
      {/* <CodeTypesList codeTypes={codeTypes} /> */}
      <CodeTypeTable
        codeTypes={codeTypes}
        onEditClick={handleEditClick}
        onDeleteClick={deleteCodeType}
      />
      <Surface elevation={2} style={styles.buttonContainer}>
        <Snackbar visible={showSnackBar} onDismiss={dismissSnackBar}>
          Code Type added/updated successfully.
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

export default CodeType;
