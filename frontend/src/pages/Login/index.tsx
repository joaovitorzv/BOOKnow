import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import * as Yup from 'yup';
import { Formik, Field, Form, FormikProps } from 'formik'
import { useAuth } from '../../hooks/auth';

import Header from '../../components/Header';

import { Container } from './styles';
import { Input, BlackButton, Anchor, ErrorText } from '../../GlobalStyles';
import { KeyboardArrowRight } from '@styled-icons/material-sharp/KeyboardArrowRight'

import { IFormStatus, formStatusProps } from '../../types/IFormStatus';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Digite um email válido')
    .required('Email obrigatorio'),
  password: Yup.string().required('Senha obrigatoria')
});

interface IFormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [displayFormStatus, setDisplayFormStatus] = useState(false);
  const [formStatus, setFormStatus] = useState<IFormStatus>({
    message: '',
    type: '',
  });
  const { signIn } = useAuth();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: IFormValues, setSubmitting: Function) => {
      try {
        await signIn({ email: data.email, password: data.password });

        history.push('/');
      } catch (error) {
        setFormStatus(formStatusProps.invalid);
        setDisplayFormStatus(true);
        setSubmitting(false);
      }
    }, [signIn, history],
  );

  return (
    <>
      <Header />
      <Container>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values: IFormValues, actions) => {
            handleSubmit(values, actions.setSubmitting)
          }}
          validationSchema={validationSchema}
        >
          {(props: FormikProps<IFormValues>) => {
            const {
              touched,
              errors,
              isSubmitting,
            } = props
            return (
              <Form >
                <div className="inputs">
                  <h2>Entre na sua conta</h2>
                  <Field
                    name="email"
                    type="input"
                    as={Input}
                    placeholder="Email"
                  />
                  {errors.email && touched.email && <ErrorText>{errors.email}</ErrorText>}

                  <Field
                    name="password"
                    type="password"
                    as={Input}
                    placeholder="Senha"
                  />
                  {errors.password && touched.password && <ErrorText>{errors.password}</ErrorText>}
                  {displayFormStatus && <ErrorText>{formStatus.message}</ErrorText>}
                </div>
                <div className="form-actions">
                  <BlackButton disabled={isSubmitting} type="submit">
                    {isSubmitting ? "Entrando..." : "Entrar"} <KeyboardArrowRight size={30} />
                  </BlackButton>
                  <Anchor to="/signup">
                    <span>Não tenho uma conta</span>
                  </Anchor>
                </div>
              </Form>
            )
          }
          }
        </Formik>
      </Container>
    </>
  );
}

export default Login;