import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TRecordsAccordionProps } from './types';

const RecordsAccordion: React.FC<TRecordsAccordionProps> = ({ recordListRender }) => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      {recordListRender.map((record) => {
        return (
          <Accordion
            expanded={expanded === `panel${record.id}`}
            onChange={handleChange(`panel${record.id}`)}
            key={record.id}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${record.id}bh-content`}
              id={`panel${record.id}bh-header`}
            >
              <Typography sx={{ width: '33%', flexShrink: 0 }}>{record.period}</Typography>
              <Typography sx={{ color: 'text.secondary' }}>{record.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{record.comment}</Typography>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </>
  );
};

export default RecordsAccordion;
