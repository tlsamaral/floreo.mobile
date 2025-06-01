import { useState, useCallback } from 'react'
import { GoogleGenAI } from '@google/genai'

// ⚠️ Nunca exponha sua chave em produção!
const API_KEY = 'AIzaSyD3NzMZ9hJpmjl4xH-W-EseOLSFp4K3R80'
const genAI = new GoogleGenAI({ apiKey: API_KEY })

export type PlantStatusInput = {
  planta: string
  temperaturaAtual: number
  luminosidadeAtual: number // em lux
  horasDesdeUltimaIrrigacao: number
}

export type PlantFeedback = {
  resumo: string
  acaoRecomendada: string
  risco: string
}

type UsePlantFeedbacksReturn = {
  feedback: PlantFeedback | null
  loading: boolean
  error: string | null
  fetchFeedback: (input: PlantStatusInput) => Promise<void>
}

const usePlantFeedbacks = (): UsePlantFeedbacksReturn => {
  const [feedback, setFeedback] = useState<PlantFeedback | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchFeedback = useCallback(async (input: PlantStatusInput) => {
    const { planta, temperaturaAtual, luminosidadeAtual, horasDesdeUltimaIrrigacao } = input

    setLoading(true)
    setError(null)
    setFeedback(null)

    const prompt = `
    Analise as seguintes condições atuais da planta "${planta}" e retorne um objeto JSON contendo um feedback.

    Temperatura atual: ${temperaturaAtual} °C
    Luminosidade atual: ${luminosidadeAtual} lux
    Tempo desde a última irrigação: ${horasDesdeUltimaIrrigacao} horas

    Formato esperado do JSON:
    {
      "resumo": "breve resumo da situação atual da planta",
      "acaoRecomendada": "o que deve ser feito agora",
      "risco": "risco atual para a planta, se houver"
    }

    Responda apenas com um objeto JSON válido.`

    try {
      const config = {
        responseMimeType: 'application/json',
      }
      const model = 'gemini-1.5-flash'

      const response = await genAI.models.generateContent({
        model,
        config,
        contents: prompt,
      })

      const rawText = response.text
      console.log(rawText)

      if (!rawText) {
        setError('A API retornou uma resposta vazia.')
        return
      }

      try {
        const parsed: PlantFeedback = JSON.parse(rawText)
        setFeedback(parsed)
      } catch (jsonError) {
        console.error('Erro ao decodificar JSON:', jsonError)
        console.log('Texto bruto:', rawText)
        setError('A API retornou um formato inválido.')
      }
    } catch (apiError: any) {
      console.error('Erro na API do Gemini:', apiError)
      setError('Erro ao se comunicar com a IA.')
    } finally {
      setLoading(false)
    }
  }, [])

  return { feedback, loading, error, fetchFeedback }
}

export default usePlantFeedbacks