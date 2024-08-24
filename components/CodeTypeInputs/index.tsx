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

import { ICodeType } from "../CodeTypes/types";
import { CodeTypesFormFields } from "./types";

interface ICodeTypesProps {}

const CodeTypes: React.FC<ICodeTypesProps> = () => {
  const [codeType, setCodeType] = React.useState<ICodeType>({
    shortCode: "",
    description: "",
  });

  const handleChange = (val: string, fieldName: CodeTypesFormFields) => {
    const newCodeType = {
      ...codeType,
    };

    newCodeType[fieldName] = val;
    setCodeType(newCodeType);
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
        value={codeType.shortCode}
        onChangeText={(text) => handleChange(text, "shortCode")}
        style={styles.inputs}
      />

      <TextInput
        multiline
        numberOfLines={6}
        label="Description"
        value={codeType.description}
        onChangeText={(text) => handleChange(text, "description")}
        style={styles.inputs}
      />
      <Divider bold={true} style={styles.separator} />
      <Button
        icon="content-save"
        mode="contained"
        onPress={() => console.log("Pressed")}
      >
        Save
      </Button>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // flexDirection: "column",
    // justifyContent: "flex-start",

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

export default CodeTypes;
