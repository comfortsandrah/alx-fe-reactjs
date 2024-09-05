import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required'),
});

const FormikForm = () => (
    <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
            console.log(values);
        }}>
        {() => (
            <Form>
                <Field type="text" name="name" placeholder="name" />
                <ErrorMessage name="name" component='div' />
                <Field type="email" name="email" placeholder="email" />
                <ErrorMessage name="email" component='div' />
                <Field type="password" name="password" placeholder="******" />
                <ErrorMessage name="password" component='div' />
            </Form>
        )}
    </Formik>
)
export default FormikForm