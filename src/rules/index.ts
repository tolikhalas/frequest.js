import { z } from "zod";

// Helper function to get today's date at midnight
const getTodayAtMidnight = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

// Create an enum-like object
const FrequencyEnum = {
  YEARLY: "YEARLY",
  MONTHLY: "MONTHLY",
  WEEKLY: "WEEKLY",
  DAILY: "DAILY",
  HOURLY: "HOURLY",
  MINUTELY: "MINUTELY",
  SECONDLY: "SECONDLY",
} as const;

// Create a type from the enum-like object
type Frequency = (typeof FrequencyEnum)[keyof typeof FrequencyEnum];

// Zod schema for the form inputs
export const formRules = z
  .object({
    freq: z
      .enum(Object.values(FrequencyEnum) as [Frequency, ...Frequency[]])
      .refine((value) => value !== undefined, {
        message: '"How frequent" must be selected',
      }),
    interval: z.number().int().positive("Set interval must be greater than 0"),
    byweekday: z.array(z.number()).optional(),
    dtstart: z
      .date()
      .min(getTodayAtMidnight(), "Start Date can't be in the past")
      .optional(),
    until: z
      .date()
      .min(getTodayAtMidnight(), "Until date can't be in the past")
      .optional(),
    count: z.number().int().positive("Set count must be greater than 0"),
  })
  .refine(
    (data) => (data.dtstart && data.until ? data.until > data.dtstart : true),
    {
      message: "Until must be ahead of time than Start Date",
      path: ["until"],
    },
  );

// Type inference
export type FormSchema = z.infer<typeof formRules>;

// Validation function
export const validateForm = (data: FormSchema) => {
  try {
    formRules.parse(data);
    return { success: true, errors: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.flatten().fieldErrors };
    }
    return {
      success: false,
      errors: { _errors: ["An unexpected error occurred"] },
    };
  }
};
