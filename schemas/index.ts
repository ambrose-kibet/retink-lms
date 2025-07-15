import z from "zod";
export const RegistrationSchema = z
  .object({
    email: z.email({ message: "please provide a valid email" }).toLowerCase(),
    gender: z.enum(["male", "female", "other"], {
      message: "Please select a gender",
    }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    isShowPassword: z.optional(z.boolean()),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.gender === "female", {
    message: "Only female members are allowed",
    path: ["gender"],
  });

export const LoginSchema = z.object({
  email: z.email({ message: "please provide a valid email" }).toLowerCase(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  isShowPassword: z.optional(z.boolean()),
});
