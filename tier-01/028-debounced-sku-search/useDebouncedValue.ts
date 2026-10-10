import { useEffect, useMemo, useState } from "react"

/**
 * Implement this hook — see PROBLEM.md.
 */
export function useDebouncedValue<T>(value: T, delayMs: number): T {

  const [debouncedQuery, setDebounceQuery] = useState<T >("" as T)
  useEffect(() => {

    if(delayMs===0) return 

      const timeout = setTimeout(() => {
        setDebounceQuery(value)

      }, delayMs)
  
  
      return () => {
         clearTimeout(timeout)
     }
    


    

  }, [value, delayMs])



  return delayMs===0?value: debouncedQuery
}
