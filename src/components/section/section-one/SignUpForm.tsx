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
import { formSchema } from "@/zod-schemes/form.zod";

type FormData = z.infer<typeof formSchema>;

const contactMethods = [
  { id: "call", label: "Телефон" },
  { id: "telegram", label: "Telegram" },
];

export default function SignUpForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      contactMethod: "call",
      phone: "",
      agree: true,
    },
  });

  async function onSubmit(values: FormData) {
    try {
      const endpoint =
        values.contactMethod === "call" ? "/api/send" : "/api/send-telegram";

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        alert(
          values.contactMethod === "call"
            ? "Заявка отправлена на почту!"
            : "Заявка отправлена в Telegram!"
        );
        form.reset();
      } else {
        const errorData = await res.json();
        alert("Ошибка при отправке: " + errorData.error);
      }
    } catch (error) {
      alert(`Ошибка сети: ${error}`);
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

        <div className="gap-2 flex flex-col">
          <FormField
            control={form.control}
            name="contactMethod"
            render={({ field }) => (
              <div className="flex gap-2">
                {contactMethods.map((method) => (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => field.onChange(method.id)}
                    className={`px-3 py-1 rounded-full border text-sm ${
                      field.value === method.id
                        ? "bg-black text-white"
                        : "bg-white text-black border-gray-300"
                    }`}
                  >
                    {method.label}
                  </button>
                ))}
              </div>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => {
              const method = form.watch("contactMethod");
              const placeholder =
                method === "telegram" ? "@username" : "+7 (999) 999-99-99";

              return (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={placeholder}
                      type="text"
                      className="h-12"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>

        <Button
          type="submit"
          className={cn(
            "w-full",
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
                    href="https://drive.google.com/file/d/1eOwPzaoAxDmyPD_htTBI4ujKECeirG3q/preview"
                    className="underline text-blue-600"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    офертой{" "}
                  </Link>
                  ,
                  <Link
                    href="https://drive.google.com/file/d/16Wi2_WJos9-AN-bPn3zkBBbV0nvZf04x/preview"
                    target="_blank"
                    className="underline text-blue-600"
                    rel="noopener noreferrer"
                  >
                    политикой конфиденциальности
                  </Link>{" "}
                  и даю согласие на{" "}
                  <Link
                    href="https://drive.google.com/file/d/1V8joLnU29tY8GKbRdRNexp5UM81hPEta/preview"
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
