import RecordListRenderer from '../RecordListRenderer';

describe('RecordListRenderer function testing', () => {
  it('Should return the correct object', () => {
    const recordList = [
      {
        id: '1',
        title: 'title of monthly remind',
        period: 'monthly',
        monthday: '8',
        holidays: 'afterHoliday',
        days: [1642366800000, 1644872400000],
      },
      {
        id: '2',
        title: 'title of quarterly remind',
        period: 'quarterly',
        monthday: '8',
        quarter: 'Янв, Апр, Июл, Окт',
        holidays: 'beforeHoliday',
        days: [1642366800000, 1644872400000],
      },
      {
        id: '2',
        title: 'title of quarterly remind',
        period: 'quarterly',
        monthday: '8',
        quarter: 'Фев, Май, Авг, Ноя',
        holidays: 'beforeHoliday',
        days: [1642366800000, 1644872400000],
      },
      {
        id: '2',
        title: 'title of quarterly remind',
        period: 'quarterly',
        monthday: '8',
        quarter: 'Мар, Июн, Сен, Дек',
        holidays: 'beforeHoliday',
        days: [1642366800000, 1644872400000],
      },
      {
        id: '3',
        title: 'title of weekly remind',
        period: 'weekly',
        weekday: '1',
        holidays: 'holidaysNoMatter',
        days: [1642366800000, 1644872400000],
      },
      {
        id: '3',
        title: 'title of weekly remind',
        period: 'weekly',
        weekday: '2',
        holidays: 'holidaysNoMatter',
        days: [1642366800000, 1644872400000],
      },
      {
        id: '3',
        title: 'title of weekly remind',
        period: 'weekly',
        weekday: '3',
        holidays: 'holidaysNoMatter',
        days: [1642366800000, 1644872400000],
      },
      {
        id: '3',
        title: 'title of weekly remind',
        period: 'weekly',
        weekday: '4',
        holidays: 'holidaysNoMatter',
        days: [1642366800000, 1644872400000],
      },
      {
        id: '3',
        title: 'title of weekly remind',
        period: 'weekly',
        weekday: '5',
        holidays: 'holidaysNoMatter',
        days: [1642366800000, 1644872400000],
      },
      {
        id: '3',
        title: 'title of weekly remind',
        period: 'weekly',
        weekday: '6',
        holidays: 'holidaysNoMatter',
        days: [1642366800000, 1644872400000],
      },
      {
        id: '3',
        title: 'title of weekly remind',
        period: 'weekly',
        weekday: '0',
        holidays: 'holidaysNoMatter',
        days: [1642366800000, 1644872400000],
      },
    ];
    const expected = [
      {
        id: '1',
        period: 'Ежемесячно',
        title: 'title of monthly remind',
        comment:
          '8-го числа. В случае выпадения на выходной или праздничный день перенос на ближайший рабочий день ПОСЛЕ наступления срока.',
      },
      {
        id: '2',
        period: 'Ежеквартально',
        title: 'title of quarterly remind',
        comment:
          '8-го числа в январе, апреле, июле, октябре. В случае выпадения на выходной или праздничный день перенос на ближайший рабочий день ДО наступления срока.',
      },
      {
        id: '2',
        period: 'Ежеквартально',
        title: 'title of quarterly remind',
        comment:
          '8-го числа в феврале, мае, августе, ноябре. В случае выпадения на выходной или праздничный день перенос на ближайший рабочий день ДО наступления срока.',
      },
      {
        id: '2',
        period: 'Ежеквартально',
        title: 'title of quarterly remind',
        comment:
          '8-го числа в марте, июне, сентябре, декабре. В случае выпадения на выходной или праздничный день перенос на ближайший рабочий день ДО наступления срока.',
      },
      {
        id: '3',
        period: 'Еженедельно',
        title: 'title of weekly remind',
        comment: 'Каждый понедельник. Праздники и выходные не влияют.',
      },
      {
        id: '3',
        period: 'Еженедельно',
        title: 'title of weekly remind',
        comment: 'Каждый вторник. Праздники и выходные не влияют.',
      },
      {
        id: '3',
        period: 'Еженедельно',
        title: 'title of weekly remind',
        comment: 'Каждую среду. Праздники и выходные не влияют.',
      },
      {
        id: '3',
        period: 'Еженедельно',
        title: 'title of weekly remind',
        comment: 'Каждый четверг. Праздники и выходные не влияют.',
      },
      {
        id: '3',
        period: 'Еженедельно',
        title: 'title of weekly remind',
        comment: 'Каждую пятницу. Праздники и выходные не влияют.',
      },
      {
        id: '3',
        period: 'Еженедельно',
        title: 'title of weekly remind',
        comment: 'Каждую субботу. Праздники и выходные не влияют.',
      },
      {
        id: '3',
        period: 'Еженедельно',
        title: 'title of weekly remind',
        comment: 'Каждое воскресенье. Праздники и выходные не влияют.',
      },
    ];
    expect(RecordListRenderer(recordList)).toEqual(expected);
  });
});
