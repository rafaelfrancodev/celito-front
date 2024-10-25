import React, { useState } from 'react';
import {
  Button,
  Input,
  Dropdown,
  Checkbox,
  Option,
  Divider,
  Field,
  Label,
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
} from '@fluentui/react-components';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import styled from 'styled-components';
import Section from '../Section/Section';

// Validation schema using Zod
const schema = z.object({
  label: z.string().min(1, 'Label is required'),
  viewType: z.enum(['Create', 'Edit', 'View']),
  sections: z.array(
    z.object({
      sectionName: z.string().min(1, 'Section name is required'),
      rows: z.array(
        z.object({
          fields: z.array(
            z.object({
              value: z.string().min(1, 'Field is required'),
              width: z.enum(['Small', 'Medium', 'Large', 'Extra Large']),
            })
          ),
        })
      ),
    })
  ),
});

const viewTypeOptions = [
  { key: 'Create', text: 'Create' },
  { key: 'Edit', text: 'Edit' },
  { key: 'View', text: 'View' },
];

// Styled Components
const Container = styled.div`
    display: flex;
    padding: 20px;
    max-width: 1200px;
    margin: 20px auto;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Sidebar = styled.div`
    width: 300px;
    background-color: #ffffff;
    border-right: 1px solid #ddd;
    padding: 15px;
`;

const ContentArea = styled.div`
    flex: 1;
    padding: 20px;
`;

const FormRow = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 20px;
    align-items: center;
    margin-bottom: 20px;
`;

const ErrorMessage = styled.span`
    color: red;
    font-size: 12px;
`;

const SectionList = styled.div`
    margin-bottom: 20px;
`;

const PageLayoutBuilder: React.FC = () => {
  const [showSections, setShowSections] = useState(false);
  const [activeSectionIndex, setActiveSectionIndex] = useState<number | null>(null);

  const { control, handleSubmit } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      label: '',
      viewType: 'Create',
      sections: [],
    },
  });

  const onSubmit = (data: any) => {
    console.log('Form Data:', data);
  };

  return (
    <Container>
      {/* Sidebar for Sections */}
      <Sidebar>
        <h3>Sections</h3>
        <SectionList>
          <Accordion>
            <Section control={control} onSectionClick={setActiveSectionIndex} />
          </Accordion>
        </SectionList>
        <Button appearance="primary" onClick={() => setShowSections(!showSections)}>
          {showSections ? 'Hide Sections' : 'Show Sections'}
        </Button>
      </Sidebar>

      {/* Content Area for Details */}
      <ContentArea>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormRow>
            <Field label="Label" required>
              <Controller
                name="label"
                control={control}
                render={({ field, fieldState }) => (
                  <>
                    <Input {...field} placeholder="Enter Label" required />
                    {fieldState.error && (
                      <ErrorMessage>{fieldState.error.message}</ErrorMessage>
                    )}
                  </>
                )}
              />
            </Field>

            <Field label="View Type" required>
              <Controller
                name="viewType"
                control={control}
                render={({ field }) => (
                  <Dropdown
                    {...field}
                    placeholder="Select View Type"
                    onOptionSelect={(event, data) => field.onChange(data.optionValue)}
                  >
                    {viewTypeOptions.map(option => (
                      <Option key={option.key} value={option.key}>
                        {option.text}
                      </Option>
                    ))}
                  </Dropdown>
                )}
              />
            </Field>
          </FormRow>

          <Divider style={{ marginBottom: '20px' }} />

          <Checkbox
            label="Show Sections"
            checked={showSections}
            onChange={() => setShowSections(!showSections)}
            style={{ marginBottom: '20px' }}
          />

          {/* Conditional Rendering of Section Details */}
          {showSections && activeSectionIndex !== null && (
            <Section control={control} activeIndex={activeSectionIndex} />
          )}

          <Divider style={{ margin: '20px 0' }} />

          <Button appearance="primary" type="submit" style={{ marginTop: '20px' }}>
            Save Layout
          </Button>
        </form>
      </ContentArea>
    </Container>
  );
};

export default PageLayoutBuilder;
