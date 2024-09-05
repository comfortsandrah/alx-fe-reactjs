import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Validation schema using Yup
const validationSchema = Yup.object({
    name: Yup.string()
        .required('Name is required'),
    email: Yup.string()
        .email('Invalid email address').required('Email is required'),
    password: Yup.string()
        .required('Password is required'),
});

const FormikForm = () => {
    return (
        <Formik
            initialValues={{ name: '', email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
                // Submit logic
                console.log(values);
                resetForm(); // Reset form after submission
            }}
        >
            {({ isSubmitting }) => (
                <Form className="flex flex-col space-y-4">
                    <div>
                        <label htmlFor="name">Name</label>
                        <Field
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter your name"
                            className="border p-2"
                        />
                        <ErrorMessage
                            name="name"
                            component="p"
                            className="text-red-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="email">Email</label>
                        <Field
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            className="border p-2"
                        />
                        <ErrorMessage
                            name="email"
                            component="p"
                            className="text-red-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="password">Password</label>
                        <Field
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            className="border p-2"
                        />
                        <ErrorMessage
                            name="password"
                            component="p"
                            className="text-red-500"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-green-500 text-white p-2 font-bold"
                    >
                        Register
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default FormikForm;
