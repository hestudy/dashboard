import { userAtom } from "@/atoms/userAtom";
import { supabase } from "@/lib/supabase";
import { useRequest } from "ahooks";
import { useAtom } from "jotai";

export const useUser = () => {
  const [user, setUser] = useAtom(userAtom);

  const userRes = useRequest(async () => {
    if (user) {
      return user;
    }
    const res = await supabase.getInstance().auth.getUser();
    if (res.data.user) {
      setUser(res.data.user);
      return res.data.user;
    }
  });

  return {
    ...userRes,
    user,
  };
};
