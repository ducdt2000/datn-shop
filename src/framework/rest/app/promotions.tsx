import PromotionSlider from '@components/promotions/promotion-slider';
import ErrorMessage from '@components/ui/error-message';
// import { useGroupQuery } from '@framework/groups/groups.query';
import useHomepage from '@framework/utils/use-homepage';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

const PromotionSliders: React.FC = () => {
  const router = useRouter();
  const { homePage } = useHomepage();

  const group = useMemo(
    () => router.query.pages?.[0] ?? homePage?.slug,
    [router.query.pages, homePage]
  );
  // const { data, error } = useGroupQuery(group?.toString()!);

  const data = {
    type: {
      promotional_sliders: [
        {
          id: 902,
          original:
            'https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/902/offer-5.png',
          thumbnail:
            'https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/902/conversions/offer-5-thumbnail.jpg',
        },
      ],
    },
  };

  // if (error) return <ErrorMessage message={error.message} />;
  if (!data?.type?.promotional_sliders) return null;
  return <PromotionSlider sliders={data?.type?.promotional_sliders} />;
};

export default PromotionSliders;
