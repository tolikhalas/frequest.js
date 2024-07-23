import { useState } from "react";
import { RRuleType, WEEK_DAY } from "../vite-env.d";
import { RRule, Weekday, Frequency } from "rrule";

const useRRule = (output?: (ruleMessage: string) => void) => {
  const [schema, setSchema] = useState<RRuleType>({
    freq: null,
    interval: 0,
    byweekday: [],
    count: 0,
  });

  const handleResponse = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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

    console.log(rule.toText());
    if (output) {
      output(rule.toText());
    }
  };

  return { schema, setSchema, handleResponse };
};

export default useRRule;
