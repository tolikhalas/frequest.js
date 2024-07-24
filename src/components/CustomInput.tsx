import React from "react";
import { RRule } from "rrule";
import { WEEK_DAY } from "../vite-env.d";
import useRRule from "@/hooks/rrule";
import useStore from "@/store/index";
import useDispay from "@/hooks/display-status";
import { validateForm } from "@/rules";

const CustomInput: React.FC = () => {
  const { setFrequency } = useStore();
  const { schema, setSchema, handleResponse } = useRRule();
  const { displayStatus } = useDispay();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { status, value } = handleResponse();

    const validatedResult = validateForm(schema);

    if (!validatedResult.success) {
      displayStatus({
        status: "failed",
        value: validatedResult.errors
      });
      return;
    }

    displayStatus({ status, value });

    if (status === "successful") {
      const rule = value as RRule;
      const frequncy = rule.toText();
      setFrequency(frequncy);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-gray-700 p-4">
      <form
        className="flex grid-cols-2 flex-col gap-4 md:grid"
        onSubmit={handleSubmit}
      >
        <section className="flex flex-col gap-y-2">
          <h3>How Frequent</h3>
          <div className="grid grid-cols-2 items-start gap-2">
            {RRule.FREQUENCIES.map((freq, index) => (
              <span
                className="flex justify-start gap-x-2 rounded-lg bg-gray-800 p-2"
                key={index}
              >
                <input
                  type="radio"
                  name="frequency"
                  value={freq}
                  onChange={() => setSchema({ ...schema, freq })}
                  id={`${freq.toLocaleLowerCase()}-frequency`}
                />
                <label id={`${freq.toLowerCase()}-frequency`}>
                  {freq.toLowerCase()}
                </label>
              </span>
            ))}
          </div>
          <label
            htmlFor="Inteval"
            className="ms-2 text-left text-xs font-semibold text-gray-400"
          >
            Set interval
          </label>
          <input
            type="number"
            name="interval"
            id="interval"
            className="rounded-lg px-4 py-2"
            placeholder="Set interval"
            value={schema.interval}
            onChange={(e) =>
              setSchema({
                ...schema,
                interval: Math.max(0, parseInt(e.target.value) || 0),
              })
            }
          />
        </section>
        <section className="flex flex-col gap-y-2">
          <h3>
            Select days <span className="text-gray-400">(optional)</span>
          </h3>
          <div className="grid grid-cols-2 items-start gap-2">
            {Object.keys(WEEK_DAY).map((day, index) => (
              <span
                className="flex h-auto w-auto justify-start gap-x-2 rounded-lg bg-gray-800 p-2"
                key={index}
              >
                <input
                  type="checkbox"
                  name="days"
                  value={day}
                  id={`${day.toString().toLocaleLowerCase()}-day`}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const isChecked = e.target.checked;
                    const dayValue = WEEK_DAY[day as keyof typeof WEEK_DAY];

                    setSchema({
                      ...schema,
                      byweekday: isChecked
                        ? Array.from(new Set([...schema.byweekday, dayValue]))
                        : schema.byweekday.filter((day) => day !== dayValue),
                    });
                  }}
                />
                <label id={`${day.toString().toLowerCase()}-day`}>{day}</label>
              </span>
            ))}
          </div>
        </section>
        <section className="grid gap-2">
          <div className="grid gap-y-2">
            <label htmlFor="start-date">Start Date</label>
            <input
              type="date"
              name="start-date"
              id="start-date"
              className="rounded-lg px-4 py-2"
              value={
                schema?.dtstart
                  ? schema.dtstart.toISOString().split("T")[0]
                  : ""
              }
              onChange={(e) =>
                setSchema({
                  ...schema,
                  dtstart: new Date(e.target.value),
                })
              }
            />
          </div>
          <div className="grid gap-y-2">
            <label htmlFor="end-date">Until</label>
            <input
              type="date"
              name="end-date"
              id="end-date"
              className="rounded-lg px-4 py-2"
              value={
                schema.until ? schema.until.toISOString().split("T")[0] : ""
              }
              onChange={(e) =>
                setSchema({
                  ...schema,
                  until: new Date(e.target.value),
                })
              }
            />
          </div>
        </section>
        <section className="grid items-start">
          <div className="grid gap-y-2">
            <label htmlFor="count">Set Count</label>
            <input
              type="number"
              name="count"
              id="count"
              className="rounded-lg px-4 py-2"
              placeholder="Set count"
              value={schema.count}
              onChange={(e) =>
                setSchema({ ...schema, count: parseInt(e.target.value) })
              }
            />
          </div>
        </section>
        <section className="col-span-2">
          <input
            type="submit"
            name="submit"
            id="submit"
            value="Submit"
            className="cursor-pointer rounded-full bg-blue-600 px-10 py-2 transition hover:bg-blue-800"
          />
        </section>
      </form>
    </div>
  );
};

export default CustomInput;
