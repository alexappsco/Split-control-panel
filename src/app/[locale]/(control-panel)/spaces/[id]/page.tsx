import { endpoints } from "src/utils/endpoints";
import { getData } from "src/utils/crud-fetch-api";
import SpacesView from "src/sections/spaces/view";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function SpaceDetailsPage({ params }: PageProps) {
  const { id } = await params;

  const response = await getData(endpoints.spaces.single(id));

  console.log("===== Space Details =====");
  console.log(JSON.stringify(response, null, 2));

  if (!response.success) {
    return <div>Failed to load space details.</div>;
  }

  return <SpacesView data={response.data} />;
}