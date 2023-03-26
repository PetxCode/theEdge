import { Request, Response } from "express";
import { AdminEntity } from "../model/AdminEntity/AdminEntity";
import { HTTP } from "../utils/constants/HTTP";
import { mainAppErrorHandler } from "../utils/error/errorDefiner";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { mainRoles } from "../utils/constants/roles";
import crypto from "crypto";
import { resetUserPassword, verifiedUserMail } from "../utils/email";

export const getAdmins = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const schools = await AdminEntity.find();
    return res.status(HTTP.OK).json({
      message: "Viewing all schools",
      data: schools,
    });
  } catch (err: any) {
    new mainAppErrorHandler({
      message: `Unable to view schools for Admin`,
      status: HTTP.BAD_REQUEST,
      name: "School creation Error",
      isSuccess: false,
    });

    return res.status(HTTP.OK).json({
      message: "Error Found",
      data: err,
    });
  }
};

export const getOneAdmins = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { id } = req.params;

    const school = await AdminEntity.findOne({
      where: {
        id,
      },
    });
    return res.status(HTTP.OK).json({
      message: "Viewing school detail",
      data: school,
    });
  } catch (err) {
    new mainAppErrorHandler({
      message: `Unable to create school for Admin`,
      status: HTTP.BAD_REQUEST,
      name: "School creation Error",
      isSuccess: false,
    });

    return res.status(HTTP.BAD_REQUEST).json({
      message: "Error Found",
      data: err,
    });
  }
};

export const deleteAdmins = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { id } = req.params;

    const removedSchool = await AdminEntity.delete({ id });

    return res.status(HTTP.OK).json({
      message: "school has been delete",
      data: removedSchool,
    });
  } catch (err) {
    new mainAppErrorHandler({
      message: `Unable to create school for Admin`,
      status: HTTP.BAD_REQUEST,
      name: "School creation Error",
      isSuccess: false,
    });

    return res.status(HTTP.BAD_REQUEST).json({
      message: "Error Found",
      data: err,
    });
  }
};

export const updateAdmins = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { id } = req.params;
    const { userName } = req.body;

    const school = await AdminEntity.findOne({
      where: {
        id,
      },
    });

    const updateSchoolInfo = await AdminEntity.merge(school, { userName });

    return res.status(HTTP.OK).json({
      message: "Updating school's info",
      data: updateSchoolInfo,
    });
  } catch (err) {
    new mainAppErrorHandler({
      message: `Unable to create school for Admin`,
      status: HTTP.BAD_REQUEST,
      name: "School creation Error",
      isSuccess: false,
    });

    return res.status(HTTP.BAD_REQUEST).json({
      message: "Error Found",
      data: err,
    });
  }
};

export const createAdmins = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { schoolName, userName, email, password } = req.body;
    const tokenData = crypto.randomBytes(16).toString("hex");
    console.log(tokenData);
    const checkIfExist = await AdminEntity.findOne({
      where: { email },
    });

    if (checkIfExist) {
      return res.status(HTTP.FORBIDDEN).json({
        message: "This user does exist",
      });
    } else {
      if (!password) {
        new mainAppErrorHandler({
          message: `Please put in a password`,
          status: HTTP.BAD_REQUEST,
          name: "No password Error",
          isSuccess: false,
        });

        return res.status(HTTP.BAD_REQUEST).json({
          message: "PLease enter your choice password",
          
        });
      } else {
        const slt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, slt);

        const admin = await AdminEntity.create({
          userName,
          schoolName,
          email,
          password: hash,
          role: mainRoles.roles.admin,
          token: tokenData,
          verified: false,
        }).save();

        verifiedUserMail(admin)
          .then((result) => {
            console.log("message been sent to you: ");
          })
          .catch((error) => console.log(error));

        return res.status(HTTP.CREATED).json({
          message: "Please check your mail to verify your account",
          data: admin,
        });
      }
    }
  } catch (err) {
    new mainAppErrorHandler({
      message: `Unable to create school for Admin`,
      status: HTTP.BAD_REQUEST,
      name: "School creation Error",
      isSuccess: false,
    });

    return res.status(HTTP.BAD_REQUEST).json({
      message: "Error Found",
      data: err,
    });
  }
};

