export type IFunctionReturnType = Promise<{
  status: boolean;
  status_code: number;
  message: string;
  data?: any;
}>;
