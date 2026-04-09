import { GoogleGenAI } from '@google/genai'

const geminiApiKey = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY

const ai = geminiApiKey ? new GoogleGenAI({ apiKey: geminiApiKey }) : null

function normalizeList(items) {
  return Array.isArray(items) && items.length > 0 ? items.join(', ') : 'None specified'
}

export function buildTripPrompt(tripData) {
  const {
    travelingFrom,
    destination,
    noOfDays,
    noOfTravelers,
    budget,
    interests,
    cuisinePreferences,
    hasChildren,
  } = tripData

  return `
You are an expert AI travel planner for the Trippn app.

Create a practical and exciting travel plan based on the user's details below.

User trip details:
- Travelling from: ${travelingFrom || 'Not provided'}
- Destination: ${destination || 'Not provided'}
- Number of days: ${noOfDays || 'Not provided'}
- Number of travellers: ${noOfTravelers || 'Not provided'}
- Budget: ${budget || 'Not provided'}
- Interests: ${normalizeList(interests)}
- Cuisine preferences: ${normalizeList(cuisinePreferences)}
- Children travelling: ${hasChildren ? 'Yes' : 'No'}

Instructions:
- Build a day-by-day itinerary for the full trip duration.
- Match activities to the user's interests, budget, and traveller count.
- If children are travelling, include family-friendly suggestions where appropriate.
- Include food suggestions aligned with the cuisine preferences.
- Keep the plan realistic with sensible pacing and travel flow.
- Recommend a mix of sightseeing, food, and local experiences.
- Avoid repeating the same style of activity too often.
- Use the local currency of the destination for every money-related field.
- For hotel suggestions, provide realistic estimated nightly prices as actual numbers, not vague labels.
- For restaurant suggestions, include an estimated billing range per person in local currency for later UI use.

Return the result in valid JSON only using this schema:
{
  "tripSummary": {
    "destination": "string",
    "duration": "string",
    "travellers": "string",
    "budget": "string",
    "childrenTravelling": true,
    "currencyCode": "string",
    "currencySymbol": "string"
  },
  "overview": "string",
  "hotelSuggestions": [
    {
      "name": "string",
      "priceRangeLabel": "string",
      "pricePerNightFrom": 0,
      "pricePerNightTo": 0,
      "currencyCode": "string",
      "currencySymbol": "string",
      "reason": "string"
    }
  ],
  "restaurantBudgetGuide": [
    {
      "type": "string",
      "estimatedPerPersonFrom": 0,
      "estimatedPerPersonTo": 0,
      "currencyCode": "string",
      "currencySymbol": "string",
      "notes": "string"
    }
  ],
  "dailyPlan": [
    {
      "day": 1,
      "title": "string",
      "activities": [
        {
          "time": "Morning | Afternoon | Evening",
          "name": "string",
          "details": "string"
        }
      ],
      "food": [
        {
          "meal": "Breakfast | Lunch | Dinner",
          "suggestion": "string",
          "estimatedPerPersonFrom": 0,
          "estimatedPerPersonTo": 0,
          "currencyCode": "string",
          "currencySymbol": "string"
        }
      ]
    }
  ],
  "travelTips": ["string"]
}
`.trim()
}

export async function generateTripPlan(tripData) {
  if (!ai) {
    throw new Error('Missing VITE_GOOGLE_GEMINI_API_KEY in .env')
  }

  const prompt = buildTripPrompt(tripData)

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
  })

  return response.text
}

function extractFirstJsonObject(text) {
  const startIndex = text.indexOf('{')

  if (startIndex === -1) {
    return null
  }

  let depth = 0
  let inString = false
  let isEscaped = false

  for (let index = startIndex; index < text.length; index += 1) {
    const character = text[index]

    if (inString) {
      if (isEscaped) {
        isEscaped = false
      } else if (character === '\\') {
        isEscaped = true
      } else if (character === '"') {
        inString = false
      }

      continue
    }

    if (character === '"') {
      inString = true
      continue
    }

    if (character === '{') {
      depth += 1
    } else if (character === '}') {
      depth -= 1

      if (depth === 0) {
        return text.slice(startIndex, index + 1)
      }
    }
  }

  return null
}

export function parseTripPlanResponse(responseText) {
  if (!responseText) {
    throw new Error('Empty Gemini response')
  }

  const cleanedText = responseText
    .replace(/```json/g, '')
    .replace(/```/g, '')
    .trim()

  try {
    return JSON.parse(cleanedText)
  } catch {
    const extractedJson = extractFirstJsonObject(cleanedText)

    if (!extractedJson) {
      throw new Error('Could not find valid JSON in Gemini response')
    }

    return JSON.parse(extractedJson)
  }
}

export { ai }
