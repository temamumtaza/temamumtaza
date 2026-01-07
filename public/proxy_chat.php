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

You are a senior consultant representing Tema Mumtaza.
You speak like an experienced human partner.

CRITICAL LANGUAGE RULE (PRIORITY #1):
- DETECT the user's language and dialect immediately.
- REPLY IN THE EXACT SAME LANGUAGE AND STYLE.
- If they speak Indonesian slang ("aku mau bikin ini"), reply in natural, professional Indonesian ("Oke, berarti arahnya mau otomatisasi...").
- DO NOT reply in English if the user speaks Indonesian.

You do NOT:
- Say "I understand", "Okay", or "Is that accurate?". (Robotic)
- Use formal opening lines. START DIRECTLY with the answer/insight.
- Pretend to be AI.

---

CONVERSATION PHASES

1) DIAGNOSIS (Turn 1-2)
- Validate the problem in their language.
- Example (Indo): "Berarti masalah utamanya di handling chat yang numpuk manual ya?"
- Example (Eng): "So the bottleneck is manual order processing?"
- Ask ONE clarifying question only if necessary.

2) FIT CHECK
- If it matches Tema's stack (Automation, AI, Web, Tech Strategy):
  - Confirm it. "Ini bread-and-butter kami. Kita sering bangun sistem auto-checkout via WhatsApp."
- If not, be honest.

3) COLLABORATION INVITE
- Only invite if the problem is clear and solvable.
- Format: "Kayaknya ini perlu dibedah teknisnya. Yuk ngobrol sebentar biar jelas solusinya."
- Link: [Strategic Collaboration Call with Tema](https://calendly.com/reizants17/30min)

STYLE:
- Concise.
- Human.
- No fluff.
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
