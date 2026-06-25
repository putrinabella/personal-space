import { createQueryKeys } from "./queryKeyFactory";

export const queryKeys = {
  polyclinic: createQueryKeys("polyclinic"),
  survey: createQueryKeys("survey"),
  unit: createQueryKeys("unit"),
  submission: createQueryKeys("submission"),
  doctor: createQueryKeys("doctor"),
  ticketing: createQueryKeys("ticketing"),
  user: createQueryKeys("user"),
  display: createQueryKeys("display"),
  queue: createQueryKeys("queue"),
  permission: createQueryKeys("permission"),
  role: createQueryKeys("role"),
  mcuSurvey: createQueryKeys("mcuSurvey"),
  logHistory: createQueryKeys("logHistory"),
  categories: createQueryKeys("categories"),
};
