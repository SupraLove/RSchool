import { z } from "zod";

export const formSchema = z
  .object({
    username: z.string().min(2, "Введите имя").max(50),
    contactMethod: z.enum(["phone", "telegram"]),
    phone: z.string().optional(),
    telegram: z.string().optional(),
    agree: z.boolean().refine((val) => val === true, {
      message: "Надо заполнить форму",
    }),
  })
  .superRefine((data, ctx) => {
    if (data.contactMethod === "phone") {
      const digits = data.phone?.replace(/\D/g, "");
      if (!digits || digits.length !== 11 || !digits.startsWith("7")) {
        ctx.addIssue({
          path: ["phone"],
          code: "custom",
          message: "Введите корректный номер телефона",
        });
      }
    } else if (data.contactMethod === "telegram") {
      if (
        !data.telegram ||
        !data.telegram.startsWith("@") ||
        data.telegram.length < 2
      ) {
        ctx.addIssue({
          path: ["telegram"],
          code: "custom",
          message: "Введите корректный никнейм Telegram",
        });
      }
    }
  });
