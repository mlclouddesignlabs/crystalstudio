import React from "react";
import { StyleSheet } from "react-native";
import {
  Button,
  Divider,
  Icon,
  Surface,
  Text,
  TextInput,
} from "react-native-paper";

import { ICodeType } from "../CodeType/types";
import { CodeTypeFormFields } from "./types";

interface ICodeTypeInputsProps {
  codeType?: ICodeType;
  onSaveClick: (updatedCodeType: ICodeType) => Promise<void>;
  dismissModal: () => void;
}

const CodeTypeInputs: React.FC<ICodeTypeInputsProps> = ({
  codeType,
  onSaveClick,
  dismissModal,
}) => {
  const [newCodeType, setNewCodeType] = React.useState<ICodeType>(
    codeType || {
      shortCode: "",
      description: "",
    }
  );

  const handleChange = (val: string, fieldName: CodeTypeFormFields) => {
    const updatedCodeType = {
      ...newCodeType,
    };
    updatedCodeType[fieldName] = val;
    setNewCodeType(updatedCodeType);
  };

  const handleSavePress = () => {
    onSaveClick(newCodeType).then(() => {
      dismissModal();
    });
  };

  return (
    <Surface style={styles.container}>
      <Surface style={styles.information} elevation={0}>
        <Icon size={20} source={"information-outline"} />
        <Text variant="bodyMedium" style={{ marginLeft: 10 }}>
          Define the code types.
        </Text>
      </Surface>
      <TextInput
        label="Short Code"
        value={newCodeType.shortCode}
        onChangeText={(text) => handleChange(text, "shortCode")}
        style={styles.inputs}
      />
      <TextInput
        multiline
        numberOfLines={6}
        label="Description"
        value={newCodeType.description}
        onChangeText={(text) => handleChange(text, "description")}
        style={styles.inputs}
      />
      <Divider bold={true} style={styles.separator} />
      <Button icon="content-save" mode="contained" onPress={handleSavePress}>
        Save
      </Button>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  information: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "baseline",
  },
  inputs: {
    width: "100%",
    minHeight: 70,
    margin: 5,
  },
  separator: {
    marginVertical: 15,
    height: 1,
  },
});

export default CodeTypeInputs;
