import { Form, Formik } from 'formik';

const initialValues = {
  stopPage: '',
};

export default function Start() {
  const handleSubmit = () => {};
  return (
    <section className="bg-lightDark rounded-[30px] px-5 pt-5 pb-10">
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
        </Form>
      </Formik>
    </section>
  );
}
