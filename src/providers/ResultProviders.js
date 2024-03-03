
import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { GetResults, GetAllUsers } from 'src/services/results';
import { useUserStore } from 'src/store/auth';
import { UseResultStore } from 'src/store/result';

export const ResultProviders = ({ children }) => {

  const { token } = useUserStore((state) => ({ token: state.token }));
  const { setResults, setUsers } = UseResultStore((state) => ({ setResults: state.setResults, setUsers: state.setUsers }));

  useQuery({
    queryKey: ["result"],
    queryFn: () => handleResult()
  })  

  useQuery({
    queryKey: ["users"],
    queryFn: () => handleUser()
  })    

  const handleResult = useCallback(async () => {
    if(token) {
      const results = await GetResults(token)
      if(results){
        setResults(results)
        return results
      }
    }
  }, [token, setResults])

  const handleUser = useCallback(async () => {
    if(token) {
      const users = await GetAllUsers(token)
      if(users){
        setUsers(users)
        return users
      }
    }
  }, [token, setUsers])


  return (
    <>
      {children}
    </>
  )
}