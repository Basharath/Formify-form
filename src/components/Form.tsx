import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';

const Main = styled('div')``;

interface FormProps {
  open: boolean;
}

const Form = styled.div<FormProps>`
  position: fixed;
  bottom: 65px;
  /* left: 20px;  */
  right: 20px;
  box-sizing: border-box;
  z-index: 9999;

  background-color: #374151;
  padding: 28px;
  border: 2px solid #eee;
  border-radius: 10px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin-bottom: 10px;
  width: 300px;
  /* transform: translateX(-400px); */
  transform: ${(props) => (props.open ? 'translateX(0)' : 'translateX(400px)')};
  transition: transform 0.7s ease;
`;

const FormToggler = styled('div')`
  position: fixed;
  bottom: 20px;
  /* left: 20px;  */
  right: 20px;
  box-sizing: border-box;
  z-index: 9999;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  background-color: #374151;
  text-align: center;
  padding: 5px;
  display: grid;
  place-content: center;
  cursor: pointer;
`;

const FormHeading = styled('div')`
  font-size: 24px;
  color: #f9fafb;
  margin-bottom: 12px;
`;

const FormMain = styled('div')`
  display: flex;
  flex-direction: column;
`;

const FormInput = styled('input')`
  box-sizing: border-box;
  width: 100%;
  padding: 8px;
  margin-bottom: 14px;
  border: none;
  border-radius: 4px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #111;
  font-size: 15px;

  &:focus {
    outline: 1px solid #eee;
  }
`;

const FormTextArea = styled('textarea')`
  max-height: 300px;
  max-width: 100%;
  min-width: 100%;
  min-height: 100px;
`;

const FormSubmit = styled('button')`
  width: 100%;
  padding: 6px 8px;
  border: none;
  border-radius: 4px;
  font-size: 17px;
  background-color: #3b82f6;
  color: #eee;
  cursor: pointer;
`;

const FormLoader = styled('div')`
  position: absolute;
  background-color: rgba(255, 255, 255, 0.01);
  inset: 0;
  width: 100%;
  height: 100%;
  place-content: center;
  display: grid;
`;

interface AlertProps {
  type: string;
}

const FormAlert = styled.div<AlertProps>`
  text-align: center;
  font-size: 16px;
  padding-bottom: 10px;
  color: ${({ type }) => (type === 'success' ? '#22d3ee' : '#e8e840')};
`;

interface FormFieldTypes {
  name?: string;
  email?: string;
  twitter?: string;
  website?: string;
  message?: string;
}

const initialAlert = {
  type: '',
  text: '',
};

interface FormifyFormProps {
  formFields: Array<keyof FormFieldTypes>;
  formURL: string;
  formTitle?: string;
}

function FormifyForm({
  formFields,
  formURL,
  formTitle = 'Contact',
}: FormifyFormProps) {
  const initialInputs = formFields.reduce((a, c) => ({ ...a, [c]: '' }), {});
  const [inputFields, setInputFields] = useState<FormFieldTypes>(initialInputs);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(initialAlert);

  const validateEmailFormat = (emailAddr: string) => {
    const validRegex = /^\S+@\S+\.\S+$/;
    return validRegex.test(emailAddr);
  };

  const sendAlert = (type: string, text: string) => {
    setAlert({ type, text });
    setTimeout(() => {
      setAlert(initialAlert);
    }, 2500);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSubmit = async () => {
    const emptyFields = Object.entries(inputFields).filter(
      ([k, v]) => v === ''
    );
    if (emptyFields.length > 0) {
      return sendAlert('warning', 'Please fill all the fields');
    }
    if (inputFields.email !== undefined) {
      const result = validateEmailFormat(inputFields.email);
      if (!result) return sendAlert('warning', 'Please enter valid email!');
    }

    try {
      setIsLoading(true);
      const res = await fetch(formURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputFields),
      });
      const result = await res.json();
      if (result) {
        setInputFields(initialInputs);
        setIsLoading(false);
        sendAlert('success', 'Successfully sent!');
      }
    } catch (err) {
      setIsLoading(false);
      sendAlert('warning', 'Something went wrong. Try again!');
    }
  };
  return (
    <Main>
      <Form open={isOpen}>
        <FormHeading>{formTitle}</FormHeading>
        <FormMain>
          {formFields.map((f, idx) => {
            if (f === 'message')
              return (
                <FormInput
                  as={FormTextArea}
                  type='text'
                  name='message'
                  value={inputFields[f]}
                  placeholder='Message'
                  key={idx}
                  onChange={handleChange}
                />
              );
            else
              return (
                <FormInput
                  key={idx}
                  placeholder={capitalize(f)}
                  name={f}
                  value={inputFields[f]}
                  type={f === 'email' ? 'email' : 'text'}
                  onChange={handleChange}
                />
              );
          })}
          <FormAlert type={alert.type}>{alert.text}</FormAlert>
          <FormSubmit onClick={handleSubmit}>Send</FormSubmit>
        </FormMain>
        {isLoading && (
          <FormLoader>
            <svg
              version='1.1'
              id='L4'
              xmlns='http://www.w3.org/2000/svg'
              xmlnsXlink='http://www.w3.org/1999/xlink'
              x='0px'
              y='0px'
              viewBox='0 10 50 80'
              enableBackground='new 0 0 0 0'
              xmlSpace='preserve'
              width='80'
              height='80'
            >
              <circle fill='#0ea5e9' stroke='none' cx='6' cy='50' r='6'>
                <animate
                  attributeName='opacity'
                  dur='1s'
                  values='0;1;0'
                  repeatCount='indefinite'
                  begin='0.1'
                />
              </circle>
              <circle fill='#0ea5e9' stroke='none' cx='26' cy='50' r='6'>
                <animate
                  attributeName='opacity'
                  dur='1s'
                  values='0;1;0'
                  repeatCount='indefinite'
                  begin='0.2'
                />
              </circle>
              <circle fill='#0ea5e9' stroke='none' cx='46' cy='50' r='6'>
                <animate
                  attributeName='opacity'
                  dur='1s'
                  values='0;1;0'
                  repeatCount='indefinite'
                  begin='0.3'
                />
              </circle>
            </svg>
          </FormLoader>
        )}
      </Form>
      <FormToggler onClick={handleToggle}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-5 w-5 text-gray-50'
          style={{ color: '#eee', fill: 'none' }}
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth={2}
          width='28'
          height='28'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
          />
        </svg>
      </FormToggler>
    </Main>
  );
}

export default FormifyForm;
