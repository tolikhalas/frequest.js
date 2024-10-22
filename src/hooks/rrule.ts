import { useState } from "react";
import { RRuleType, UseRuleResponseType, WEEK_DAY } from "../vite-env.d";
import { RRule, Weekday, Frequency } from "rrule";

const initialSchema: RRuleType = {
  freq: null,
  interval: 0,
  byweekday: [],
  count: 0,
};

const useRRule = () => {
  const [schema, setSchema] = useState<RRuleType>(initialSchema);

  const handleResponse = (): UseRuleResponseType => {
    try {
      const rule = new RRule({
        ...schema,
        freq: RRule[schema.freq as keyof typeof RRule] as Frequency,
        byweekday: schema.byweekday.map(
          (day) =>
            RRule[
              WEEK_DAY[day as keyof typeof this] as keyof typeof RRule
            ] as Weekday,
        ),
      });

      return {
        status: "successful" as const,
        value: rule,
      };
    } catch (error) {
      return {
        status: "failed" as const,
        value: error,
      };
    } finally {
      setSchema(initialSchema);
    }
  };

  return { schema, setSchema, handleResponse };
};

export default useRRule;
