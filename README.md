# TheGame

Since this project was intended as a small-scale test, its architecture may differ from that of a large-scale enterprise project.

## Folder structure

The approach was to keep it minimal, while still incorporating some real-life examples.

### Current

```txt
- app
  - core/
    - factories
    - models
    - queries
    - services
    - state
       - actions
       - reducers
       - effects
       - selectors
    - modules
      - module-name
- assets
- e2e
- environments
```

## Large projects

```txt
- app
  - core
    - auth
      - auth.guard.ts
      - auth.interceptor.ts
      - auth.service.ts
      - auth.effects.ts
    - http
      - http-error.interceptor.ts
      - http.interceptor.ts
    - store
      - index.ts
      - reducers.ts
    - models
      - user.model.ts
  - modules
    - home
      - home.component.ts
      - home.component.html
      - home.component.scss
      - home.effects.ts
      - home.reducer.ts
      - home.actions.ts
      - home.service.ts
      - home.query.ts
      - home.graphql.ts
    - shared
      - components
        - header
          - header.component.ts
          - header.component.html
          - header.component.scss
        - footer
          - footer.component.ts
          - footer.component.html
          - footer.component.scss
      - directives
        - click-outside.directive.ts
      - pipes
        - truncate.pipe.ts
      - models
        - post.model.ts
    - user
      - user.component.ts
      - user.component.html
      - user.component.scss
      - user.effects.ts
      - user.reducer.ts
      - user.actions.ts
      - user.service.ts
      - user.query.ts
      - user.graphql.ts
  - app.component.ts
  - app.component.html
  - app.component.scss
  - app.module.ts
  - app-routing.module.ts
- assets
  - images
  - styles
    - tailwind.scss
- environments
  - environment.tsts
  - environment.staging.ts
  - environment.prod.ts
```

- app/core: This folder contains the core functionality of the application such as authentication, HTTP interceptors, and the store.
- auth: This folder contains the authentication-related code such as guards, interceptors, and services for authentication.
- http: This folder contains the HTTP interceptors to handle errors and attach authorization headers if needed.
- store: This folder contains the ngrx store related code such as reducers and effects.
- app/modules: This folder contains the feature modules of the application.
- home: This folder contains the code related to the home module such as the component, effects, reducer, actions, service, and GraphQL-related code.
- shared: This folder contains the shared components, directives, and pipes that can be used across the application.
- user: This folder contains the code related to the user module such as the component, effects, reducer, actions, service, and GraphQL-related code.
- app/app.component.*: These files contain the root component of the application.
- app/app.module.ts: This file contains the root module of the application.
- app/app-routing.module.ts: This file contains the routing configuration of the application.
- assets: This folder contains the assets used by the application such as images and styles.
- environments: This folder contains the environment configurations for the application such as API URLs and other environment-specific variables.

## Issues found

Unfortunately, an issue was encountered during testing with the subscription functionality. As suggested to me, I checked the Apollo Server documentation on CSGoroll.com's Staging environment and tested it there, but it still did not work using the provided wss:// URL.

### Subscription suggested to me

```graphql
subscription OnUpdateWallet {
  updateWallet {
    wallet {
      id
      amount
      name
    }
  }
}
```

Despite this setback, I aimed to complete the test as required. Instead of relying on the subscription, I made sure to dispatch another action to fetch the wallet whenever a reward was opened (triggered by a mutation). This approach is also commonly used when Graphql is not being used in the project and just RPC. I have experience using "Epics" for several years, both on the FE and BE.

## Principles & Best Practices followed

- Separation of concerns: The component class is responsible for the component's view logic, while the state management logic is handled by `ngrx/store`. This separation makes the code easier to understand and maintain.
- OnPush change detection strategy: By using the `ChangeDetectionStrategy.OnPush` strategy, Angular will only check for changes to the component's inputs, outputs, or when an event fires. This can significantly improve performance in large applications.
- Type safety: Typescript is used to add type safety to the component and state management logic. This helps prevent errors and makes it easier to understand the code.
- Store and Selector functions: The state management logic is written using `ngrx/store` and `selector` functions. This makes the code easier to test and maintain, as the logic is separated into small, reusable functions.
- Asynchronous code: Asynchronous code is handled using the Observable pattern, which is a common practice in Angular.
- Explicit routes: Each route is defined explicitly using the Routes interface. This makes it clear which components are associated with which routes.
- Path matching: The redirectTo route uses the pathMatch property to ensure that the default route only matches the exact URL.
- AppModule separation: The routing configuration is defined in a separate `AppRoutingModule` module, which makes it easier to import and reuse in other modules.
- Component's template: Separated in a different file, which follows the best practice of keeping the HTML, CSS and TS code separated.
- Angular Animation: The components is using Angular animations which is a recommended approach when it comes to animation in Angular.
- Reactive Programming: Components is using the reactive programming approach provided by `ngrx/store` and `ngrx/effects`, which is a recommended approach for state management in Angular.
- AngularRouter: Components is using the built-in Angular Router for navigating between different views in the application which is the recommended approach for handling routing in Angular.
- Subscribing onInit: Component is subscribing to state changes in the ngOnInit method, which is a best practice when it comes to using observables in Angular.
- More

## What else could have been added

- Lazy loading: The example code does not demonstrate lazy loading of modules, but this feature should be used in larger applications to improve performance.
- Tests: Coverage of at least 88-90%
- Eslint: Proper eslint rules
- Better UI/UX
- Default image upon fail to load

## Usage

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
