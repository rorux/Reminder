import React from 'react';
import { useParams } from 'react-router-dom';

const RecordEdit = () => {
  console.log(useParams());
  return <div data-test="record-edit">Редактирование записи</div>;
};

export default RecordEdit;
