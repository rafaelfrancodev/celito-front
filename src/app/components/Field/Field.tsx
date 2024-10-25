import React from 'react';
import { Controller } from 'react-hook-form';
import { Dropdown, Input, Option } from '@fluentui/react-components';
import styled from 'styled-components';

interface FieldProps {
  sectionIndex: number;
  rowIndex: number;
  control: any;
}

const FieldContainer = styled.div`
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
`;

// Define width options
const widthOptions = [
  { key: 'Small', text: 'Small' },
  { key: 'Medium', text: 'Medium' },
  { key: 'Large', text: 'Large' },
  { key: 'Extra Large', text: 'Extra Large' },
];

const Field: React.FC<FieldProps> = ({ sectionIndex, rowIndex, control }) => {
  return (
    <FieldContainer>
      <Controller
        name={`sections.${sectionIndex}.rows.${rowIndex}.fields.0.value`}
        control={control}
        render={({ field }) => (
          <Input {...field} placeholder="Field Value" required />
        )}
      />
      <Controller
        name={`sections.${sectionIndex}.rows.${rowIndex}.fields.0.width`}
        control={control}
        render={({ field }) => (
          <Dropdown
            {...field}
            placeholder="Select Width"
            onOptionSelect={(event, data) => field.onChange(data.optionValue)}
          >
            {widthOptions.map(option => (
              <Option key={option.key} value={option.key}>
                {option.text}
              </Option>
            ))}
          </Dropdown>
        )}
      />
    </FieldContainer>
  );
};

export default Field;
