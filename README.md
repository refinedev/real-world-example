![refine example](logo.png)

 ### refine codebase containing real world examples (CRUD, auth, advanced patterns, etc) that adheres to the [RealWorld](https://github.com/gothinkster/realworld-example-apps) spec and API.

### [Demo](#)&nbsp;&nbsp;&nbsp;&nbsp;[RealWorld](https://github.com/gothinkster/realworld)


This codebase was created to demonstrate a fully fledged fullstack application built with [refine](https://github.com/refinedev/refine) including CRUD operations, authentication, routing, pagination, and more.



## How it works

refine is an open-source React framework for rapidly developing CRUD apps like admin panels, dashboards, and internal tools.
It can speed up your development time up to 3X without compromising freedom on styling, customization and project workflow.

`<Refine>` is the root component of the app rendered in `App.tsx` . Authentication handles by built-in `AuthProvider` support.

Thanks to `dataProvider` we can easily connect to any API and perform CRUD operations.

`<Refine>` component has a `resources` prop which is an array of objects that define the resources of the app.

[Refer documentation for more information](https://refine.dev/docs/api-reference/core/)

## Getting Started

You can view a live demo over at xxx

Clone the repo:

```
git clone https://github.com/refinedev/real-world-example.git
```

Go to directory and install dependencies:

```
npm install
```

To start development server:

```
npm run start
```




**General functionality:**

- Authenticate users via JWT (login/register pages + logout button on settings page)
- CRU\* users (sign up & settings page - no deleting required)
- CRUD Articles
- CR\*D Comments on articles (no updating required)
- GET and display paginated lists of articles
- Favorite articles
- Follow other users