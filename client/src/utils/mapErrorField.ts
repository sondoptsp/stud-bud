import { ErrorFieldOutput } from "../generated/graphql";

export const mapErrorField = (
  errors: ErrorFieldOutput[]
): { [key: string]: string } => {
  return errors?.reduce((accumulatedObj, error) => {
    return {
      ...accumulatedObj,
      [error.field]: [error.message],
    };
  }, {});
};
