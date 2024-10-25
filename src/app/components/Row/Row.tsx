import React from 'react';
import { Button } from '@fluentui/react-components';
import { useFieldArray } from 'react-hook-form';
import styled from 'styled-components';
import Field from '../Field/Field';

interface RowProps {
  sectionIndex: number;
  control: any;
}

const RowContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
`;

const Row: React.FC<RowProps> = ({ sectionIndex, control }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `sections.${sectionIndex}.rows`,
  });

  const addRow = () => {
    append({ fields: [{ value: '', width: 'Small' }] });
  };

  return (
    <RowContainer>
      {fields.map((row, rowIndex) => (
        <div key={row.id}>
          <Field sectionIndex={sectionIndex} rowIndex={rowIndex} control={control} />
          <Button onClick={() => remove(rowIndex)} appearance="secondary">
            Remove Row
          </Button>
        </div>
      ))}
      <Button onClick={addRow} appearance="primary">
        Add Row
      </Button>
    </RowContainer>
  );
};

export default Row;
