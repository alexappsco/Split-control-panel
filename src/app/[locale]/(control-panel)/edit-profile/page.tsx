import { Profile } from 'src/types/prof';
import { endpoints } from 'src/utils/endpoints';
import { getTranslations } from 'next-intl/server';
import { getData } from 'src/utils/crud-fetch-api';
import { NoPermissionView } from 'src/sections/error';
import { FetchTags } from 'src/actions/config-actions';
import EditViewProfile from 'src/sections/edit-profile/edit-view-profile';



export default async function Page(){
    
      const profileData = await getData<Profile>(
        endpoints.auth.viewProf ,
        { tags: 
          [FetchTags.UpdateProfile,FetchTags.viewProfile]
        },
     );
    
      if ('error' in profileData) {
        if (profileData.status === 403) {
          return <NoPermissionView />;
        }
        throw new Error(profileData.error);
      }

  return <EditViewProfile profile={profileData?.data} />;
}
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata.PrivacyPolicy' });

  return {
    title: t('title'),
  };
}
