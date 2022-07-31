<h1 align="center">Formify form</h1>

Formify is an open source application that lets you create, manage and embed contact forms on any site without writing code.

## Installation

#### With yarn

```sh
yarn add formify-form
```

#### With NPM

```sh
npm install formify-form
```

## Getting Started

First visit [formify.vercel.app](https://formify.vercel.app) and get the formURL and formFields if you want to use Formify application.

Or if you have an end point that accepts forms then you can make use of it.

```jsx
import { Form } from ' formify-form';

const App = () => {
  return (
    <div>
      <Form
        formFields={['name', 'email', 'message']}
        formURL='https://formify.vercel.app/api/forms/submissions?id=<ID from formify>'
        formTitle='Share your feedback'
      />
    </div>
  );
};
```

You can see a contact form icon at the bottom right corner of your site and anybody can fill the details and submit it.

## About Formify

Find more details about Formify project at Formify [Github](https://github.com/Basharath/Formify)

## License

Formify is distributed using the MIT License. Check the [License details](https://github.com/Basharath/FormEasy/blob/master/LICENSE).
