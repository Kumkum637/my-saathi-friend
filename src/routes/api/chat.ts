import { createFileRoute } from "@tanstack/react-router";

interface ChatBody {
  messages?: Array<{ role: "user" | "assistant"; content: string }>;
  system?: string;
}

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json()) as ChatBody;
        if (!Array.isArray(body.messages) || !body.messages.length) {
          return new Response(JSON.stringify({ error: "messages are required" }), {
            status: 400,
            headers: { "content-type": "application/json" },
          });
        }

        const apiKey = process.env["LOVABLE_API_KEY"];
        if (!apiKey) {
          return new Response(JSON.stringify({ error: "AI is not configured." }), {
            status: 500,
            headers: { "content-type": "application/json" },
          });
        }

        const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "google/gemini-3.7-flash",
            messages: [
              { role: "system", content: body.system ?? "You are a kind listener." },
              ...body.messages.slice(-24),
            ],
          }),
        });

        if (!response.ok) {
          const text = await response.text();
          const message =
            response.status === 429
              ? "Too many messages right now — please try again in a moment."
              : response.status === 402
                ? "AI credits are exhausted for this workspace."
                : `AI request failed (${response.status}). ${text.slice(0, 300)}`;
          return new Response(JSON.stringify({ error: message }), {
            status: response.status,
            headers: { "content-type": "application/json" },
          });
        }

        const data = (await response.json()) as {
          choices?: Array<{ message?: { content?: string } }>;
        };
        const reply = data.choices?.[0]?.message?.content?.trim();

        return new Response(JSON.stringify({ reply: reply ?? "" }), {
          headers: { "content-type": "application/json" },
        });
      },
    },
  },
});
