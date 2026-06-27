import Privacy from "src/sections/privacy/view";
import { endpoints } from "src/utils/endpoints";
import { getData } from "src/utils/crud-fetch-api";
import { EMPTY_PRIVACY_POLICY, normalizePrivacyPolicy } from "src/sections/privacy/types";


export default async function PrivacyPage() {
  const response = await getData<unknown>(endpoints.privacy.get);

  const initialData = response.success
    ? normalizePrivacyPolicy(response.data)
    : EMPTY_PRIVACY_POLICY;

  return <Privacy initialData={initialData} />;
}
