import * as Yup from 'yup';

const schema = Yup.object().shape({
  question: Yup.string()
    .required('Question is required')
    .min(10, 'Valid question needed'),
  type: Yup.string()
    .oneOf(["T/F", "MCQ"])
    .required('Choose any of the type'),
  options: Yup.array().when("type", {
    is: "MCQ",
    then: Yup.array()
      .of(Yup.string().required("Option is required"))
      .min(4, "All four options must be filled"),
    otherwise: Yup.array().of(Yup.string()), 
  }),
  answer: Yup.string()
    .required("Answer is required")
    .test("answer-match", "Answer must be one of the options", function(value) {
       const { options } = this.parent;
        return options.includes(value);
    }),
  score: Yup.number()
    .typeError("Score must be number")
    .min(1, "Score must be at least 1")
    .required("Score is required"),
});

export default schema;
