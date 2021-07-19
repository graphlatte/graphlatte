import { Page } from "@/components/Page";
import { ProseContainer } from "@/components/ProseContainer";

export default function NotFound() {
  return (
    <Page title="Page not found">
      <ProseContainer>
        <h1>Error 404</h1>
        <p>Page not found!</p>
      </ProseContainer>
    </Page>
  );
}
