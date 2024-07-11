import FullCenter from "@/components/FullCenter";
import FullLoading from "@/components/FullLoading";
import { supabase } from "@/lib/supabase";
import { useRequest } from "ahooks";
import { useNavigate } from "react-router-dom";

const Verify = () => {
  const navigate = useNavigate();

  const { loading } = useRequest(async () => {
    if (location.hash) {
      const res = await supabase.getInstance().auth.verifyOtp({
        token_hash: location.hash,
        type: "email",
      });
      if (!res.error) {
        navigate("/", {
          replace: true,
        });
      }
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
