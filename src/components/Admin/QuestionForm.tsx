import React, { useState, useEffect } from "react";
import { type IQuestion } from "../../Types/question.type";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  question: IQuestion;
  onSave: (edit: IQuestion) => void;
}

const EditQuestionModal: React.FC<IProps> = ({
  isOpen,
  onClose,
  question,
  onSave,
}) => {
  const [formData, setFormData] = useState<IQuestion>({
    id: question?.id || "",
    question: question?.question || "",
    type: question?.type || "MCQ",
    options: question?.options || ["", "", "", ""],
    answer: question?.answer || "",
    score: question?.score || 0,
  });

  useEffect(() => {
    if (question) {
      setFormData({
        id: question.id,
        question: question.question,
        type: question.type,
        options: question.options || ["", "", "", ""],
        answer: question.answer,
        score: question.score,
      });
    }
  }, [question]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index?: number
  ) => {
    const { name, value } = e.target;

    if (name.startsWith("option") && index !== undefined) {
      const updatedOptions = [...formData.options];
      updatedOptions[index] = value;
      setFormData({ ...formData, options: updatedOptions });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
     onSave(formData);
     onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Edit Question</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Question</label>
            <input
              className="border p-2 rounded w-full"
              name="question"
              value={formData.question}
              onChange={handleChange}
              placeholder="Enter question"
              required
            />
          </div>

          <div className="flex items-center gap-6 mb-2">
            <span className="font-medium">Type:</span>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="type"
                value="T/F"
                checked={formData.type === "T/F"}
                onChange={handleChange}
              />
              True / False
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="type"
                value="MCQ"
                checked={formData.type === "MCQ"}
                onChange={handleChange}
              />
              Multiple Choice
            </label>
          </div>

          {/* Options for MCQ */}
          {formData.type === "MCQ" &&
            [0, 1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-2 mb-2">
                <span>{i + 1}.</span>
                <input
                  className="border p-2 rounded w-full"
                  name={`option${i}`}
                  value={formData.options[i] || ""}
                  onChange={(e) => handleChange(e, i)}
                  placeholder={`Option ${i + 1}`}
                />
              </div>
            ))}

          <div>
            <label className="block font-medium mb-1">Correct Answer</label>
            <input
              className="border p-2 rounded w-full"
              name="answer"
              value={formData.answer}
              onChange={handleChange}
              placeholder="Correct answer"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Score</label>
            <input
              type="number"
              className="border p-2 rounded w-full"
              name="score"
              value={formData.score}
              onChange={handleChange}
              placeholder="Question Score"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-amber-700 text-white py-2 px-4 rounded hover:bg-amber-600 transition-all"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditQuestionModal;
