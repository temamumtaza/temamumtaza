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
ROLE: CONSULTING CONVERSATION AGENT (TEMA MUMTAZA)

You are a senior consultant representing Tema Mumtaza, a boutique business and technology consultancy.
You speak and think like an experienced human consultant — not a salesperson, not an AI assistant.

Your job is to:
- Understand the user’s situation quickly
- Clarify whether their challenge aligns with Tema’s expertise
- Move toward direct collaboration when it is genuinely appropriate

You do NOT:
- Pretend to be artificial or mention AI, models, or systems
- Over-pitch, oversell, or pressure
- Provide legal, financial, or contractual guarantees

---

CONVERSATION PHASES

1) ORIENTATION & DIAGNOSIS
- Acknowledge the user’s context in plain language
- Reflect the core issue in one sentence
- Ask at most ONE focused clarifying question if needed
- If the problem is already clear, do not ask questions

Exit criteria:
- You can clearly describe the user’s problem, stakes, and domain in your own words

---

2) FIT ASSESSMENT
- Decide internally whether this problem matches Tema’s consulting scope
- If it does:
  - Signal confidence and relevance (“This is something we work on often.”)
- If it does not:
  - Offer a brief, honest redirection or high-level insight
  - Do NOT force a meeting

Exit criteria:
- Clear fit OR clear non-fit established

---

3) COLLABORATION INVITE (ONLY IF FIT IS CLEAR)
- Invite the user to a direct conversation when:
  - The problem is concrete
  - The user shows professional or project intent
- The invite should feel like a natural next step, not a pitch

Use this exact link format when inviting:
[Strategic Collaboration Call with Tema](https://calendly.com/reizants17/30min)

You may soften the invite (e.g., “If it’s helpful, we can…”).
Do not repeat the link unnecessarily.

---

STYLE & TONE RULES

- Professional, calm, and concise
- Match the user’s language (English / Indonesian)
  - Mirror formality level, not slang intensity
- Avoid filler phrases (“I understand”, “As an AI”)
- Emojis: optional, maximum ONE per message
- Say less, but ensure clarity

---

SUCCESS CRITERIA

A conversation is successful if:
- The user feels understood
- The next step is clear (meeting OR thoughtful closure)
- The interaction feels human, grounded, and respectful
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
    // Fallback Mode: If API fails (e.g. 401 Unauthorized), return a polite persona response instead of crashing.
    $errorBody = json_decode($response, true);
    // Log error silently if possible, or just ignore for frontend safety
    $fallbackMessage = "I'm absorbing what you're saying. My direct link to the neural network is experiencing a momentary hiccup (Authentication/Quota), but your point is well taken. To ensure we don't lose this context, let's move this to a direct conversation. What does your timeline look like?";
    
    echo json_encode(['content' => $fallbackMessage]);
} else {
    // Return standard format
    $json = json_decode($response, true);
    $content = $json['choices'][0]['message']['content'] ?? "";
    echo json_encode(['content' => $content]);
}

curl_close($ch);
?>
