import React, { useCallback } from 'react'
import { AnswerContext } from 'src/contexts/AnwerContext'
import { useQuery, useMutation, useQueryClient  } from "@tanstack/react-query";
import { GetAnswers, CreateAnswer, UpdateAnswer, RemoveAnswer } from 'src/services/answer';
import { useUserStore } from 'src/store/auth';
import { UseAnswerStore } from 'src/store/answer';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"


export const AnswerProviders = ({ children }) => {
  const { token } = useUserStore((state) => ({ token: state.token }));
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { setAnswers } = UseAnswerStore((state) => ({ setAnswers: state.setAnswers }));


  const { mutate: handleCreateAnswer, isLoading: createAnswerLoading } = useMutation({
    mutationFn: CreateAnswer,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['answer'] });
        toast("new answer created!", { type: "success" })
        navigate("/dashboard/answer");
      }, 
    onError: (err) => {  
      toast(err.response.data.message, { type: "warning" })
    },
  });

  const { mutate: handleUpdateAnswer, isLoading: updateAnswerLoading } = useMutation({
    mutationFn: UpdateAnswer,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['answer'] });
        toast("answer successfully updated", { type: "success" })
        navigate("/dashboard/answer");
      }, 
    onError: (err) => {
      toast(err.response.data.message, { type: "warning" })
    },
  });

  const { mutate: handleRemoveAnswer } = useMutation({
    mutationFn: RemoveAnswer,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['answer'] });
        toast("answer successfully removed", { type: "success" })
        navigate("/dashboard/answer");
      }, 
    onError: (err) => {
      toast(err.response.data.message, { type: "warning" })
    },
  });

  useQuery({
    queryKey: ["answer"],
    queryFn: () => handleAnswer()
  })

  const handleAnswer = useCallback(async () => {
    if(token) {
      const answers = await GetAnswers(token)
      if(answers){
        setAnswers(answers)
        return answers
      }
    }
  }, [token, setAnswers])
  

  return (
    <AnswerContext.Provider
      value={{
        createAnswer: (payload) => { handleCreateAnswer(payload) },
        updateAnswer: (payload) => { handleUpdateAnswer(payload) },
        removeAnswer: (payload) => { handleRemoveAnswer(payload) },
        createAnswerLoading: createAnswerLoading,
        updateAnswerLoading: updateAnswerLoading
      }}
    >
      {children}
    </AnswerContext.Provider>
    )
}