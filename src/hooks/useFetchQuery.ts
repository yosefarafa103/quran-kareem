import { useQuery } from "@tanstack/react-query";
export function useFetchQuery<T = any>(func: any, key: string) {
  const { data, isLoading } = useQuery<T>({
    queryFn: func,
    queryKey: [key],
  });
  return { data, isLoading };
}
