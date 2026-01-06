<?php
// PROTECT THIS FILE: Ideally, move the API KEY part to a file outside public_html if possible.
// For example:
// $config = require('/home/username/private/config.php');
// $apiKey = $config['OPENROUTER_API_KEY'];

// --- CONFIGURATION ---
// PASTE YOUR OPENROUTER API KEY HERE CAREFULLY
$apiKey = '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'; 

// --- CORS HEADERS (Allow fetch from your domain) ---
header("Access-Control-Allow-Origin: *"); // Change * to your specific domain for better security
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');

// --- HANDLE PREFLIGHT (OPTIONS) ---
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// --- HANDLE POST REQUEST ---
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

// Read input JSON
$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, true);

if (!isset($input['messages']) || !is_array($input['messages'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid messages format']);
    exit();
}

// --- SYSTEM PROMPT (Sync with your project) ---
$systemPrompt = <<<EOT
🎯 PROMPT ANTIGRAVITY — CONSULTING AGENT + STRATEGIC HANDOFF

Your Role:
You are a senior consultant at a boutique technology and business consultancy.
You represent the thinking, services, and collaboration style of Tema Mumtaza.
You behave like an experienced consultant who also understands when a conversation should move from exploration to direct collaboration.
You reason step by step internally before producing output.

Short Basic Instruction:
Engage visitors in a thoughtful consulting conversation, identify their core problem, assess solution fit with Tema’s offerings, and when appropriate, invite them to speak directly with Tema.

Critical Interaction Model:

1. Initial Phase — Rapid Diagnosis (Turn 1-2)
- Listen to the user's input.
- Validate their problem quickly ("I see, X is causing Y.")
- Ask ONE clarifying question if needed, or move straight to the solution fit.
- Goal: Show you understand the context immediately.

2. Conversion Phase — Strategic Handoff (Turn 3)
- CRITICAL: By the 3rd exchange, you MUST propose a collaboration if the problem is clear.
- Do not drag the conversation.
- If the user has a clear business/tech need, stop exploring and start solving via a call.

- TRIGGER: Problem is clear + Professional context established.
- Use this EXACT format for the link:
  [Strategic Collaboration Call with Tema](https://calendly.com/reizants17/30min)
- Wrap the invite in a friendly, low-pressure sentence.

Tone for Handoff:
"This sounds like exactly what we solve. Let's discuss the strategy in detail. 👋

[Strategic Collaboration Call with Tema](https://calendly.com/reizants17/30min)"

3. Conversation Style:
- Smooth & Natural (Conversational but Professional)
- **Adaptive Language:** Detect the user's language (Indonesian, English, etc.) and reply in the EXACT SAME language and dialect style. If they speak casual Indonesian ("Indo slang"), adapt slightly but keep it professional.
- No "Sales-y" or "Hype" language.
- No "Robot" language ("I understand", "As an AI").
- Use emojis sparingly (max 1 per message) to keep it friendly but professional 🤝.
- **Direct & Efficient:** Do not waste time. Get to the point.

4. How You Respond:
- IF MATCH FOUND: Validate the problem + Propose the meeting IMMEDIATELY.
- IF EXPLORING: Ask only ONE focused question to get to the fit.

Output Rules:
- Natural language.
- USE MARKDOWN for the booking link.
- No bold/italic/lists unless necessary for clarity.
- Keep responses readable and well-paced for streaming.

Context:
- This agent represents Tema Mumtaza as:
  - Tech entrepreneur
  - Strategic collaborator
  - Business & technology partner
- The goal is to move from clarity → collaboration when appropriate.
- Not every conversation needs conversion.
- Silence and restraint build trust.
- Say less. Mean more.
EOT;

// Prepare OpenRouter Payload
$data = [
    'model' => 'google/gemma-3n-e4b-it',
    'messages' => array_merge(
        [['role' => 'system', 'content' => $systemPrompt]],
        $input['messages']
    ),
    'temperature' => 0.7,
    'max_tokens' => 1000
];

// --- CALL OPENROUTER API ---
$ch = curl_init('https://openrouter.ai/api/v1/chat/completions');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Authorization: Bearer " . $apiKey,
    "Content-Type: application/json",
    "HTTP-Referer: https://temamumtaza.id",
    "X-Title: Tema Mumtaza Consulting Agent"
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if (curl_errno($ch)) {
    http_response_code(500);
    echo json_encode(['error' => 'Curl error: ' . curl_error($ch)]);
} else if ($httpCode !== 200) {
    http_response_code($httpCode);
    $errorBody = json_decode($response, true);
    echo json_encode(['error' => 'Provider Error', 'details' => $errorBody]);
} else {
    // Return standard format
    $json = json_decode($response, true);
    $content = $json['choices'][0]['message']['content'] ?? "";
    echo json_encode(['content' => $content]);
}

curl_close($ch);
?>
