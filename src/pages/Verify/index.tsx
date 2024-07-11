import FullCenter from "@/components/FullCenter";
import FullLoading from "@/components/FullLoading";
import { useUser } from "@/hooks/useUser";
import { supabase } from "@/lib/supabase";
import { useRequest } from "ahooks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Verify = () => {
  const navigate = useNavigate();
  const { user, runAsync } = useUser();

  const { loading } = useRequest(async () => {
    if (location.hash) {
      await supabase.getInstance().auth.verifyOtp({
        token_hash: location.hash,
        type: "email",
      });
      await runAsync(true);
    }
  });

  useEffect(() => {
    if (user?.id) {
      navigate("/", {
        replace: true,
      });
    }
  }, [user]);

  if (!location.hash) {
    return <FullCenter>Invalid verification link</FullCenter>;
  }

  if (loading) {
    return <FullLoading></FullLoading>;
  }

  return <></>;
};

export default Verify;
