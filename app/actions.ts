"use server";
import { Resend } from "resend";

export async function sendContactMessage(formData: FormData) {
  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const message = (formData.get("message") as string)?.trim();

  if (!name || !email || !message) {
    return { error: "Please fill out all fields." };
  }

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return { error: "RESEND_API_KEY is not configured." };
  }

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "anshsingh4359@gmail.com",
      subject: `New portfolio message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      replyTo: email,
    });

    if (error) {
      console.error("Resend error:", error);
      return { error: error.message || "Failed to send email." };
    }

    return { success: true, id: data?.id };
  } catch (error: any) {
    console.error("Failed to send message:", error);
    return { error: error.message || "Failed to send message." };
  }
}
