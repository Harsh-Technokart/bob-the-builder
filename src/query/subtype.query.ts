import { ISubtypeModel, type IFunctionReturnType } from "../interface";
import { ITypeName } from "../interface";
import { subtype } from "../models";

const createSubtype = async (body_props: {
  type_name: ITypeName;
  subtype_name: string;
}): IFunctionReturnType => {
  try {
    await subtype.create(body_props);
    return {
      status: true,
      status_code: 201,
      message: `Subtype ${body_props.subtype_name} for ${body_props.type_name} created successfully`,
    };
  } catch (error) {
    throw error;
  }
};

const getAllSubtypes = async (body_props: {
  type_name: ITypeName;
}): IFunctionReturnType => {
  try {
    const details: ISubtypeModel[] = await subtype.find({
      type_name: body_props.type_name,
    });
    return {
      status: true,
      status_code: 200,
      message: `Subtypes for ${body_props.type_name} listed below`,
      data: details,
    };
  } catch (error) {
    throw error;
  }
};

export { createSubtype, getAllSubtypes };
