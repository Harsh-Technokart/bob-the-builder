import { ITypeName } from "../interface";
import { subtype } from "../models";

const createSubtype = async (body_props: {
  type_name: ITypeName;
  subtype_name: string;
}) => {
  try {
    await subtype.create(body_props);
    return await Promise.resolve({
      status: true,
      status_code: 201,
      message: `Subtype ${body_props.subtype_name} for ${body_props.type_name} created successfully`,
    });
  } catch (error) {
    return await Promise.reject(error);
  }
};

export { createSubtype };
