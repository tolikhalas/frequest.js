/// <reference types="vite/client" />

import { RRule } from "rrule";

export type RRuleType = {
  freq: RRule.Frequency;
  interval: number;
  byweekday: WEEK_DAY[];
  dtstart?: Date;
  until?: Date;
  count: number;
};

export enum WEEK_DAY {
  MO = RRule.MO,
  TU = RRule.TU,
  WE = RRule.WE,
  TH = RRule.TH,
  FR = RRule.FR,
  SA = RRule.SA,
  SU = RRule.SU,
}

export type UseRuleResponseType = {
  status: "successful" | "failed";
  value: RRule | unknown;
};
