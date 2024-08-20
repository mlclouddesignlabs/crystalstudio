import React, { useEffect, useMemo, useRef, useState } from "react";
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { CodeTypeValues } from "../CodeTypeValues/CodeTypeValues";
import { CodeTypes } from "../CodeTypes/CodeTypes";
import { DataTable, Card } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';
import { Item } from "react-native-paper/lib/typescript/components/Drawer/Drawer";



function CodeTypeValueLandingPage() {
  const headertextforToolbar = "Code Types Values";
  const [selectedCT, setSelectedCT] = useState<CodeTypes>();
  const [rowData, setRowData] = useState<CodeTypes[]>([]);
  const [subrowData, setSubRowData] = useState<CodeTypeValues[]>([]);
  const [headertext, setheadertext] = useState(headertextforToolbar);
  const [selectedRowData, setSelectedRowData] = useState<CodeTypeValues>();
  const addChildRef = useRef(null);
  const deleteChildRef = useRef(null);
  const editChildRef = useRef(null);
  const appBaseURL="https://localhost:7166"
  
  // Sample dummy data
 
  
  const refreshData = () => {
    fetch(appBaseURL+ "/api/CodeTypes")
      .then((result) => result.json())
      .then((data) => setRowData(data))
      .catch((error) => console.log(error));

  };

  const refreshCTVData = (ctShortCode: string) => {
    fetch(appBaseURL+`/api/CodeTypeValues/${ctShortCode}`)
      .then((result) => result.json())
      .then((data) => setSubRowData(data))
      .catch((error) => console.log(error));
  };
 

 
  useEffect(() => {
    refreshData();
  }, []);

  useEffect(() => {
    refreshCTVData("PropertyType");
  }, []);

  const onDeleteButtonClick = () => {
    if (!selectedRowData || !selectedRowData.shortCode) {
      console.error("Please select a row to delete");
    } else {
      //deleteChildRef.current?.Action();
    }
  };

  const onEditButtonClick = () => {
    if (!selectedRowData || !selectedRowData.shortCode) {
      console.error("Please select a row to edit");
    } else {
      if (selectedCT && selectedCT.description) {
        selectedRowData.codeTypeDesc = selectedCT.description;
      }
      console.log(selectedRowData);
      //editChildRef.current?.Action();
    }
  };

  const OnAddClickHandler = () => {
    if (!selectedRowData || !selectedRowData.codeTypeShortCode) {
      console.error("Please select a Code Type to Add");
    } else {
      if (selectedCT && selectedCT.description) {
        selectedRowData.codeTypeDesc = selectedCT.description;
      }
      // addChildRef.current?.Action();
    }
  };

  const onListSelectionChanged = (item: CodeTypes) => {

    const codetype = {
      shortCode: item.shortCode,
      description: item.description,
    };

    const codetypedata = {
      shortCode: "",
      description: "",
      codeTypeShortCode: codetype.shortCode,
      codeTypeDesc: codetype.description,
    };

    setSelectedCT(codetype);
    setSelectedRowData(codetypedata);
    setheadertext(`${headertextforToolbar} :--> ${codetype.description}`);
    refreshCTVData(codetype.shortCode);
  };

  const onSelectionChanged = (item: CodeTypeValues) => {
    if (item) {
      setSelectedRowData(item);
      setSelectedCT(selectedCT);
    } else {
      setSelectedRowData({
        shortCode: "",
        description: "",
        codeTypeShortCode: selectedCT ? selectedCT.shortCode : "",
        codeTypeDesc: selectedCT ? selectedCT.description : "",
      });
    }
  };
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if (rowData || isFocus) {
      return (
        <Text style={[isFocus && { color: 'blue' }]}>
          Dropdown label
        </Text>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{headertext}</Text>
      <Dropdown
        style={styles.dropdown}
        data={rowData}
        labelField="description"
        valueField="shortCode"
        placeholder="Select an option"
        onChange={item => onListSelectionChanged(item)}
        value={selectedCT}
      />
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>
            ShortCode
          </DataTable.Title>
          <DataTable.Title>
            Description
          </DataTable.Title>
          <DataTable.Title>CodeType ShortCode</DataTable.Title>
        </DataTable.Header>
        {subrowData.map((item, index) => (
          <DataTable.Row key={index}>
            <DataTable.Cell>{item.shortCode}</DataTable.Cell>
            <DataTable.Cell>{item.description}</DataTable.Cell>
            <DataTable.Cell>{item.codeTypeShortCode}</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    verticalAlign: "top"
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  toolbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  content: {
    flexDirection: "column",

    flex: 1,
    alignContent: "stretch"
  },
  listBox: {
    flex: 1,
  },
  grid: {
    flex: 2,
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  gridItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  dropdown: {
    height: 35,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
});

export default CodeTypeValueLandingPage;
