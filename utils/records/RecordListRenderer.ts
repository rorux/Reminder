import { TRecord } from '@store/records/types';
import { TRecordAccordion } from '@components/RecordsAccordion/types';

const RecordListRenderer = (recordList: Array<TRecord>): Array<TRecordAccordion> =>
  recordList.map((record) => {
    const recordObj = { period: '', title: '', id: '', comment: '' };

    recordObj.title = record.title;
    recordObj.id = record.id;

    switch (record.period) {
      case 'weekly':
        recordObj.period = 'Еженедельно';
        switch (record.weekday) {
          case '1':
            recordObj.comment = 'Каждый понедельник. ';
            break;
          case '2':
            recordObj.comment = 'Каждый вторник. ';
            break;
          case '3':
            recordObj.comment = 'Каждую среду. ';
            break;
          case '4':
            recordObj.comment = 'Каждый четверг. ';
            break;
          case '5':
            recordObj.comment = 'Каждую пятницу. ';
            break;
          case '6':
            recordObj.comment = 'Каждую субботу. ';
            break;
          case '0':
            recordObj.comment = 'Каждое воскресенье. ';
        }
        break;
      case 'monthly':
        recordObj.period = 'Ежемесячно';
        recordObj.comment = `${record.monthday}-го числа. `;
        break;
      case 'quarterly':
        recordObj.period = 'Ежеквартально';
        recordObj.comment = `${record.monthday}-го числа `;
        switch (record.quarter) {
          case 'Янв, Апр, Июл, Окт':
            recordObj.comment += 'в январе, апреле, июле, октябре. ';
            break;
          case 'Фев, Май, Авг, Ноя':
            recordObj.comment += 'в феврале, мае, августе, ноябре. ';
            break;
          case 'Мар, Июн, Сен, Дек':
            recordObj.comment += 'в марте, июне, сентябре, декабре. ';
        }
    }

    switch (record.holidays) {
      case 'holidaysNoMatter':
        recordObj.comment += 'Праздники и выходные не влияют.';
        break;
      case 'beforeHoliday':
        recordObj.comment +=
          'В случае выпадения на выходной или праздничный день перенос на ближайший рабочий день ДО наступления срока.';
        break;
      case 'afterHoliday':
        recordObj.comment +=
          'В случае выпадения на выходной или праздничный день перенос на ближайший рабочий день ПОСЛЕ наступления срока.';
        break;
    }

    return recordObj;
  });

export default RecordListRenderer;
