# Employee Offboarding app

Develop an Employee Offboarding system using Angular and Google Material Design components. The application should manage the offboarding process of employees, including their personal information, exit interview details, and task checklist.

### Tasks completed

- Main Dashboard:
  - [x] Display a list of employees
  - [x] Include a search bar to filter employees by name or department. It should be done on frontend
- Employee Details Page:
  - [x] Display detailed information about the employee (e.g., name, department, email, equipment table).
- Offboard action:
  - [x] From the detailed page user should be able to “offboard” employees. The user should provide equipment offboarding details(employee address, optional notes, email, phone)
  - [x] After confirming the action, the user should be displayed on the main list with OFFBOARDED state without site reloading, This requirement should demonstrate your state management skill. Besides that, FE should make an /offboard call to the backend.
  - [x] Use forms with proper validation.

### Extra things done but not mentioned in the description

- [x] Own material theme
- [x] Eslint
- [x] Prettier
- [x] Path imports
- [x] Stylelint
- [x] Table sorting
- [x] Custom title service
- [x] Zoneless

### TODO (If I have enough time)

Below you can find a list of things, that could be added/improved.

- [] Provide description (Readme)
- [] 404 page
- [] Loading spinner
- [] Empty table indicator
- [] e2e tests
- [] Improved validation (e.g. postal code validation) or even better, create postalCode input component
- [] Improved error handling (generic solution)
- [] Sorting of the equipment column
- [] Improved RWD
