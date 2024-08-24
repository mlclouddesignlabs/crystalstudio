import React from "react";
import { TextInput } from "react-native-paper";

interface ICodeTypeFilterProps {
  onFilter: (key: string) => void;
}

const CodeTypeFilter: React.FC<ICodeTypeFilterProps> = React.memo(
  ({ onFilter }) => {
    const handleChange = (key: string) => {
      onFilter(key);
    };

    return (
      <TextInput
        mode="outlined"
        placeholder="Search Code Type"
        dense
        right={<TextInput.Icon icon="filter" />}
        onChangeText={handleChange}
      />
    );
  }
);

export default CodeTypeFilter;
