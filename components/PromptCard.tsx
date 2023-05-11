"use client";

import { useState } from "react";
import Image from "next/image";
import { PromptResponse } from "@app/api/apiTypes";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const PromptCard = ({
  prompt,
  handleTagClick,
  handleEdit,
  handleDelete,
}: {
  prompt: PromptResponse;
  handleEdit: () => void;
  handleDelete: () => void;
  handleTagClick: (tag: string) => void;
}) => {
  const session = useSession() as any;
  const pathname = usePathname();
  const [copied, setCopied] = useState("");

  const withHashtag = (str: string) => {
    return str.includes("#") ? str : `#${str}`;
  };

  const handleCopy = () => {
    setCopied(prompt.title);
    navigator.clipboard.writeText(prompt.title);
    setTimeout(() => {
      setCopied("");
    }, 3000);
  };

  console.log("creator", prompt.creator);
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            className="rounded-full object-contain"
            src={prompt.creator.image || "/assets/images/user.svg"}
            alt="user_image"
            width={40}
            height={40}
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {prompt.creator?.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {prompt.creator?.email}
            </p>
          </div>
        </div>

        <div className="flex-1 flex justify-end items-center gap-3">
          <div className="btn_copy cursor-pointer" onClick={handleCopy}>
            <Image
              src={
                copied === prompt.title
                  ? "/assets/icons/tick.svg"
                  : "/assets/icons/copy.svg"
              }
              alt="copy"
              width={12}
              height={12}
            />
          </div>
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{prompt.title}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick?.(prompt.tag)}
      >
        {withHashtag(prompt.tag)}
      </p>
      {session?.user?.id === prompt.creator.id && pathname === "/profile" && (
        <div className="w-full flex flex-row justify-between mt-3">
          <div>
            <p
              className="font-inter text-sm green_gradient cursor-pointer"
              onClick={handleEdit}
            >
              Edit
            </p>
          </div>

          <div>
            <p
              className="font-inter text-sm green_gradient cursor-pointer"
              onClick={handleEdit}
            >
              Delete
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
