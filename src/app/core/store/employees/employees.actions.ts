import { StatusType } from '@app/core/enums/status.enum';

const ACTION_SCOPE = '[Employees]';

export class GetEmployees {
  static readonly type = `${ACTION_SCOPE} Get employees`;
}

export class SetEmployeesFilter {
  static readonly type = `${ACTION_SCOPE} Set Employees Filter`;

  constructor(public filter: string | undefined) {}
}

export class SetEmployeeStatus {
  static readonly type = `${ACTION_SCOPE} Set Employee Status`;

  constructor(
    public id: string,
    public status: StatusType
  ) {}
}
