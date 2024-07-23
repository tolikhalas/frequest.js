import { RRule } from "rrule";
import useToast from "./toast";
import { UseRuleResponseType } from "@/vite-env";

const useDispay = () => {
  const { successful, error } = useToast();

  const displayStatus = (info: UseRuleResponseType) => {
    if (info.status === "successful") {
      const rule = info.value as RRule;
      successful("✅ Succefully setup frequency", rule.toText());
    } else {
      error("❌ Something went wrong", info.value);
    }
  };

  return { displayStatus };
};

export default useDispay;
