import React from "react";
import { StyleSheet } from "react-native";
import {
  DataTable,
  Divider,
  IconButton,
  Menu,
  PaperProvider,
  Text,
} from "react-native-paper";
import { ICodeType } from "../CodeType/types";
import { View } from "../Themed";

interface ICodeTypeTableRowProps {
  codeType: ICodeType;
}

const CodeTypeTableRow: React.FC<ICodeTypeTableRowProps> = React.memo(
  ({ codeType }) => {
    const [visible, setVisible] = React.useState(false);

    const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);

    return (
      <DataTable.Row key={codeType.id} style={styles.dataTableRow}>
        <DataTable.Cell maxFontSizeMultiplier={6} style={styles.denseCol}>
          <Text variant="bodySmall" style={styles.titleText}>
            {codeType.shortCode}
          </Text>
        </DataTable.Cell>
        <DataTable.Cell>
          <Text variant="bodySmall" style={styles.titleText}>
            {codeType.description}
          </Text>
        </DataTable.Cell>
        <DataTable.Cell style={styles.optionsCol}>
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchorPosition="bottom"
            anchor={
              <IconButton icon="dots-vertical" size={20} onPress={openMenu} />
            }
          >
            <Menu.Item
              dense
              leadingIcon="pencil"
              onPress={() => {}}
              title="Edit"
            />
            <Divider />
            <Menu.Item
              dense
              leadingIcon="delete"
              onPress={() => {}}
              title="Delete"
            />
          </Menu>
        </DataTable.Cell>
      </DataTable.Row>
    );
  }
);

const styles = StyleSheet.create({
  dataTableRow: { borderColor: "rgba(0,0,0,0.5)" },
  titleText: {
    color: "black",
  },
  denseCol: {
    maxWidth: "30%",
  },
  optionsCol: {
    maxWidth: "10%",
  },
});

export default CodeTypeTableRow;
