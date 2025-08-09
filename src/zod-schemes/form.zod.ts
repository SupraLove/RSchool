import { z } from "zod";

export const formSchema = z.object({
  username: z.string().min(2, "Введите имя").max(50),
  contactMethod: z.enum(["call", "telegram"]),
  phone: z.string().min(10, "Введите значение"),
  agree: z.literal(true, {
    message: "Вы должны согласиться с политикой",
  }),
});
