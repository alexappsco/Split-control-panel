import { endpoints } from "src/utils/endpoints";
import { getData } from "src/utils/crud-fetch-api";
import ContactUsSettings from "src/sections/contact-us/view";
import { EMPTY_CONTACT_US, normalizeContactUs } from "src/sections/contact-us/types";

export default async function ContactUsPage() {
  const response = await getData<unknown>(endpoints.contact.list);

  const initialData = response.success
    ? normalizeContactUs(response.data)
    : EMPTY_CONTACT_US;

  return <ContactUsSettings initialData={initialData} />;
}
