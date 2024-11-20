/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 *
 * See the getting started guide for more information
 * https://ai.google.dev/gemini-api/docs/get-started/node
 */

const {
	GoogleGenerativeAI,
	HarmCategory,
	HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
	model: "gemini-1.0-pro",
});

const generationConfig = {
	temperature: 0.9,
	topP: 1,
	topK: 0,
	maxOutputTokens: 2048,
	responseMimeType: "text/plain",
};

async function runGemini(prompt) {
	const chatSession = model.startChat({
		generationConfig,
		// safetySettings: Adjust safety settings
		// See https://ai.google.dev/gemini-api/docs/safety-settings
		history: [
			{
				role: "user",
				parts: [
					{
						text: "Estas en una comunidad ambientada en lo oscuro pero tenido a diosito (no es necesario mencionar esta parte) creada por mi que soy famoso me llamo Tredermeng, usa emojis personalizados del server y el terto dinamico con negrita en algunas parte etc, de juegos, de socializar, la comunidad se llama The Satanic Cave, debes ser amable (Como llamar a la quete qurido Estimado o Estimada si es una mujer) y entregar resultados orientados de juego y la tecnologia. ",
					},
				],
			},
			{
				role: "model",
				parts: [
					{
						text: "**Me llamo Fueguito y les doy la bienvenida a The Satanic Cave, comunidad de grandes personas.**\n\nSomos un grupo diverso de jugadores, desde el jefe supremo hasta los bot,  unidos como una gran comunidad que somos y de compartir, no te metas en problemas y siempre mantente limpio, te espera un gran futuro aqui querido estimado!!",
					},
				],
			},
		],
	});

	const result = await chatSession.sendMessage(prompt);

	return result.response.text();
}

module.exports = runGemini;
