import { Response } from "express";
import { Request } from "express-validator/src/base";
import { RoleEntity } from "../model/AdminEntity/RoleEntity";
import { UserEntity } from "../model/AdminEntity/UserEntity";
import { HTTP } from "../utils/constants/HTTP";
import { mainRoles } from "../utils/constants/roles";
import { mainAppErrorHandler } from "../utils/error/errorDefiner";
import {
  iRole,
  iRoleData,
  iUser,
  iUserData,
} from "../utils/interfaces/userInterface";

export const createRoles = async (req: Request, res: Response) => {
  try {
    const role: Array<string> = [];

    const { title, mainRole } = req.body;
    let { adminID, userID } = req.params;

    role.push(mainRole);

    const user: any = UserEntity.findOne({ where: { id: userID } });
    const adminUser: any = UserEntity.findOne({ where: { id: adminID } });
    if (adminUser.isAdmin) {
      const roleData: any = await RoleEntity.create({
        user: user,
        title,
      });
      roleData.role = role;

      res.status(HTTP.OK).json({
        message: "Role has been assigned",
        data: roleData,
      });
    } else {
      return res.status(HTTP.BAD_REQUEST).json({
        message: "You can create This",
      });
    }
  } catch (error) {
    new mainAppErrorHandler({
      message: `Unable to create role for this User`,
      status: HTTP.BAD_REQUEST,
      name: "Role creation Error",
      isSuccess: false,
    });

    return res.status(HTTP.BAD_REQUEST).json({
      message: "Role creation Error Found",
      data: error.message,
    });
  }
};

export const updateUserRoles = async (req: Request, res: Response) => {
  try {
    const role: Array<string> = [];

    const { title, mainRole } = req.body;
    let { adminID, userID } = req.params;

    role.push(mainRole);

    const user: any = UserEntity.findOne({ where: { id: userID } });
    const adminUser: any = UserEntity.findOne({ where: { id: adminID } });

    if (adminUser.role === "ADMIN") {
      UserEntity.merge(user, { role });

      res.status(HTTP.OK).json({
        message: "Getting User",
        data: user,
      });
    } else {
      return res.status(HTTP.BAD_REQUEST).json({
        message: "You can create This",
      });
    }
  } catch (error) {
    new mainAppErrorHandler({
      message: `Unable to get User role for this User`,
      status: HTTP.BAD_REQUEST,
      name: "Get Role Error",
      isSuccess: false,
    });

    return res.status(HTTP.BAD_REQUEST).json({
      message: "Get Role Error Found",
      data: error.message,
    });
  }
};

export const updateUserRolesTitle = async (req: Request, res: Response) => {
  try {
    const role: Array<string> = [];

    const { title, mainRole } = req.body;
    let { adminID, userID } = req.params;

    role.push(mainRole);

    const user: any = UserEntity.findOne({ where: { id: userID } });
    const adminUser: any = UserEntity.findOne({ where: { id: adminID } });

    if (adminUser.role === "Admin") {
      UserEntity.merge(user, { title });

      res.status(HTTP.OK).json({
        message: "Getting User",
        data: user,
      });
    } else {
      return res.status(HTTP.BAD_REQUEST).json({
        message: "You can create This",
      });
    }
  } catch (error) {
    new mainAppErrorHandler({
      message: `Unable to get User role for this User`,
      status: HTTP.BAD_REQUEST,
      name: "Get Role Error",
      isSuccess: false,
    });

    return res.status(HTTP.BAD_REQUEST).json({
      message: "Get Role Error Found",
      data: error.message,
    });
  }
};

export const removeUserRoles = async (req: Request, res: Response) => {
  try {
    const role: Array<string> = [];

    const { title, mainRole } = req.body;
    let { adminID, userID } = req.params;

    const user: any = UserEntity.findOne({ where: { id: userID } });
    const adminUser: any = UserEntity.findOne({ where: { id: adminID } });

    if (adminUser.role === "ADMIN") {
      let remove = user.role.filter((el: string) => {
        el !== mainRole;
      });

      UserEntity.merge(user, { remove });

      res.status(HTTP.OK).json({
        message: "Getting User",
        data: remove,
      });
    } else {
      return res.status(HTTP.BAD_REQUEST).json({
        message: "You can create This",
      });
    }
  } catch (error) {
    new mainAppErrorHandler({
      message: `Unable to get User role for this User`,
      status: HTTP.BAD_REQUEST,
      name: "Get Role Error",
      isSuccess: false,
    });

    return res.status(HTTP.BAD_REQUEST).json({
      message: "Get Role Error Found",
      data: error.message,
    });
  }
};

export const getUserRoles = async (req: Request, res: Response) => {
  const role: Array<string> = [];

  const { title, mainRole } = req.body;
  const { id } = req.params;
  role.push(mainRole);

  const user: iUserData<any> = UserEntity.findOne({ where: { id } });

  res.status(HTTP.OK).json({
    message: "Getting User",
    data: user,
  });
  try {
  } catch (error) {
    new mainAppErrorHandler({
      message: `Unable to get User role for this User`,
      status: HTTP.BAD_REQUEST,
      name: "Get Role Error",
      isSuccess: false,
    });

    return res.status(HTTP.BAD_REQUEST).json({
      message: "Get Role Error Found",
      data: error.message,
    });
  }
};
