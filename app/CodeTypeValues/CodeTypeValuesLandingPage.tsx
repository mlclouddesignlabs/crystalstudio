import React, { useEffect, useMemo, useRef, useState } from "react";
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { CodeTypeValues } from "../CodeTypeValues/CodeTypeValues";
import { CodeTypes } from "../CodeTypes/CodeTypes";
import { DataTable, Card } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';



function CodeTypeValueLandingPage() {
  const headertextforToolbar = "Code Types Values";
  const [selectedCT, setSelectedCT] = useState<CodeTypes>();
  const [rowData, setRowData] = useState<CodeTypes[]>();
 // const [subrowData, setSubRowData] = useState<CodeTypeValues[]>();
  const [headertext, setheadertext] = useState(headertextforToolbar);
  const [selectedRowData, setSelectedRowData] = useState<CodeTypeValues>();  
  const addChildRef = useRef(null);
  const deleteChildRef = useRef(null);
  const editChildRef = useRef(null);

  const [subrowData, setSubRowData] = useState<CodeTypeValues[]>([
    { shortCode: 'A1', description: 'Description A1', codeTypeShortCode: 'Type1', codeTypeDesc: 'Type Description 1' },
    { shortCode: 'B2', description: 'Description B2', codeTypeShortCode: 'Type2', codeTypeDesc: 'Type Description 2' },
    { shortCode: 'C3', description: 'Description C3', codeTypeShortCode: 'Type3', codeTypeDesc: 'Type Description 3' },
  ]);
  // Sample dummy data
  const dummyCodeTypes: CodeTypes[]  = [
    { ShortCode: "AD", Description: "Andorra" },
    { ShortCode: "AE", Description: "United Arab Emirates" },
    { ShortCode: "AF", Description: "Afghanistan" },
    { ShortCode: "AG", Description: "Antigua and Barbuda" },
    { ShortCode: "AI", Description: "Anguilla" },
    { ShortCode: "AL", Description: "Albania" },
    { ShortCode: "AM", Description: "Armenia" },
    { ShortCode: "AO", Description: "Angola" },
    { ShortCode: "AQ", Description: "Antarctica" },
    { ShortCode: "AR", Description: "Argentina" }
  ];
  
  const dummyCodeTypeValues = [
    { shortCode: "001", description: "Sample Code 1", codeTypeShortCode: "AD", codeTypeDesc: "Andorra" },
    { shortCode: "002", description: "Sample Code 2", codeTypeShortCode: "AD", codeTypeDesc: "Andorra" },
    { shortCode: "003", description: "Sample Code 3", codeTypeShortCode: "AE", codeTypeDesc: "United Arab Emirates" }
  ];

  const refreshData1 = () => {
    fetch("your-api-url/api/CodeTypes")
      .then((result) => result.json())
      .then((data) => setRowData(data))
      .catch((error) => console.log(error));
  };

  const refreshCTVData1 = (ctShortCode: string) => {
    fetch(`your-api-url/api/CodeTypeValues/${ctShortCode}`)
      .then((result) => result.json())
      .then((data) => setSubRowData(data))
      .catch((error) => console.log(error));
  };
  const refreshCTVData = (ctShortCode:string) => {
    const filteredData = dummyCodeTypeValues.filter(item => item.codeTypeShortCode === ctShortCode);
    setSubRowData(dummyCodeTypeValues);
  };

 // Simulate fetching data
 const refreshData = () => {
    // Simulate an API call to fetch data
    setRowData(dummyCodeTypes);
  };
  useEffect(() => {
    refreshData();
  }, []);

  useEffect(() => {
    refreshCTVData("~~TEST~~");
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
      if (selectedCT && selectedCT.Description) {
        selectedRowData.codeTypeDesc = selectedCT.Description;
      }
      console.log(selectedRowData);
      //editChildRef.current?.Action();
    }
  };

  const OnAddClickHandler = () => {
    if (!selectedRowData || !selectedRowData.codeTypeShortCode) {
      console.error("Please select a Code Type to Add");
    } else {
      if (selectedCT && selectedCT.Description) {
        selectedRowData.codeTypeDesc = selectedCT.Description;
      }
     // addChildRef.current?.Action();
    }
  };

  const onListSelectionChanged = (item: CodeTypes) => {
    const codetype = {
      ShortCode: item.ShortCode,
      Description: item.Description,
    };

    const codetypedata = {
      shortCode: "",
      description: "",
      codeTypeShortCode: codetype.ShortCode,
      codeTypeDesc: codetype.Description,
    };

    setSelectedCT(codetype);
    setSelectedRowData(codetypedata);
    setheadertext(`${headertextforToolbar} :--> ${codetype.Description}`);
    refreshCTVData(codetype.ShortCode);
  };

  const onSelectionChanged = (item:CodeTypeValues) => {
    if (item) {
      setSelectedRowData(item);
      setSelectedCT(selectedCT);
    } else {
      setSelectedRowData({
        shortCode: "",
        description: "",
        codeTypeShortCode: selectedCT ? selectedCT.ShortCode : "",
        codeTypeDesc: selectedCT ? selectedCT.Description : "",
      });
    }
  };
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if (rowData || isFocus) {
      return (
        <Text style={[ isFocus && { color: 'blue' }]}>
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
        data={dummyCodeTypes}
        labelField="Description"
        valueField="ShortCode"
        placeholder="Select an option"        
        onChange={item => setSelectedCT(item)}
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
    verticalAlign:"top"  
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
    alignContent:"stretch"
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
