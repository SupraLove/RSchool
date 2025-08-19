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
import { cn } from "@/lib/utils";

const features = [
  "Оплата по одному занятию",
  "Оплата по абонементу",
  "Оплата по результату",
];

const contactMethods = [
  { id: "call", label: "Телефон" },
  { id: "telegram", label: "Telegram" },
];

type FormData = z.infer<typeof formSchema>;

export function SectionOne() {
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
    <section className="h-[700px] bg-primary-foreground grid grid-cols-2 justify-items-center rounded-lg mx-4 md:grid-cols-1 md:h-[900px] sm:h-[1100px]">
      {/* Левая часть — текст */}
      <div className="text-center self-center xl:pl-0 pl-8 md:mt-4">
        <p className="text-6xl xl:text-5xl md:text-4xl text-white leading-tight">
          <span className="bg-white/70 rounded-full px-3 text-primary-foreground">
            Индивидуальные
          </span>{" "}
          онлайн-занятия с репетитором для 5−11 классов
        </p>

        <p className="text-2xl text-white lg:text-xl mt-7 md:text-xl leading-relaxed ">
          <span className="block xl:inline">
            Выявим и устраним пробелы за все предыдущие классы
          </span>{" "}
          <span className="block xl:inline">
            с помощью{" "}
            <span className="inline bg-violet-400 rounded-full px-2">
              индивидуальной программы,
            </span>{" "}
            составленной
          </span>{" "}
          <span className="block xl:inline">исходя из интересов ученика</span>
        </p>

        <div className="flex gap-8 mt-7 justify-center md:mb-4">
          {features.map((text, i) => (
            <div
              key={i}
              className="w-36 h-32 lg:w-30 lg:h-26 bg-white/70 rounded-2xl flex flex-col justify-between text-left lg:p-0.5  p-3"
            >
              <span className="text-xl">🤍</span>
              <p className="text-violet-400 font-semibold">{text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Правая часть — форма с ракетой в одном контейнере */}
      <div className="relative lg:w-[380px] w-[480px] min-h-[480px] self-center bg-background text-black p-6 rounded-xl shadow-around">
        {/* Ракета абсолютом внутри контейнера формы */}
        <Image
          src="/3d-rocket2.png"
          alt="rocket"
          width={245}
          height={245}
          className="absolute -left-36 -top-19 md:-left-22 md:-top-10  md:w-40 md:h-40 sm:-left-13 sm:-top-10  sm:w-30 sm:h-30 w-60 h-60 pointer-events-none select-none"
        />

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
      </div>
    </section>
  );
}
