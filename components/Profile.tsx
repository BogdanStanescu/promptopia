import { PromptResponse } from "@app/api/apiTypes";
import PromptCard from "./PromptCard";

interface ProfileProps {
  name: string;
  description: string;
  data: PromptResponse[];
  handleEdit: () => void;
  handleDelete: () => void;
}

const Profile = (props: ProfileProps) => {
  return (
    <div className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{`${props.name}'s`} Profile</span>
      </h1>
      <p className="desc text-left">{props.description}</p>

      <div className="mt-10 prompt_layout">
        {props.data.map((prompt, index) => (
          <PromptCard
            key={index}
            prompt={prompt}
            handleEdit={props.handleEdit}
            handleDelete={props.handleDelete}
            handleTagClick={() => {}}
          />
        ))}
      </div>
    </div>
  );
};

export default Profile;
