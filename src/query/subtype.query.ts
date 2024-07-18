import { ITypeName } from "../interface";
import { subtype } from "../models";

const createSubtype = async (body_props: {
  type_name: ITypeName;
  subtype_name: string;
}) => {
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

const getAllSubtypes = async (body_props: { type_name: ITypeName }) => {
  try {
    console.log("typename in query: ", body_props.type_name);
    console.log(
      "query hit: \n",
      `subtype.find({
      type_name: ${body_props.type_name},
    })`
    );
    const details = await subtype.find({
      type_name: body_props.type_name,
    });
    return {
      status: true,
      status_code: 200,
      message: `Subtypes for ${body_props.type_name} listed below`,
      data: details,
    };
  } catch (error) {
    console.log("error param in catch block: ", error);
    throw error;
  }
};

export { createSubtype, getAllSubtypes };
