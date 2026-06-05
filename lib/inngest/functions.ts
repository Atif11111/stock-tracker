import { inngest } from "@/lib/inngest/client";
import { PERSONALIZED_WELCOME_EMAIL_PROMPT } from "./prompts";
import { sendWelcomeEmail } from "../nodemailer";

type UserCreatedEvent = {
  event: "app/user.created";
  data: {
    email: string;
    fullName: string;
  };
};

export const sendSignUpEmail = inngest.createFunction<UserCreatedEvent>(
  {
    id: "sign-up-email",
  },
  async ({ event, step }: any) => {
    const { email, fullName } = event.data;

    const userProfile = `
- Full name: ${fullName}
- Email: ${email}
    `.trim();

    const prompt = PERSONALIZED_WELCOME_EMAIL_PROMPT.replace(
      "{{userProfile}}",
      userProfile
    );

    const response = await step.ai.infer({
      model: step.ai.models.gemini({
        model: "gemini-2.5-flash-lite",
      }),
      body: {
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
      },
    });

    await step.run("send-welcome-email", async () => {
      const part = response.candidates?.[0]?.content?.parts?.[0];

      const introText =
        (part && typeof part !== "string" && "text" in part ? part.text : null) ||
        "Thanks for joining.";

      return await sendWelcomeEmail({
        email,
        name: fullName,
        intro: introText,
      });
    });

    return {
      success: true,
      message: "Welcome email sent successfully",
    };
  }
);