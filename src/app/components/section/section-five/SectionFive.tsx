"use client";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Button } from "@/components/ui/button";
import { formSchema } from "@/zod-schemes/form.zod";
import { z } from "zod";

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
      agree: false,
    },
  });

  function onSubmit(values: FormData) {
    console.log(values);
  }

  return (
    <div className="flex justify-center py-20">
      {" "}
      {/* Центрируем секцию на странице */}
      <div
        className="relative bg-primary rounded-xl shadow-xl"
        style={{ width: 900, height: 520 }}
      >
        {/* Форма прижата к правому краю с отступом справа (paddingRight) */}
        <div
          className="relative w-[480px] h-[480px] bg-white text-black p-6 rounded-xl shadow-xl"
          style={{
            position: "absolute",
            top: "50%",
            right: 24, // отступ справа в 24px (~паддинг)
            transform: "translateY(-50%)",
          }}
        >
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
                      method === "telegram"
                        ? "@username"
                        : "+7 (999) 999-99-99";

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

              <FormField
                control={form.control}
                name="agree"
                render={({ field }) => (
                  <FormItem className="flex items-start space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        id="agree"
                      />
                    </FormControl>
                    <Label htmlFor="agree" className="text-sm leading-snug">
                      Соглашаюсь с{" "}
                      <a
                        href="/privacy"
                        className="underline text-blue-600"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        политикой конфиденциальности
                      </a>
                    </Label>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" variant="default">
                Отправить
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
