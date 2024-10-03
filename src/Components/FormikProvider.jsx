import React from 'react';
import { Formik } from 'formik';

export const FormikProvider = ({ initialValues, validationSchema, onSubmit, children }) => {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ values, handleChange, handleBlur, handleSubmit, touched, errors }) => (
                <form onSubmit={handleSubmit}>
                    {React.Children.map(children, (child) =>
                        React.cloneElement(child, {
                            values,
                            handleChange,
                            handleBlur,
                            touched,
                            errors,
                        })
                    )}
                </form>
            )}
        </Formik>
    );
};
