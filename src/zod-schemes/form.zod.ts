import { z } from "zod";

export const formSchema = z.object({
  username: z.string().min(2, "Введите имя").max(50),
  contactMethod: z.enum(["call", "telegram"]),
  phone: z.string().min(1, "Введите значение"),
  agree: z.literal(true, {
    message: "Заполните форму",
  }),
});
