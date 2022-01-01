import React from 'react';
import { TRecordsAccordionProps } from './types';
import RecordItem from '@components/RecordItem';

const RecordsAccordion: React.FC<TRecordsAccordionProps> = ({ recordListRender, handleDelete }) => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChangeToggle =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <>
      {recordListRender.map((record) => (
        <RecordItem
          record={record}
          key={record.id}
          handleChange={handleChangeToggle}
          handleDelete={handleDelete}
          expanded={expanded}
        />
      ))}
    </>
  );
};

export default RecordsAccordion;
