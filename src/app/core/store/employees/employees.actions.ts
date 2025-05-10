const ACTION_SCOPE = '[Employees]';

export class GetEmployees {
  static readonly type = `${ACTION_SCOPE} Get employees`;
}

export class SetEmployeesFilter {
  static readonly type = `${ACTION_SCOPE} SetE mployees Filter`;

  constructor(public filter: string | undefined) {}
}
