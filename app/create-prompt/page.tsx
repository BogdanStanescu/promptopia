"use client";

import React, { useState } from "react";
import { SessionContextValue, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";
import { DefaultUser } from "next-auth";

type UserSession = SessionContextValue & {
  data: {
    user: DefaultUser & {
      id: string;
    };
  };
};

const CreatePrompt = () => {
  const router = useRouter();
  const { data } = useSession() as UserSession;
  const [isLoading, setIsLoading] = useState(false);

  const createPrompt = async ({
    prompt,
    tag,
  }: {
    prompt: string;
    tag: string;
  }) => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          tag,
          prompt,
          userId: data.user.id,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return <Form type="Create" isLoading={isLoading} onSubmit={createPrompt} />;
};

export default CreatePrompt;
