import Link from "next/link";
import { useState } from "react";

interface FormProps {
  type: string;
  isLoading: boolean;
  onSubmit: (formData: { prompt: string; tag: string }) => void;
}

const Form = ({ type, isLoading, onSubmit }: FormProps) => {
  const [formData, setFormData] = useState({
    prompt: "",
    tag: "",
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <section className="w-full max-w-full flex flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Prompt</span>
      </h1>

      <p className="desc text-left max-w-md">
        {type} and share amazing prompts with the world and let your imagination
        run wild with any AI powerful platform.
      </p>

      <form
        className="w-full max-w-2xl flex flex-col gap-7 glassmorphism mt-10"
        onSubmit={handleSubmit}
      >
        <label htmlFor="prompt">
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your AI Prompt
          </span>

          <textarea
            name="prompt"
            className="form_textarea"
            required
            placeholder="Write your prompt here..."
            value={formData.prompt}
            onChange={handleInputChange}
          />
        </label>

        <label htmlFor="tag">
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag
            <span className="font-normal ml-2">
              (#product, #webdevelopment, #idea)
            </span>
          </span>

          <input
            name="tag"
            className="form_input"
            required
            placeholder="#tag"
            value={formData.tag}
            onChange={handleInputChange}
          />
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>

          <button
            type="submit"
            disabled={isLoading}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            {isLoading ? "Submitting..." : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
