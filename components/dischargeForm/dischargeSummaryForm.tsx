import React, { useContext, useEffect, useState } from 'react';
import { DateTime, DischargeSummaryValues } from '@/types/discharge';
import { DischargeSummaryDate } from './dischargeSummaryDate';
import { DischargeFormContext, DischargeFromContextType } from '.';
import {
  Radio,
  RadioGroup,
  SimpleGrid,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Textarea,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { DischargeSummaryValueForm } from './dischargeSummaryValueForm';

export const DischargeSummaryForm: React.FC = () => {
  const { dischargeData, setDischargeData } = useContext(
    DischargeFormContext
  ) as DischargeFromContextType;

  const [patientAllergicTo, setPatientAllergicTo] = useState('');
  const [mlc, setMlc] = useState('Yes');
  const [department, setDepartment] = useState('');
  const [admission, setAdmission] = useState<DateTime>({});
  const [discharge, setDischarge] = useState<DateTime>({});
  const [surgery, setSurgery] = useState<DateTime>({});
  const [summaryValues, setSummaryValues] = useState<any>(
    dischargeData.dischargeSummary?.summaryValues || {}
  );

  useEffect(() => {}, [summaryValues]);

  return (
    <div className='mt-5'>
      <h1 className='text-xl font-semibold'>Discharge summary</h1>
      <SimpleGrid mt={3} columns={{ sm: 1, md: 2, lg: 3 }} gap={3}>
        <Textarea
          value={patientAllergicTo}
          onChange={(e) => setPatientAllergicTo(e.target.value)}
          variant='filled'
          placeholder='Patient allergic to'
          size='lg'
        />
        <div>
          <h2 className=''>MLC</h2>
          <RadioGroup mt={2} size='lg' onChange={setMlc} value={mlc}>
            <Stack direction='row'>
              <Radio value='Yes'>Yes</Radio>
              <Radio value='No'>No</Radio>
            </Stack>
          </RadioGroup>
        </div>
        <Textarea
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          variant='filled'
          placeholder='Department / Unit'
          size='lg'
        />
      </SimpleGrid>
      <TableContainer>
        <Table mt={3} size='lg' variant='simple'>
          <Thead>
            <Tr>
              <Th></Th>
              <Th>DATE</Th>
              <Th>TIME</Th>
            </Tr>
          </Thead>
          <Tbody>
            <DischargeSummaryDate
              title='Date of Admission'
              date={admission}
              setDate={setAdmission}
            />
            <DischargeSummaryDate
              title='Date of Discharge'
              date={discharge}
              setDate={setDischarge}
            />
            <DischargeSummaryDate
              title='Date of Surgery (if any) (Delivery)'
              date={surgery}
              setDate={setSurgery}
            />
          </Tbody>
        </Table>
      </TableContainer>
      <DischargeSummaryValueForm
        summaryValues={summaryValues}
        setSummaryValues={setSummaryValues}
      />
    </div>
  );
};
