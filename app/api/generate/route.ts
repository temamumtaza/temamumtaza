import { NextResponse } from "next/server";
import { AGENCY_CONTEXT, SYSTEM_PROMPT } from "@/lib/agency-context";

// Simple in-memory rate limiter
const RATE_LIMIT_MAP = new Map<string, { count: number; lastReset: number }>();
const LIMIT = 50; // Increased limit for chat interactions
const WINDOW = 24 * 60 * 60 * 1000; // 24 hours

export async function POST(req: Request) {
  try {
    // 1. IP Rate Limiting
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0] : "unknown";

    if (ip !== "unknown") {
      const now = Date.now();
      const record = RATE_LIMIT_MAP.get(ip) || { count: 0, lastReset: now };

      if (now - record.lastReset > WINDOW) {
        record.count = 0;
        record.lastReset = now;
      }

      if (record.count >= LIMIT) {
        return NextResponse.json({
          error: "Daily conversation limit reached. Let's connect via email to continue."
        }, { status: 429 });
      }

      record.count += 1;
      RATE_LIMIT_MAP.set(ip, record);
    }

    const { messages } = await req.json();

    // Validate messages array
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Messages array is required" }, { status: 400 });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;

    // 2. Mock Response if No Key (Dev Mode)
    if (!apiKey) {
      // Simulate realistic thought pause
      await new Promise(resolve => setTimeout(resolve, 1500));
      return NextResponse.json({
        content: "I'm listening. Since we're in demo mode (no API key), I can't fully analyze that, but I'd love to hear more about your specific challenges with scaling this idea."
      });
    }

    // 3. Real API Call
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://temamumtaza.com",
        "X-Title": "Tema Mumtaza Consulting Agent",
      },
      body: JSON.stringify({
        model: "google/gemma-3n-e4b-it",
        messages: [
          {
            role: "system",
            content: `${SYSTEM_PROMPT}\n\n${AGENCY_CONTEXT}`
          },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 1000,
      })
    });

    if (!response.ok) {
      console.error(`OpenRouter API Error: ${response.statusText}`);
      // Fallback response to prevent UI crash
      return NextResponse.json({
        content: "I'm absorbing what you're saying. My direct link to the neural network is experiencing a momentary hiccup (API Auth), but your point is well taken. To ensure we don't lose this context, let's move this to a direct conversation. What does your timeline look like?"
      });
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content || "";

    return NextResponse.json({ content });

  } catch (error: any) {
    console.error("Chat API Detailed Error:", error);
    // Fallback for network/code errors
    return NextResponse.json({
      content: "I'm analyzing your request, but our connection seems slightly out of sync. Rather than struggling with the signal, I think this warrants a deeper, offline discussion. Shall we book a quick sync?"
    });
  }
}
