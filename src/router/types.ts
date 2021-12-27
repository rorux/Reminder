import { RouteProps } from 'react-router-dom';

export interface IRouteProps extends RouteProps {
  authed: boolean | null;
}

export enum ROUTES {
  MAIN = '/',
  DASHBOARD = '/dashboard',
  CALENDAR = '/calendar',
  PROFILE = '/profile',
  LOGIN = '/login',
  REGISTER = '/register',
  CREATE_RECORD = '/create',
  EDIT_RECORD = '/edit/:id',
  NOT_FOUND = '/not-found',
}

export enum ROUTES_NAME {
  MAIN = 'Главная',
  DASHBOARD = 'Напоминания',
  CALENDAR = 'Календарь',
  PROFILE = 'Профиль',
  LOGIN = 'Авторизация',
  REGISTER = 'Регистрация',
  CREATE_RECORD = 'Новое напоминание',
  EDIT_RECORD = 'Изменение напоминания',
  NOT_FOUND = 'Страница не найдена',
}
