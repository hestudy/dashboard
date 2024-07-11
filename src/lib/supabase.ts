import { Database } from "@/types/database.types";
import { createClient } from "@supabase/supabase-js";

export const supabase = (() => {
  let instance: ReturnType<typeof createClient<Database>> | null = null;

  const init = () => {
    return createClient<Database>(
      import.meta.env.VITE_SUPABASE_URL,
      import.meta.env.VITE_SUPABASE_KEY
    );
  };

  return {
    getInstance: () => {
      if (!instance) {
        instance = init();
      }
      return instance;
    },
  };
})();
