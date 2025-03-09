import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { language, code, input } = await req.json();

    const response = await fetch("https://emkc.org/api/v2/piston/execute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language,
        version: "*", // Latest version
        files: [{ content: code }],
        stdin: input || "",
      }),
    });

    const data = await response.json();

    return NextResponse.json({ output: data.run.output || "No output", error: data.run.stderr || null });
  } catch (error) {
    return NextResponse.json({ error: "Execution failed" }, { status: 500 });
  }
}