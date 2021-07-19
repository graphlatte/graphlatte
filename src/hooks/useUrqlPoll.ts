import { useEffect } from "react";
import { OperationContext } from "urql";

export function useUrqlPoll(
  isFetching: boolean,
  executeQuery: (opts?: Partial<OperationContext> | undefined) => void,
  interval: number | null
) {
  useEffect(() => {
    if (!isFetching && interval) {
      const id = setTimeout(
        () => executeQuery({ requestPolicy: "network-only" }),
        interval
      );
      return () => {
        clearTimeout(id);
      };
    }
  }, [executeQuery, interval, isFetching]);
}
