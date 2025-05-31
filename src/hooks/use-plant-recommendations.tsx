import { useState, useCallback } from 'react'
import { GoogleGenAI, Type } from '@google/genai'

// ⚠️ AVISO: nunca exponha sua chave em produção!
const API_KEY = 'AIzaSyD3NzMZ9hJpmjl4xH-W-EseOLSFp4K3R80'

const genAI = new GoogleGenAI({ apiKey: API_KEY })

// Tipos do retorno da IA
type PlantRecommendation = {
  irrigacoes_por_dia: number
  luminosidade_ideal_lx: number
  ml_por_irrigacao: number
  planta: string
  temperatura_max_celsius: number
  temperatura_min_celsius: number
}

type UsePlantRecommendationsReturn = {
  data: PlantRecommendation | null
  loading: boolean
  error: string | null
  fetchRecommendations: (plantName: string, date: string) => Promise<void>
}

const usePlantRecommendations = (): UsePlantRecommendationsReturn => {
  const [data, setData] = useState<PlantRecommendation | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchRecommendations = useCallback(async (plantName: string, date: string) => {
    if (!plantName.trim()) {
      setError('O nome da planta não pode ser vazio.')
      setData(null)
      return
    }

    setLoading(true)
    setError(null)
    setData(null)

    const prompt = `
Forneça as recomendações ideais de luminosidade (em lux), temperatura (mínima e máxima em Celsius), frequência de irrigações por dia e volume de água (em ml) por irrigação para a planta "${plantName}".

A resposta deve ser APENAS um objeto JSON válido, sem texto adicional antes ou depois.

Formato do JSON esperado:
\`\`\`json
{
  "planta": "NOME_DA_PLANTA",
  "luminosidade_ideal_lx": NUMERO_LUX,
  "temperatura_min_celsius": TEMPERATURA_MIN,
  "temperatura_max_celsius": TEMPERATURA_MAX,
  "irrigacoes_por_dia": NUMERO_IRRIGACOES,
  "ml_por_irrigacao": VOLUME_ML
}
\`\`\`

Certifique-se de que os valores sejam realistas e apropriados para a espécie de planta "${plantName}".
`;


    try {
      const config = {
        responseMimeType: 'application/json',
      };
      const model = 'gemini-1.5-flash';

      const response = await genAI.models.generateContent({
        model,
        config,
        contents: prompt,
      });
  

      const rawText = response.text
      console.log(rawText)

      if (!rawText) {
        setError('A API retornou uma resposta vazia.')
        return
      }

      try {
        const parsedData: PlantRecommendation = JSON.parse(rawText)
        setData(parsedData)
      } catch (jsonError) {
        console.error('Erro ao decodificar JSON da API:', jsonError)
        console.log('Resposta bruta da API:', rawText)
        setError('A API retornou um formato inválido. Tente novamente.')
      }
    } catch (apiError: any) {
      console.error('Erro ao chamar a API do Gemini:', apiError)
      setError('Falha na comunicação com a API do Gemini.')
    } finally {
      setLoading(false)
    }
  }, [])

  return { data, loading, error, fetchRecommendations }
}

export default usePlantRecommendations
