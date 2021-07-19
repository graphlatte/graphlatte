import { seo } from "@/config/seo";
import Head from "next/head";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  title?: string;
  description?: string;
}>;

export function Page({ title = "Welcome", children, ...rest }: Props) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>
          {title} – {seo.siteName}
        </title>
      </Head>
      <div className="flex flex-col w-full h-full" {...rest}>
        {children}
      </div>
    </>
  );
}
