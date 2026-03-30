"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { MessageCircle, CheckCircle } from "lucide-react";

const contactFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  role: z.string().min(2, "Role must be at least 2 characters"),
  country: z.string().min(2, "Country must be selected"),
  phoneNumber: z.string().min(7, "Phone number must be valid"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  captcha: z.boolean().refine(val => val === true, "Please complete the CAPTCHA"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export function ContactForm() {
  const t = useTranslations("contact");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      captcha: false,
    },
  });

  const captchaValue = watch("captcha");

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    console.log("Form data being sent:", data);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      console.log("API response status:", response.status);
      const responseData = await response.json();
      console.log("API response data:", responseData);

      if (response.ok) {
        setIsSuccess(true);
        reset();
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        alert(responseData.message || "Failed to send message");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      alert("An error occurred while sending your message");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="scroll-mt-20 border-y border-zinc-200/80 bg-zinc-50/80 py-20 dark:border-zinc-800 dark:bg-zinc-950/50 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            {t("subtitle")}
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-2xl">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-green-200 bg-green-50 p-8 dark:border-green-900 dark:bg-green-950/30">
              <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
              <h3 className="mt-4 text-xl font-semibold text-green-900 dark:text-green-300">
                {t("success.title")}
              </h3>
              <p className="mt-2 text-center text-green-700 dark:text-green-400">
                {t("success.message")}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    {t("fields.name")} *
                  </label>
                  <input
                    type="text"
                    {...register("name")}
                    className="mt-2 block w-full rounded-lg border border-zinc-300 px-4 py-2 text-zinc-900 placeholder-zinc-500 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/10 dark:border-zinc-600 dark:bg-zinc-900 dark:text-white dark:placeholder-zinc-400"
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    {t("fields.email")} *
                  </label>
                  <input
                    type="email"
                    {...register("email")}
                    className="mt-2 block w-full rounded-lg border border-zinc-300 px-4 py-2 text-zinc-900 placeholder-zinc-500 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/10 dark:border-zinc-600 dark:bg-zinc-900 dark:text-white dark:placeholder-zinc-400"
                    placeholder="john@company.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    {t("fields.role")} *
                  </label>
                  <input
                    type="text"
                    {...register("role")}
                    className="mt-2 block w-full rounded-lg border border-zinc-300 px-4 py-2 text-zinc-900 placeholder-zinc-500 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/10 dark:border-zinc-600 dark:bg-zinc-900 dark:text-white dark:placeholder-zinc-400"
                    placeholder="Product Manager"
                  />
                  {errors.role && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.role.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    {t("fields.country")} *
                  </label>
                  <input
                    type="text"
                    {...register("country")}
                    className="mt-2 block w-full rounded-lg border border-zinc-300 px-4 py-2 text-zinc-900 placeholder-zinc-500 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/10 dark:border-zinc-600 dark:bg-zinc-900 dark:text-white dark:placeholder-zinc-400"
                    placeholder="United States"
                  />
                  {errors.country && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.country.message}</p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    {t("fields.phone")} *
                  </label>
                  <input
                    type="tel"
                    {...register("phoneNumber")}
                    className="mt-2 block w-full rounded-lg border border-zinc-300 px-4 py-2 text-zinc-900 placeholder-zinc-500 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/10 dark:border-zinc-600 dark:bg-zinc-900 dark:text-white dark:placeholder-zinc-400"
                    placeholder="+1 (555) 000-0000"
                  />
                  {errors.phoneNumber && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.phoneNumber.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  {t("fields.message")} *
                </label>
                <textarea
                  {...register("message")}
                  rows={5}
                  className="mt-2 block w-full rounded-lg border border-zinc-300 px-4 py-2 text-zinc-900 placeholder-zinc-500 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/10 dark:border-zinc-600 dark:bg-zinc-900 dark:text-white dark:placeholder-zinc-400"
                  placeholder="Tell us about your needs..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  {t("fields.captcha")} *
                </label>
                <div className="mt-2 rounded-lg border border-zinc-300 p-3 dark:border-zinc-600">
                  <input
                    type="checkbox"
                    {...register("captcha")}
                    className="h-4 w-4 rounded border-zinc-300"
                  />
                  <label className="ml-2 text-sm text-zinc-600 dark:text-zinc-400">
                    {t("fields.captchaLabel")}
                  </label>
                </div>
                {errors.captcha && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.captcha.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 disabled:opacity-50 dark:bg-blue-700 dark:hover:bg-blue-600"
              >
                {isSubmitting ? (
                  <span>{t("button.sending")}</span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <MessageCircle className="h-4 w-4" />
                    {t("button.send")}
                  </span>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
