import { useQuery } from "@tanstack/react-query";
export function useFetchQuery(func, key) {
    const { data, isLoading } = useQuery({
        queryFn: func,
        queryKey: [key],
    });
    return { data, isLoading };
}
