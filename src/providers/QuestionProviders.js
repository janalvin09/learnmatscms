import React, { useCallback } from 'react'
import { QuestionContext } from 'src/contexts/QuestionContext'
import { useQuery, useMutation, useQueryClient  } from "@tanstack/react-query";
import { GetQuestions, CreateQuestion, UpdateQuestion, RemoveQuestion } from 'src/services/questions';
import { useUserStore } from 'src/store/auth';
import { UseQuestionStore } from 'src/store/question';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"


export const QuestionProviders = ({ children }) => {
  const { token } = useUserStore((state) => ({ token: state.token }));
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { setQuestions } = UseQuestionStore((state) => ({ setQuestions: state.setQuestions }));



  const { mutate: handleCreateQuestion, isLoading: createQuestionLoading } = useMutation({
    mutationFn: CreateQuestion,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['question'] });
        toast("new question created!", { type: "success" })
        navigate("/dashboard/question");
      }, 
    onError: (err) => {  
      toast(err.response.data.message, { type: "warning" })
    },
  });

  const { mutate: handleUpdateQuestion, isLoading: updateQuestionLoading } = useMutation({
    mutationFn: UpdateQuestion,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['question'] });
        toast("question successfully updated", { type: "success" })
        navigate("/dashboard/question");
      }, 
    onError: (err) => {
      toast(err.response.data.message, { type: "warning" })
    },
  });
  
  const { mutate: handleRemoveQuestion } = useMutation({
    mutationFn: RemoveQuestion,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['question'] });
        toast("question successfully removed", { type: "success" })
        navigate("/dashboard/question");
      }, 
    onError: (err) => {
      toast(err.response.data.message, { type: "warning" })
    },
  });
  
  useQuery({
    queryKey: ["question"],
    queryFn: () => handleQuestion()
  })

  const handleQuestion = useCallback(async () => {
    if(token) {
      const questions = await GetQuestions(token)
      if(questions){
        setQuestions(questions)
        return questions
      }
    }
  }, [token, setQuestions])
  



  return (
    <QuestionContext.Provider
      value={{
        createQuestion: (payload) => { handleCreateQuestion(payload) },
        updateQuestion: (payload) => { handleUpdateQuestion(payload) },
        removeQuestion: (payload) => { handleRemoveQuestion(payload) },
        createQuestionLoading: createQuestionLoading,
        updateQuestionLoading: updateQuestionLoading
      }}
    >
      {children}
    </QuestionContext.Provider>
  )
}