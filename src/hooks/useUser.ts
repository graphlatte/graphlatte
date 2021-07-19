import { MeDocument } from "@/autogenerated/documents/me";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useQuery } from "urql";

type Options = {
  redirect?: boolean;
  redirectTo?: string;
};

export function useUser(options: Options = {}) {
  const { redirect = true, redirectTo = "/login" } = options;
  const [{ data, fetching, error }] = useQuery({ query: MeDocument });
  const router = useRouter();

  useEffect(() => {
    if (!fetching && (!data?.me || error) && redirect) {
      router.push(redirectTo);
    }
  }, [data?.me, error, fetching, redirect, redirectTo, router]);

  return { isLoading: fetching, hasError: Boolean(error), error, ...data?.me };
}