export const verifyAdmins = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { id, token } = req.params;

    const findAdmin = await AdminEntity.findOne({
      where: { id },
    });

    if (!findAdmin) {
      return res.status(HTTP.FORBIDDEN).json({
        message: "This user does not exist",
      });
    } else {
      if (findAdmin.token !== "" && findAdmin.token === token) {
        const admin = await AdminEntity.merge(findAdmin, {
          token: "",
          verified: true,
        }).save();

        return res.status(HTTP.OK).json({
          message: "Your account has been verified, you can nnow sign in...!",
          data: admin,
        });
      }
    }
  } catch (err) {
    new mainAppErrorHandler({
      message: `Unable to create school for Admin`,
      status: HTTP.BAD_REQUEST,
      name: "School creation Error",
      isSuccess: false,
    });

    return res.status(HTTP.BAD_REQUEST).json({
      message: "Error Found",
      data: err,
    });
  }
};

export const resetMail = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { id, token } = req.params;
    const { email } = req.body;

    const findAdmin = await AdminEntity.findOne({
      where: { email },
    });

    if (!findAdmin) {
      return res.status(HTTP.FORBIDDEN).json({
        message: "This user does not exist",
      });
    } else {
      if (findAdmin.token === "" && findAdmin.verified === true) {
        const newToken = crypto.randomBytes(32).toString("hex");
        const admin = await AdminEntity.merge(findAdmin, {
          token: newToken,
        }).save();

        resetUserPassword(admin)
          .then((result) => {
            console.log("message been sent to you: ");
          })
          .catch((error) => console.log(error));

        return res.status(HTTP.OK).json({
          message: "Please check your email to continue",
          data: admin,
        });
      }
    }
  } catch (err) {
    new mainAppErrorHandler({
      message: `Unable to create school for Admin`,
      status: HTTP.BAD_REQUEST,
      name: "School creation Error",
      isSuccess: false,
    });

    return res.status(HTTP.BAD_REQUEST).json({
      message: "Error Found",
      data: err,
    });
  }
};

export const changePassword = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { id, token } = req.params;
    const { password } = req.body;

    const findAdmin = await AdminEntity.findOne({
      where: { id },
    });

    if (!findAdmin) {
      return res.status(HTTP.FORBIDDEN).json({
        message: "This user does not exist",
      });
    } else {
      if (findAdmin.token !== "" && findAdmin.token === token) {
        const slt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, slt);

        const admin = await AdminEntity.merge(findAdmin, {
          password: hashed,
          token: "",
        }).save();

        return res.status(HTTP.OK).json({
          message: "Your password has been changed, you can now sign in",
          data: admin,
        });
      }
    }
  } catch (err) {
    new mainAppErrorHandler({
      message: `Unable to create school for Admin`,
      status: HTTP.BAD_REQUEST,
      name: "School creation Error",
      isSuccess: false,
    });

    return res.status(HTTP.BAD_REQUEST).json({
      message: "Error Found",
      data: err,
    });
  }
};

export const signin = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { email, password } = req.body;

    const findAdmin = await AdminEntity.findOne({
      where: { email },
    });

    if (!findAdmin) {
      return res.status(HTTP.FORBIDDEN).json({
        message: "This user does not exist",
      });
    } else {
      if (findAdmin.token === "" && findAdmin.verified === true) {
        console.log("check for Password");

        const decryptPassword = await bcrypt.compare(
          password,
          findAdmin.password,
        );

        if (decryptPassword) {
          const encrypt = jwt.sign(
            {
              id: findAdmin.id,
              email: findAdmin.email,
              role: findAdmin.role,
              schoolName: findAdmin.schoolName,
              userName: findAdmin.userName,
            },
            process.env.SIG_SECRET,
            { expiresIn: process.env.SIG_EXPIRES },
          );

          return res.status(HTTP.OK).json({
            message: `Welcome back ${findAdmin.userName}`,
            data: { findAdmin, encrypt },
          });
        } else {
          return res.status(HTTP.FORBIDDEN).json({
            message: "Your password isn't correct",
          });
        }
      } else {
        return res.status(HTTP.FORBIDDEN).json({
          message: "This Account hasn't been Verified",
        });
      }
    }
  } catch (err) {
    new mainAppErrorHandler({
      message: `Unable to create school for Admin`,
      status: HTTP.BAD_REQUEST,
      name: "School creation Error",
      isSuccess: false,
    });

    return res.status(HTTP.BAD_REQUEST).json({
      message: "Error Found",
      data: err,
    });
  }
};

// export const getAdmins = async (req: Request, res: Response): Promise<Response> => {
//     try {

//     } catch (err) {
//         new mainAppErrorHandler({
//           message: `Unable to create school for Admin`,
//           status: HTTP.BAD_REQUEST,
//           name: "School creation Error",
//           isSuccess: false,
//         });

//   return res.status(HTTP.BAD_REQUEST).json({
//     message: "Error Found",
//     data: err,
//   });
//     }
// }
