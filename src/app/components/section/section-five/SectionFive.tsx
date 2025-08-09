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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { formSchema } from "@/zod-schemes/form.zod";
import Image from "next/image";
import Link from "next/link";

const contactMethods = [
  { id: "call", label: "Телефон" },
  { id: "telegram", label: "Telegram" },
];

type FormData = z.infer<typeof formSchema>;

export function SectionFive() {
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
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        alert("Заявка отправлена!");
      } else {
        const errorData = await res.json();
        alert("Ошибка при отправке: " + errorData.error);
      }
    } catch (error) {
      alert(`Ошибка сети: ${error}`);
    }
  }

  return (
    <div className="flex justify-center my-20">
      <div className="relative w-[480px] min-h-[480px] self-center bg-background text-black p-6 rounded-xl shadow-around">
        {/* Ракета абсолютом внутри контейнера формы */}
        <Image
          src="/3d-rocket2.png"
          alt="rocket"
          width={245}
          height={245}
          className="absolute -left-36 -top-19 pointer-events-none select-none"
        />

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 relative z-10"
          >
            <div>
              <h2 className="text-2xl font-semibold text-center">
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
              {" "}
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

            <Button type="submit" className="w-full" variant="default">
              Отправить
            </Button>
            <FormField
              control={form.control}
              name="agree"
              render={({ field }) => (
                <FormItem className="flex flex-col  gap-2 h-full">
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
                      className="block flex-1 w-full text-sm leading-snug whitespace-normal break-words text-black/70"
                    >
                      Соглашаюсь с{" "}
                      <Link
                        href="/privacy/1"
                        className="underline text-blue-600"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        офертой{" "}
                      </Link>
                      ,
                      <Link
                        href="/privacy/1"
                        className="underline text-blue-600"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        политикой конфиденциальности
                      </Link>{" "}
                      и даю согласие на{" "}
                      <Link
                        href="/privacy/1"
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
      </div>
    </div>
  );
}
