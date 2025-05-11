# Employee Offboarding app

### How to run the project

1. You need `docker` to run backend server
1. Clone the project
1. Navigate to root folder

#### Frontend

1. Run `npm i` to install all dependencies
1. Run `npm run start` to start Angular app

#### Backend

1. From the root folder navigate to `server` directory
1. (Windows OS) Start `Docker Desktop`
1. Start backend by running `docker-compose up --build` - it will start NestJS backend + MongoDB
1. To seed DB run `curl http://localhost:3000/employees-seeder` in your console. To reset DB to initial state you can run the same command.

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
- [x] Mocked backend in NestJS + Docker

### TODO (If I had more time)

Below you can find a list of things, that could be added/improved.

- [] 404 page
- [] Loading spinner
- [] Empty table indicator
- [] e2e tests
- [] Improved validation (e.g. postal code validation) or even better, create postalCode input component
- [] Improved error handling (generic solution)
- [] Sorting of the equipment column
- [] Improved RWD

Note: The purpose of this task was mainly about frontend (Angular). Backend could be improved but it wasn't the subject of this task. The biggest challange of this task was to include search input as a part of the mat-tabs wrapper component.
