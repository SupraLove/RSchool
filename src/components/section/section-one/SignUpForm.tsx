"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { IMaskInput } from "react-imask";
import { formSchema } from "@/zod-schemes/form.zod";
import { toast } from "sonner";
type FormData = z.infer<typeof formSchema>;

const contactMethods = [
  { id: "phone", label: "Телефон" },
  { id: "telegram", label: "Телеграм" },
];

export default function SignUpForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      contactMethod: "phone",
      phone: "",
      telegram: "",
      agree: false,
    },
  });

  const method = form.watch("contactMethod");

  async function onSubmit(values: FormData) {
    try {
      const endpoint = "/api/send-telegram";

      const contact = method === "phone" ? values.phone : values.telegram;

      const payload = {
        username: values.username,
        contactMethod: values.contactMethod,
        contact,
        agree: values.agree,
      };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success("Заявка отправлена!");
        form.reset({
          username: "",
          contactMethod: "phone",
          phone: "",
          telegram: "@",
          agree: false,
        });
      } else {
        const errorData = await res.json();
        toast.error("Ошибка при отправке: " + errorData.error);
      }
    } catch (error) {
      toast.error(`Ошибка сети: ${error}`);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 relative z-10"
      >
        <div>
          <h2 className="text-2xl lg:text-lg font-semibold text-center">
            Записаться{" "}
            <span className="text-primary-foreground">
              на бесплатное занятие
            </span>
          </h2>
          <p className="text-md text-muted-foreground mt-1 text-center">
            Оставьте заявку, мы свяжемся с вами и проконсультируем
          </p>
        </div>

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Введите ваше имя" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col space-y-2">
          <FormField
            control={form.control}
            name="contactMethod"
            render={({ field }) => (
              <div className="flex flex-col">
                <div className="flex gap-2">
                  {contactMethods.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => field.onChange(m.id)}
                      className={`px-3 py-1 rounded-full border text-sm ${
                        field.value === m.id
                          ? "bg-black text-white"
                          : "bg-white text-black border-gray-300"
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>

                {field.value === "telegram" && (
                  <span className="mt-1 text-xs text-gray-500 px-0.5">
                    Убедитесь, что в Telegram в разделе Настройки →
                    Конфиденциальность → Сообщения стоит разрешение могут
                    отправлять «Все».
                  </span>
                )}
              </div>
            )}
          />

          {method === "phone" && (
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <IMaskInput
                      mask="+7 (000) 000-00-00"
                      value={field.value}
                      onAccept={(val) => field.onChange(val)}
                      unmask={false}
                      className="h-12 w-full border rounded px-2"
                      placeholder="+7 (999) 999-99-99"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {method === "telegram" && (
            <FormField
              control={form.control}
              name="telegram"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value}
                      onChange={(e) => {
                        let val = e.target.value;
                        if (val === "") {
                          field.onChange("");
                          return;
                        }
                        if (!val.startsWith("@")) val = "@" + val;
                        field.onChange(val);
                      }}
                      type="text"
                      className="h-12"
                      placeholder="@rschool"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        <Button
          type="submit"
          className={cn(
            "w-full ",
            !form.watch("agree") && "opacity-50 cursor-not-allowed"
          )}
          variant="default"
          disabled={!form.watch("agree")}
        >
          Отправить
        </Button>

        <FormField
          control={form.control}
          name="agree"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2 h-full">
              <div className="flex justify-center items-center gap-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    id="agree"
                  />
                </FormControl>
                <Label
                  htmlFor="agree"
                  className="block flex-1 w-full text-sm xs:text-xs leading-snug whitespace-normal break-words text-black/70"
                >
                  Соглашаюсь с{" "}
                  <Link
                    href="https://drive.google.com/file/d/1eOwPzaoAxDmyPD_htTBI4ujKECeirG3q/view?usp=sharing"
                    className="underline text-blue-600"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    офертой
                  </Link>
                  ,{" "}
                  <Link
                    href="https://drive.google.com/file/d/16Wi2_WJos9-AN-bPn3zkBBbV0nvZf04x/view?usp=sharing"
                    className="underline text-blue-600"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    политикой конфиденциальности
                  </Link>{" "}
                  и даю согласие на{" "}
                  <Link
                    href="https://drive.google.com/file/d/1V8joLnU29tY8GKbRdRNexp5UM81hPEta/view?usp=sharing"
                    className="underline text-blue-600"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    обработку персональных данных
                  </Link>
                </Label>
              </div>
              <FormMessage className="ml-6" />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
