import React from 'react';
import { Button } from '@fluentui/react-components';
import { useFieldArray, Controller } from 'react-hook-form';
import styled from 'styled-components';
import Row from '../Row/Row';

interface SectionProps {
  control: any;
  onSectionClick?: (index: number) => void; // New prop to handle section clicks
  activeIndex?: number; // New prop to indicate the active section
}

const SectionContainer = styled.div`
    margin-top: 15px;
`;

const SectionInput = styled.input<{ isActive: boolean }>`
    margin-bottom: 10px;
    padding: 8px;
    border: 1px solid ${({ isActive }) => (isActive ? '#6200EE' : '#ccc')};
    background-color: ${({ isActive }) => (isActive ? '#f0f0f0' : '#ffffff')};
    border-radius: 4px;
`;

const Section: React.FC<SectionProps> = ({ control, onSectionClick, activeIndex }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'sections',
  });

  const addSection = () => {
    append({ sectionName: '', rows: [] });
  };

  return (
    <SectionContainer>
      {fields.map((section, index) => (
        <div key={section.id}>
          <Controller
            name={`sections.${index}.sectionName`}
            control={control}
            render={({ field }) => (
              <SectionInput
                {...field}
                placeholder="Section Name"
                isActive={activeIndex === index}
                onClick={() => onSectionClick && onSectionClick(index)}
                required
              />
            )}
          />
          {activeIndex === index && (
            <Row sectionIndex={index} control={control} />
          )}
          <Button onClick={() => remove(index)}>Remove Section</Button>
        </div>
      ))}
      <Button onClick={addSection}>Add Section</Button>
    </SectionContainer>
  );
};

export default Section;
