import * as functions from "firebase-functions/v1";
import * as admin from "firebase-admin";
import OpenAI from "openai";

admin.initializeApp();

const openai = new OpenAI({
  apiKey: functions.config().openai.key,
});

interface StylistRequest {
  prompt: string;
}

export const askStylist = functions
  .runWith({ memory: "512MB", timeoutSeconds: 60 })
  .region("us-central1")
  .https.onCall(async (data: StylistRequest, context) => {
    const { prompt } = data;
    const uid = context.auth?.uid;

    if (!uid) {
      throw new functions.https.HttpsError("unauthenticated", "User must be authenticated");
    }

    if (!prompt) {
      throw new functions.https.HttpsError("invalid-argument", "Prompt is required");
    }

    try {
      // Get user context from Firestore
      const userDoc = await admin.firestore().collection("users").doc(uid).get();
      const userData = userDoc.data();

      if (!userData) {
        throw new functions.https.HttpsError("not-found", "User data not found in Firestore");
      }

      const gender = userData.gender || "unknown";
      const skinTone = userData.skinTone || "unknown";

      const top = userData.selectedOutfit?.top || {};
      const bottom = userData.selectedOutfit?.bottom || {};

      const contextString = `The user is a ${gender} with skin tone ${skinTone}. They are currently wearing a ${top.color || "unknown"} ${top.type || "top"} and ${bottom.color || "unknown"} ${bottom.type || "bottom"}.`;

      const chatResponse = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content:
              "You're a confident, stylish virtual stylist. Keep your tone playful and sassy, but avoid flirty nicknames like 'darling' or 'honey'. If you see any hex color codes (e.g., #f5cba7), interpret them into plain language colors like 'light brown' or 'warm tan'. Focus on providing honest, clever, and constructive outfit feedback while keeping things fun.",
          },
          {
            role: "user",
            content: `${contextString} ${prompt}`,
          },
        ],
        model: "gpt-4o-mini", // cheaper & still solid
      });

      return { reply: chatResponse.choices[0].message?.content || null };
    } catch (error: any) {
      console.error("🔥 OpenAI API Error:", error);
      throw new functions.https.HttpsError("internal", error.message || "Unknown error");
    }
  });
