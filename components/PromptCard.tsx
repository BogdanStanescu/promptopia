"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const PromptCard = ({
  prompt,
  handleTagClick,
}: {
  prompt: any;
  handleTagClick: (tag: string) => void;
}) => {
  const [copied, setCopied] = useState("");

  const withHashtag = (str: string) => {
    return str.includes("#") ? str : `#${str}`;
  };

  const handleCopy = () => {
    setCopied(prompt.prompt);
    navigator.clipboard.writeText(prompt.prompt);
    setTimeout(() => {
      setCopied("");
    }, 3000);
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            className="rounded-full object-contain"
            src={prompt.creator?.image}
            alt="user_image"
            width={40}
            height={40}
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {prompt?.creator?.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {prompt.creator?.email}
            </p>
          </div>
        </div>

        <div className="flex-1 flex justify-end items-center gap-3">
          <div className="flex flex-col gap-1">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {prompt?.title}
            </h3>

            <p className="font-inter text-sm text-gray-500">
              {prompt?.description}
            </p>
          </div>

          <div className="btn_copy cursor-pointer" onClick={handleCopy}>
            <Image
              src={
                copied === prompt?.prompt
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
      <p className="my-4 font-satoshi text-sm text-gray-700">{prompt.prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick?.(prompt.tag)}
      >
        {withHashtag(prompt.tag)}
      </p>
    </div>
  );
};

export default PromptCard;
