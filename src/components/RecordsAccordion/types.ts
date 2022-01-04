export type TRecordAccordion = {
  period: string;
  title: string;
  id: string;
  comment: string;
};

export type TRecordsAccordionProps = {
  recordListRender: Array<TRecordAccordion>;
  handleDelete: (event: React.MouseEvent<HTMLElement> | null, id: string) => void;
};
