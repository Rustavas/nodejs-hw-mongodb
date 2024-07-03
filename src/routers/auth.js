import { Router } from "express";
import { ctrlWrapper } from "../middlewares/ctrlWrapper.js";
import { loginUserController, logoutController, refreshTokenController, registerUserController, sendResetEmailController, sendResetPwdController } from "../controllers/auth.js";
import { validateBody } from "../middlewares/validateBody.js";
import { registerUserSchema } from "../validation/registerUserSchema.js";
import { loginUserSchema } from "../validation/loginUserSchema.js";
import { resetEmailSchema } from "../validation/sendResetEmailSchema.js";
import { resetPwdSchema } from "../validation/resetPwdSchema.js";

const authRouter = Router();
authRouter.post('/register', validateBody(registerUserSchema), ctrlWrapper(registerUserController));
authRouter.post('/login', validateBody(loginUserSchema), ctrlWrapper(loginUserController));
authRouter.post('/refresh', ctrlWrapper(refreshTokenController));
authRouter.post('/logout', ctrlWrapper(logoutController));

authRouter.post('/send-reset-email', validateBody(resetEmailSchema), ctrlWrapper(sendResetEmailController));
authRouter.post('/reset-pwd', validateBody(resetPwdSchema), ctrlWrapper(sendResetPwdController));


export default authRouter;