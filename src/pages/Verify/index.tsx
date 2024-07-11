import FullCenter from "@/components/FullCenter";
import FullLoading from "@/components/FullLoading";
import { supabase } from "@/lib/supabase";
import { useRequest } from "ahooks";

const Verify = () => {
  const { loading } = useRequest(async () => {
    if (location.hash) {
      await supabase.getInstance().auth.verifyOtp({
        token_hash: location.hash,
        type: "email",
        options: {
          redirectTo: import.meta.env.VITE_SITE_URL,
        },
      });
    }
  });

  if (!location.hash) {
    return <FullCenter>Invalid verification link</FullCenter>;
  }

  if (loading) {
    return <FullLoading></FullLoading>;
  }

  return <></>;
};

export default Verify;
