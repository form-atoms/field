<div align="center">
  <img width="180" style="margin: 32px" src="./react-last-field.svg">
  <h1>react-last-field</h1>
</div>

Declarative & headless form fields build on top of [`jotai & form-atoms`](https://github.com/jaredLunde/form-atoms).

```
yarn add @react-last-field/field
```

### Motivation

`react-last-field` is the 'last-mile' of your app's form stack. It has layered, bottom-up architecture with clear separation of concerns.
We provide you with stable pre-fabricated UI fields, while you still can go one level down and take the advantage of form primitives to develop anything you need.

To contrast it with formik or react-hook-form, our form state thanks to `jotai` lives outside of the react tree, so you never lose it when the component unmounts.
Moreover, jotai's external state unlike redux-form has compact API with 'atom-local reducer' and automatic dependency tracking leading to unmatched rendering performance.

![architecture](./architecture.png)

### What's in the box?

The `form-atoms` library provides atomic form primitives capable of tracking input value, touch state, validation status and more.

`react-last-field` extends these primitives & packages them into hooks & headless components (think 'smart components'), which can be easily wired to UI (think dumb components) checkbox, select or array field.

### What is a `<LastField />`?

Most UI libraries provide styled primitive input components, form labels and form controls. These must be integrated together with state & validation libraries, so when the input value is invalid, the error is propagated to the form control or the label is colored to red. The work to get this right is non-trivial and error prone.

`react-last-field` provides you with **integrated LastField components** so it will be the last time you do it.

### Integrations

`react-last-field` comes with `<LastFields />` pre-wired to popular UI libraries.

| Package                            | Storybook                                                               | Oficial Docs                                                    |
| ---------------------------------- | ----------------------------------------------------------------------- | --------------------------------------------------------------- |
| [Flowbite](./packages/flowbite/)   | [🎨 last-field/flowbite](https://react-last-form-flowbite.netlify.app/) | [flowbite-react](https://flowbite-react.com/forms)              |
| [Chakra UI](./packages/chakra-ui/) | 🚧 WIP                                                                  | [chakra-ui](https://chakra-ui.com/docs/components/form-control) |
