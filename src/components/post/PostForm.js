import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import FieldInput from '../common/FieldInput';
import SelectInput from '../common/SelectInput';

export const PostForm = ({ handleSubmit, pristine, reset, submitting, heading, authors, handleSave, handleCancel }) => {
  return (
    <form onSubmit={handleSubmit(handleSave)}>
      <h1>{heading}</h1>

      <Field type="text" name="name" label="Title" placeholder="Title of the post" component={FieldInput} />

      <Field name="authorId" label="Author" options={authors} component={SelectInput} />

      <Field type="text" name="category" label="Category" placeholder="Category of the post" component={FieldInput} />

      <Field
        type="text"
        name="length"
        label="Length"
        placeholder="Lenght of post in minutes or hours"
        component={FieldInput}
      />

      <div>
        <button type="submit" disabled={submitting} className="btn btn-primary">
          <i className="fa fa-paper-plane-o" aria-hidden="true" /> Submit
        </button>

        {heading === 'Add' && (
          <button type="button" disabled={pristine || submitting} onClick={reset} className="btn btn-default btn-space">
            Clear Values
          </button>
        )}

        <button type="button" className="btn btn-default btn-space" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

const validate = values => {
  const errors = {};

  if (!values.name) {
    errors.name = 'Required';
  }

  if (!values.category) {
    errors.category = 'Required';
  }

  if (!values.length) {
    errors.length = 'Required';
  }

  if (!values.authorId) {
    errors.authorId = 'Required';
  }

  return errors;
};

PostForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  heading: PropTypes.string.isRequired,
  authors: PropTypes.array.isRequired,
  handleSave: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'PostForm',
  validate,
})(PostForm);
